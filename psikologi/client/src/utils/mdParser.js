import matter from 'front-matter';

// Impor semua file .md secara dinamis (fitur Vite import.meta.glob)
const modules = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllTests() {
  return Object.keys(modules).map((path) => {
    const fileContent = modules[path];
    const { attributes } = matter(fileContent);
    return attributes;
  });
}

// Parse numbered list menjadi daftar pertanyaan. Format per soal:
//
//   1. Teks pertanyaan.
//      - 0. Label opsi kustom (opsional, kalau tiap soal punya opsi beda)
//      - 1. Label opsi kustom
//
// Baris lanjutan biasa ikut digabung ke teks pertanyaan. Baris diawali '#' dianggap
// bagian instruksi. Sub-list "- <skor>. <label>" menjadi opsi jawaban per soal.
function parseQuestions(content) {
  const lines = content.split('\n');
  const questions = [];
  let current = null;

  for (const line of lines) {
    const questionMatch = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
    const optionMatch = line.match(/^\s*-\s+(-?\d+)[.)]\s+(.*)$/);

    if (questionMatch) {
      current = {
        number: parseInt(questionMatch[1], 10),
        text: questionMatch[2],
      };
      questions.push(current);
    } else if (optionMatch && current) {
      if (!current.options) current.options = [];
      current.options.push({
        score: parseInt(optionMatch[1], 10),
        label: optionMatch[2],
      });
    } else if (current && line.trim() !== '' && !line.trim().startsWith('#')) {
      current.text += '\n' + line;
    }
  }

  return questions;
}

// Body markdown tanpa baris soal dan opsi — dipakai menampilkan petunjuk via react-markdown.
function stripQuestions(content) {
  return content
    .split('\n')
    .filter((line) => !/^\s*\d+[.)]\s+/.test(line) && !/^\s*-\s+-?\d+[.)]\s+/.test(line))
    .join('\n');
}

// Rentang skor minimum & maksimum yang mungkin dari seluruh set opsi (global + per-soal).
function answerScale(metadata, questions) {
  const allOptions = metadata.options || [];
  const perQuestion = questions.flatMap((q) => q.options || []);
  const merged = allOptions.concat(perQuestion);
  if (merged.length === 0) return { min: 0, max: 0 };
  return {
    min: Math.min(...merged.map((o) => o.score)),
    max: Math.max(...merged.map((o) => o.score)),
  };
}

export function getTestById(id) {
  const path = `/src/content/${id}.md`;
  const fileContent = modules[path];
  if (!fileContent) return null;

  const { attributes, body } = matter(fileContent);
  const questions = parseQuestions(body);

  return {
    metadata: attributes,
    rawContent: body,
    questions,
    instructionsContent: stripQuestions(body),
    answerScale: answerScale(attributes, questions),
  };
}