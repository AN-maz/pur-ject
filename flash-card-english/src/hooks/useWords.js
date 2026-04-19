import { useState, useEffect, useCallback } from 'react';
import db from '../db/database';

export function useWords() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWords = useCallback(async () => {
    setLoading(true);
    const allWords = await db.words.toArray();
    setWords(allWords);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  const importWords = useCallback(async (jsonData) => {
    const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    await db.words.bulkPut(parsed);
    await loadWords();
    return parsed.length;
  }, [loadWords]);

  const getUnmasteredWords = useCallback(async (limit) => {
    const unmastered = await db.words
      .where('status')
      .notEqual('mastered')
      .limit(limit)
      .toArray();
    return unmastered;
  }, []);

  const markAsMastered = useCallback(async (wordId) => {
    await db.words.update(wordId, { status: 'mastered' });
    await loadWords();
  }, [loadWords]);

  const getWordsByType = useCallback(async (type) => {
    return await db.words.where('type').equals(type).toArray();
  }, []);

  const getAllWords = useCallback(async () => {
    return await db.words.toArray();
  }, []);

  const getWordCount = useCallback(async () => {
    const total = await db.words.count();
    const mastered = await db.words.where('status').equals('mastered').count();
    return { total, mastered, learning: total - mastered };
  }, []);

  const resetAllWords = useCallback(async () => {
    await db.words.toCollection().modify({ status: 'new' });
    await loadWords();
  }, [loadWords]);

  return {
    words,
    loading,
    importWords,
    getUnmasteredWords,
    markAsMastered,
    getWordsByType,
    getAllWords,
    getWordCount,
    resetAllWords,
    refresh: loadWords
  };
}
