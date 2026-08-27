export function success (res, message, data = {}, status = 200) {
  return res.status(status).json({ success: true, message, data })
}

export function created (res, message, data = {}) {
  return success(res, message, data, 201)
}

export function error (res, message, status = 500, errors = null) {
  return res.status(status).json({ success: false, message, errors })
}
