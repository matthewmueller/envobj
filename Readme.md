# Envobj

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Tiny environment variable helper.

Ensures that all the required variables are present. Throws on invalid and missing values.

## Install

```
npm install envobj
```

## Usage

```js
const { envobj, string, number, boolean } = require("envobj");

const env = envobj(
  {
    DATABASE_URL: string,
    PORT: number,
    USE_PAPERTRAIL: boolean
  },
  process.env,
  {
    PORT: "8000" // Requires a number, set `8000` if `PORT` is missing.
  }
);
```

**Built-in validators:** `string`, `number`, `boolean` and `integer`.

### `.env`

Use with [`localenv`](https://github.com/defunctzombie/localenv) to populate `process.env` automatically in development from `.env` and `.env.local`.

```js
import { envobj, number } from "envobj";

import "localenv";

export const env = envobj(
  {
    PORT: number
  },
  process.env
);
```

**Tip:** Check in `.env` and exclude `.env.local` so teammates can get started quickly.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/envobj.svg?style=flat
[npm-url]: https://npmjs.org/package/envobj
[downloads-image]: https://img.shields.io/npm/dm/envobj.svg?style=flat
[downloads-url]: https://npmjs.org/package/envobj
[travis-image]: https://img.shields.io/travis/matthewmueller/envobj.svg?style=flat
[travis-url]: https://travis-ci.org/matthewmueller/envobj
[coveralls-image]: https://img.shields.io/coveralls/matthewmueller/envobj.svg?style=flat
[coveralls-url]: https://coveralls.io/r/matthewmueller/envobj?branch=master
