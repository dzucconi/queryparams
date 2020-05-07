# queryparams

## What is this?

A library to help you receive and update parameters in the querystring.

## Why should I use it?

- You want to limit the types of parameters you receive from the querystring.
- You need to set some default values and want any values coming from the querystring to be cast as the same type.
- You need a simple interface to reconfigure those values and redirect to a correctly updated querystring.

## Installation

```bash
yarn add queryparams
# or
npm i queryparams --save
```

## Usage

Assume we have a querystring with a value of:

```ts
"?speed=200&color=blue";
```

## Set defaults and infer types

```ts
import { configure } from "queryparams";

const { params } = configure({ visible: true, speed: 500, color: "red" });

// params: {
//   visible: boolean;
//   speed: number;
//   color: string;
// }
```

Values in the querystring override the default values and are coerced into matching types.

```ts
const { schema } = configure({
  visible: true,
  speed: 500,
  color: "red",
});

// schema => [
//   { param: 'visible', default: true, type: 'boolean' },
//   { param: 'speed', default: 500, type: 'number' },
//   { param: 'color', default: 'red', type: 'string' }
]
```

## Reconfiguring the querystring

```ts
const { reconfigure, encode } = configure({ message: "default", size: 9 });

encode({ message: "next", size: 66 }); // => 'message=next&size=66'
encode({ message: "next", size: "notanumber" }); // => Uncaught Error: size should be a number
encode({ weird: true }); // => Uncaught Error: weird should be undefined

// redirects to `?message=new&size=5`; enforces that types match defaults provided
reconfigure({ message: "new", size: 5 });
```
