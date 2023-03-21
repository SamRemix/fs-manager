const logRequest = ({ path, method }, res, next) => {
  console.log(`
  TIME: ${new Date().toLocaleTimeString()}
  PATH: ${path}
  METHOD: ${method}
  `)

  next()
}

module.exports = logRequest