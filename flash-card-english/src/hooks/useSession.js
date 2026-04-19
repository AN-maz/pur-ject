import { useState, useCallback, useRef, useEffect } from 'react';
import { useWords } from './useWords';
import { useStats } from './useStats';
import { buildQueue, insertAtRandomPosition } from '../utils/sessionQueue';

export function useSession({ wordCount = 20, mode = 'flashcard' }) {
  const [queue, setQueue] = useState([]);
  const [totalWords, setTotalWords] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const startTimeRef = useRef(Date.now());

  const { getUnmasteredWords, markAsMastered } = useWords();
  const { recordWordLearned, recordSession } = useStats();

  // Initialize session
  const initSession = useCallback(async () => {
    setIsLoading(true);
    const words = await getUnmasteredWords(wordCount);
    const sessionQueue = buildQueue(words);
    setQueue(sessionQueue);
    setTotalWords(sessionQueue.length);
    setCompletedCount(0);
    setIncorrectCount(0);
    setIsSessionComplete(false);
    startTimeRef.current = Date.now();
    setIsLoading(false);
  }, [wordCount, getUnmasteredWords]);

  useEffect(() => {
    initSession();
  }, [initSession]);

  const currentWord = queue[0] || null;
  const queueLength = queue.length;

  const markCorrect = useCallback(async () => {
    if (queue.length === 0) return;

    const word = queue[0];
    await markAsMastered(word.id);
    await recordWordLearned(1);

    const newQueue = queue.slice(1);
    const newCompleted = completedCount + 1;

    setQueue(newQueue);
    setCompletedCount(newCompleted);

    if (newQueue.length === 0) {
      setIsSessionComplete(true);
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      await recordSession({
        wordsCompleted: newCompleted,
        mode,
        duration,
        accuracy: Math.round((newCompleted / (newCompleted + incorrectCount)) * 100)
      });
    }
  }, [queue, completedCount, incorrectCount, mode, markAsMastered, recordWordLearned, recordSession]);

  const markIncorrect = useCallback(() => {
    if (queue.length === 0) return;

    const word = queue[0];
    const remaining = queue.slice(1);
    const newQueue = insertAtRandomPosition(remaining, word);

    setQueue(newQueue);
    setIncorrectCount(prev => prev + 1);
  }, [queue]);

  const elapsedTime = () => {
    return Math.round((Date.now() - startTimeRef.current) / 1000);
  };

  const sessionStats = {
    totalWords,
    completedCount,
    incorrectCount,
    accuracy: completedCount + incorrectCount > 0
      ? Math.round((completedCount / (completedCount + incorrectCount)) * 100)
      : 0,
    duration: elapsedTime(),
    mode,
  };

  return {
    currentWord,
    queueLength,
    totalWords,
    completedCount,
    markCorrect,
    markIncorrect,
    isSessionComplete,
    isLoading,
    sessionStats,
    resetSession: initSession,
  };
}
