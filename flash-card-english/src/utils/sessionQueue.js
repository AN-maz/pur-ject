/**
 * Fisher-Yates shuffle algorithm
 */
export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Insert a word back into the queue at a random position
 * (not at index 0 to avoid immediate repetition)
 */
export function insertAtRandomPosition(queue, word) {
  const newQueue = [...queue];
  const minIndex = Math.min(2, newQueue.length);
  const randomIndex = minIndex + Math.floor(Math.random() * (newQueue.length - minIndex + 1));
  newQueue.splice(randomIndex, 0, word);
  return newQueue;
}

/**
 * Build the initial session queue from a list of words
 */
export function buildQueue(words) {
  return shuffleArray(words);
}
