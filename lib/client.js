const Emitter = require('component-emitter')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const signature = require('./signature')

module.exports = Client

function Client (opts) {
  this.opts = opts
  this.server = express()
  this.server.use(bodyParser.json({
    verify: function (req, res, buf, encoding) {
      const expected = req.headers['x-corepay-signature']
      const calculated = signature(buf, opts.secret)
      if (expected !== calculated) {
        throw new Error('Invalid signature.')
      }
    }
  }))
  this.server.use(function (err, req, res, next) {
    if (err) {
      console.log(err)
      res.status(400).send({ error: 'Invalid signature.' })
    } else {
      next()
    }
  })
  this.server.post(opts.path, function (req, res) {
    this.emit(req.body.ref, req.body.data)
    res.status(200).send('done!')
  })
  this.server.listen(opts.port)

  this.exec = function (method, core, payload={}) {
    payload = JSON.stringify(payload)

    return new Promise((resolve, reject) => {
      fetch(`${this.opts.remote.replace(/^\/+/g, '')}/${method}/${core}`, {
        method: 'post',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          'X-Corepay-Signature': signature(payload, opts.secret)
        },
      })
        .then(res => res.json())
        .then(json => {
          resolve(json)
        })
        .catch(err => reject(err))
    })
  }

  this.core = function (coreSlug) {
    return {
      ping: function (payload={}) {
        return new Promise(function (resolve, reject) {
          this.exec('ping', coreSlug, payload)
            .then(res => resolve(res.result))
            .catch(err => reject(err))
        })
      },

      getDepositAddress: function (payload={}) {
        return new Promise(function (resolve, reject) {
          this.exec('get-deposit-address', coreSlug, payload)
            .then(res => resolve(res.result))
            .catch(err => reject(err))
        })
      },

      withdraw: function (payload={}) {
        return new Promise(function (resolve, reject) {
          this.exec('withdraw', coreSlug, payload)
            .then(res => resolve(res.result))
            .catch(err => reject(err))
        })
      },

      queryTransaction: function (payload={}) {
        return new Promise(function (resolve, reject) {
          this.exec('query-transaction', coreSlug, payload)
            .then(res => resolve(res.result))
            .catch(err => reject(err))
        })
      },

      queryBalance: function (payload={}) {
        return new Promise(function (resolve, reject) {
          this.exec('query-balance', coreSlug, payload)
            .then(res => resolve(res.result))
            .catch(err => reject(err))
        })
      }
    }
  }

  Emitter(this)
  return this
}
