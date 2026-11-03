export const VOCAB_DATA = [
  { word: 'GORGEOUS', options: ['Sangat cantik', 'Sangat marah', 'Sangat lapar', 'Sangat mahal'], correct: 0 },
  { word: 'EXHAUSTED', options: ['Sangat lelah', 'Sangat senang', 'Sangat bingung', 'Sangat cepat'], correct: 0 },
  { word: 'ANXIOUS', options: ['Cemas/Gelisah', 'Marah sekali', 'Lucu', 'Ramah'], correct: 0 },
  { word: 'IMPOSING', options: ['Megah/Mengesankan', 'Biasa saja', 'Kecil', 'Ringan'], correct: 0 },
  { word: 'PECKISH', options: ['Agak lapar', 'Sangat haus', 'Tidur nyenyak', 'Bosan'], correct: 0 },
  { word: 'DELIGHTED', options: ['Sangat gembira', 'Kecewa berat', 'Takut', 'Malu'], correct: 0 },
  { word: 'STUBBORN', options: ['Keras kepala', 'Penurut', 'Pintar', 'Penyabar'], correct: 0 },
  { word: 'AMBITIOUS', options: ['Berambisi besar', 'Malas', 'Pendiam', 'Sombong'], correct: 0 },
  { word: 'BRILLIANT', options: ['Sangat cerdas', 'Biasa saja', 'Gelap', 'Kasar'], correct: 0 },
  { word: 'GENEROUS', options: ['Dermawan/Pemurah', 'Pelit', 'Jahat', 'Lembet'], correct: 0 },
  { word: 'METICULOUS', options: ['Sangat teliti', 'Ceroboh', 'Santai', 'Cepat'], correct: 0 },
  { word: 'ECSTATIC', options: ['Sangat gembira', 'Sedih', 'Bosan', 'Lapar'], correct: 0 },
];

export const SCRAMBLE_DATA = [
  { word: 'ENGLISH', hint: 'Bahasa Internasional', difficulty: 'Easy' },
  { word: 'APPLE', hint: 'Buah apel', difficulty: 'Easy' },
  { word: 'FRIEND', hint: 'Teman / Sahabat', difficulty: 'Medium' },
  { word: 'FUTURE', hint: 'Masa depan', difficulty: 'Medium' },
  { word: 'KNOWLEDGE', hint: 'Pengetahuan', difficulty: 'Hard' },
  { word: 'CHALLENGE', hint: 'Tantangan', difficulty: 'Hard' },
  { word: 'CAMPUS', hint: 'Tempat kuliah', difficulty: 'Easy' },
  { word: 'SPEAKER', hint: 'Pembicara', difficulty: 'Medium' },
  { word: 'VOCABULARY', hint: 'Kosakata', difficulty: 'Hard' },
];

export const GENZ_DATA = [
  { phrase: 'Bro is cooked', question: 'artinya apa?', options: ['Dia sedang memasak', 'Dia dalam masalah besar', 'Dia lapar berat', 'Dia marah sekali'], correct: 1 },
  { phrase: "That's lowkey fire", question: 'maksudnya...', options: ['Kebakaran kecil', 'Biasa saja', 'Diam-diam keren banget', 'Terlalu panas'], correct: 2 },
  { phrase: 'Bro has negative aura', question: 'menggambarkan orang yang...', options: ['Sangat karismatik', 'Canggung / Bikin ilfeel', 'Lagi mati lampu', 'Pintar fisika'], correct: 1 },
  { phrase: "I'm locked in", question: 'berarti...', options: ['Terkunci di kamar', 'Sangat fokus / serius', 'Lupa password', 'Lagi malas-malasan'], correct: 1 },
  { phrase: 'Let him cook', question: 'digunakan saat...', options: ['Menyuruh masak mie', 'Biarkan dia tunjukkan aksinya', 'Melarang orang bicara', 'Mengajak makan siang'], correct: 1 },
  { phrase: 'Main character energy', question: 'artinya...', options: ['Pemain sinetron', 'Percaya diri & pusat perhatian', 'Suka nonton film', 'Orang yang pemalu'], correct: 1 },
];

export const IMPOSTOR_DATA = [
  { options: ['APPLE', 'BANANA', 'ORANGE', 'CARROT'], impostor: 3, reason: 'CARROT adalah Sayuran, bukan Buah!' },
  { options: ['HAPPY', 'JOYFUL', 'CHEERFUL', 'MISERABLE'], impostor: 3, reason: 'MISERABLE bermakna sedih, yang lain gembira!' },
  { options: ['RUN', 'WALK', 'JUMP', 'BEAUTIFUL'], impostor: 3, reason: 'BEAUTIFUL adalah kata sifat, sisanya kata kerja!' },
  { options: ['DOG', 'CAT', 'LION', 'AIRPLANE'], impostor: 3, reason: 'AIRPLANE bukan Hewan!' },
  { options: ['SWIMMING', 'SKIING', 'SURFING', 'READING'], impostor: 3, reason: 'READING bukan Olahraga Air!' },
  { options: ['COLD', 'FREEZING', 'CHILLY', 'BOILING'], impostor: 3, reason: 'BOILING bermakna panas mendidih!' },
];

export const GRAMMAR_DATA = [
  { options: ["She don't like coffee.", "She doesn't like coffee."], correct: 1 },
  { options: ['They is going to school.', 'They are going to school.'], correct: 1 },
  { options: ['I have lived here since 2020.', 'I have lived here for 2020.'], correct: 0 },
  { options: ['He go to campus yesterday.', 'He went to campus yesterday.'], correct: 1 },
  { options: ['Which one is correct?', 'Who one is correct?'], correct: 0 },
  { options: ['There are many peoples.', 'There are many people.'], correct: 1 },
];