const logRequest = (req, res, next) => {
  console.log(`
  ${new Date().toLocaleTimeString()}
  PATH: ${req.path}
  METHOD: ${req.method}
  `)

  next()
}

module.exports = logRequest