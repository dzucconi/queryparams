# queryparams

## What is this?

A library to help you receive and update parameters in the querystring.

## Why should I use it?

* You want to limit the kinds of parameters you receive from the querystring.
* You need to set some default values and want any values coming from the querystring to be cast as the same type.
* You need a simple interface to reconfigure those values and redirect to a correctly updated querystring.

## Installation

```bash
yarn add queryparams
# or
npm i queryparams --save
```

## Usage

Assume we have a querystring with a value of:

```javascript
'?speed=200&color=blue';
```

## Set defaults

```javascript
import queryparams from 'queryparams';

const CONFIG = queryparams({
  visible: true,
  speed: 500,
  color: 'red',
});

console.log(CONFIG)
// => {
  visible: true,
  speed: 200,
  color: 'blue',
};
```

Any values set in the querystring override the default values. Default values are set in the resulting object along with information from the query string.

## Type coercion

`queryparams` examines the types of defaults that are set and ensures any data you receive matches that type.

```javascript
queryparams({
  visible: true,
  speed: 500,
  color: 'red',
});

console.log(queryparams.schema())
// => {
  visible: 'boolean',
  speed: 'number',
  color: 'string',
};
```

## Reconfiguring the querystring

```javascript
parameters({
  message: 'default',
  size: 9,
});

parameters.reconfigure({
  message: 'new',
  size: 5,
}); // redirects to `?message=new&size=5`
```
