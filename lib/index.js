const Client = require('./client')

module.exports = exports = {
  init
}

function init (opts) {
  return Client(opts)
}
