import xss from 'xss'

export function sanitize (fields = []) {
  return function (req, res, next) {
    if (req.method === 'GET') return next()
    if (Array.isArray(fields)) {
      fields.forEach((f) => {
        if (req.body[f]) req.body[f] = xss(req.body[f], { whiteList: {}, stripIgnoreTag: true })
      })
    }
    next()
  }
}

export function sanitizeContent (content) {
  if (typeof content !== 'string') return ''
  return xss(content, {
    whiteList: {
      b: [], strong: [], i: [], em: [], a: ['href'],
      code: [], pre: [], span: [], div: [], p: [],
      h1: [], h2: [], h3: [], h4: [], h5: [], h6: [],
      ul: [], ol: [], li: [], blockquote: [],
      img: ['src', 'alt'], hr: [], br: [], table: [],
      thead: [], tbody: [], tr: [], th: [], td: []
    },
    stripIgnoreTag: true
  })
}
