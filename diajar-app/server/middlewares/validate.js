export function validate (schema, source = 'body') {
  return function (req, res, next) {
    const data = req[source]
    const result = schema.safeParse(data)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.issues.map((i) => ({
          field: i.path.length ? i.path.join('.') : source,
          message: i.message
        }))
      })
    }
    Object.defineProperty(req, source, {
      value: result.data,
      writable: true,
      configurable: true
    })
    next()
  }
}
