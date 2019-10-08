const crypto = require('crypto')

module.exports = function (buf, key) {
  const hmac = crypto.createHmac('sha1', key)
  hmac.update(buf, 'utf-8')
  return 'sha1=' + hmac.digest('hex')
}
