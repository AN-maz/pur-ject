export function parseQuizSlide(content) {
  const text = content.replace(/<!--\s*quiz\s*-->/, '').trim()

  const titleMatch = text.match(/^##\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1].trim() : 'Quiz'

  const body = text.replace(/^##\s+.+$/m, '').trim()
  const blocks = body.split(/\n(?=Pertanyaan\s+\d+[.:])/).filter(Boolean)
  const questions = []

  for (const block of blocks) {
    const qMatch = block.match(/Pertanyaan\s+\d+[.:]\s*(.+)/)
    if (!qMatch) continue

    const question = qMatch[1].trim()
    const optionRegex = /- \[([ x])\]\s*(.+)/g
    const options = []
    let correctIndex = -1
    let match

    while ((match = optionRegex.exec(block)) !== null) {
      options.push(match[2].trim())
      if (match[1] === 'x') {
        correctIndex = options.length - 1
      }
    }

    if (options.length > 0 && correctIndex >= 0) {
      questions.push({ question, options, correctIndex })
    }
  }

  return { title, questions }
}

export function isQuizSlide(slideContent) {
  return slideContent.trim().startsWith('<!-- quiz -->')
}