import db from '../db/database';
import { shuffleArray } from './sessionQueue';

/**
 * Generate smart distractors for a quiz question.
 * Picks 3 random words of the SAME TYPE as the target word
 * to make the quiz challenging.
 */
export async function generateDistractors(targetWord) {
  // Get all words of the same type, excluding the target
  let sameTypeWords = await db.words
    .where('type')
    .equals(targetWord.type)
    .toArray();

  sameTypeWords = sameTypeWords.filter(w => w.id !== targetWord.id);

  // If not enough same-type words, fill with random words
  if (sameTypeWords.length < 3) {
    const allWords = await db.words.toArray();
    const otherWords = allWords.filter(
      w => w.id !== targetWord.id && !sameTypeWords.find(s => s.id === w.id)
    );
    sameTypeWords = [...sameTypeWords, ...otherWords];
  }

  // Shuffle and pick 3
  const shuffled = shuffleArray(sameTypeWords);
  const distractors = shuffled.slice(0, 3);

  // Build options array: target + 3 distractors, then shuffle
  const options = shuffleArray([
    { id: targetWord.id, meaning: targetWord.meaning, isCorrect: true },
    ...distractors.map(d => ({ id: d.id, meaning: d.meaning, isCorrect: false }))
  ]);

  return options;
}
