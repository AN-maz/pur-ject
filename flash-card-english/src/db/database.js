import Dexie from 'dexie';

const db = new Dexie('AtelierFlashcards');

db.version(1).stores({
  words: 'id, word, type, status, frequency',
  sessions: '++id, date, wordsCompleted, mode, duration',
  dailyStats: 'date'
});

export default db;
