# queryparams

Parse and coerce query string. Set defaults and enforce a schema.

## Installation

```
npm i queryparams --save
```

## Usage

```javascript
window.location.search === '?speed=200&color=blue'; // true
```

## Defaults

```javascript
import queryparams from 'queryparams';

const CONFIG = queryparams({
  visible: true,
  speed: 500,
  color: 'red',
});

isEqual(CONFIG, {
  visible: true,
  speed: 200,
  color: 'blue',
}); // true
```

## Schema

```javascript
isEqual(queryparams.schema(), {
  visible: 'boolean',
  speed: 'number',
  color: 'string',
}); // true
```

## Reconfigure

```javascript
window.parameters = require('queryparams');

parameters({
  message: 'default',
  size: 9,
});

// From a console
parameters.reconfigure({
  message: 'new',
  size: 5,
}); // redirects to `?message=new&size=5`
```
