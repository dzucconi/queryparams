# queryparams

Parse and coerce the query string + simply set defaults.

## Installation

```
npm i queryparams --save
```

## Usage

```javascript
const queryparams = require('queryparams');

const PARAMS = queryparams({
  somedefault: true,
  speed: 500,
  color: 'blue'
});

// url has a querystring of `?speed=200&fate=sealed`
// PARAMS => { somedefault: true, speed: 200, color: 'blue', fate: 'sealed' };
```
