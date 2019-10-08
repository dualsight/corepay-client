# Corepay Client [![NPM version](https://img.shields.io/npm/v/corepay-client.svg?style=flat)](https://www.npmjs.com/package/corepay-client) [![NPM monthly downloads](https://img.shields.io/npm/dm/corepay-client.svg?style=flat)](https://npmjs.org/package/corepay-client) [![NPM total downloads](https://img.shields.io/npm/dt/corepay-client.svg?style=flat)](https://npmjs.org/package/corepay-client) 
> A JavaScript-based client for https://github.com/dualsight/corepay

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save corepay-client
```

## Usage

```js
const corepayConnector = require('corepay-client')
const corepay = corepayConnector.init({
  port: 3001,
  path: '/webhook',
  remote: 'http://localhost:8700/mycryptoexchange', // Corepay app endpoint
  secret: '<app secret as configured in Corepay>'
})

corepay.on('deposit_alert', (deposits) => {
  console.log('Deposits =>', deposits)
})

corepay.exec(
  'get-deposit-address',
  'bitcoin',
  { meta: { type: 'testnet' } }
)
  .then(res => console.log(res.result))
  .catch(err => console.error(err.message))
```
