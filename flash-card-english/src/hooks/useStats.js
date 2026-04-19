import { useState, useEffect, useCallback } from 'react';
import db from '../db/database';

export function useStats() {
  const [stats, setStats] = useState({
    totalWords: 0,
    masteredWords: 0,
    learningWords: 0,
    masteryPercentage: 0,
    todayLearned: 0,
    streak: 0
  });

  const loadStats = useCallback(async () => {
    const total = await db.words.count();
    const mastered = await db.words.where('status').equals('mastered').count();
    const learning = total - mastered;
    const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0;

    // Today's stats
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = await db.dailyStats.get(today);
    const todayLearned = todayRecord?.wordsLearned || 0;

    // Streak calculation
    const streak = await calculateStreak();

    setStats({
      totalWords: total,
      masteredWords: mastered,
      learningWords: learning,
      masteryPercentage: percentage,
      todayLearned,
      streak
    });
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const calculateStreak = async () => {
    const allStats = await db.dailyStats.toArray();
    if (allStats.length === 0) return 0;

    const sortedDates = allStats
      .filter(s => s.wordsLearned > 0)
      .map(s => s.date)
      .sort()
      .reverse();

    if (sortedDates.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Streak must include today or yesterday
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i]);
      const previous = new Date(sortedDates[i + 1]);
      const diffDays = (current - previous) / 86400000;

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const recordWordLearned = useCallback(async (count = 1) => {
    const today = new Date().toISOString().split('T')[0];
    const existing = await db.dailyStats.get(today);

    if (existing) {
      await db.dailyStats.update(today, {
        wordsLearned: existing.wordsLearned + count
      });
    } else {
      await db.dailyStats.put({
        date: today,
        wordsLearned: count
      });
    }

    await loadStats();
  }, [loadStats]);

  const recordSession = useCallback(async (sessionData) => {
    await db.sessions.add({
      date: new Date().toISOString(),
      wordsCompleted: sessionData.wordsCompleted,
      mode: sessionData.mode,
      duration: sessionData.duration,
      accuracy: sessionData.accuracy
    });
  }, []);

  return {
    stats,
    recordWordLearned,
    recordSession,
    refresh: loadStats
  };
}
