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
  port: 3001, // webhook port
  path: '/webhook', // webhook URI
  remote: 'http://localhost:8700/mycryptoexchange', // Corepay app endpoint
  secret: '<app secret as configured in Corepay>'
})

// Listen for deposits
corepay.on('deposit_alert', (deposits) => {
  console.log(JSON.stringify(deposits, null, 2))
})

// Check Ethereum address balance
corepay.core('ethereum').queryBalance({
  address: '0xbcf783a8d2965700ac00795f022746ff6d034338'
})
  .then(data => console.log(data))
  .catch(err => console.error(err.message))


// Check Ethereum address (raw API method)
corepay.exec(
  'query-balance',
  'ethereum',
  { address: '0xbcf783a8d2965700ac00795f022746ff6d034338' }
)
  .then(res => console.log(res.result))
  .catch(err => console.error(err.message))
```
