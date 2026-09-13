export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleOptions(options, correctIndex) {
  const indexed = options.map((opt, i) => ({ opt, originalIndex: i }));
  const shuffled = shuffleArray(indexed);
  const newCorrect = shuffled.findIndex((item) => item.originalIndex === correctIndex);
  return { shuffledOptions: shuffled.map((item) => item.opt), correctIdx: newCorrect };
}
