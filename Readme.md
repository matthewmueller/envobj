# Envobj

Tiny environment variable helper, that I'll use in all my apps.

Ensures that all the required environment variables are present.

## Features

- Automatically pulls from `.env` and `.env.local`
- Throws if you're missing a value or you passed in the wrong type
- Coerces strings into numbers and booleans
- Supports default values

## Install

```
npm install envobj
```

## Usage

```js
var environment = require('envobj')

var env = environment({
  DATABASE_URL: String,
  PORT: 8000, // requires a number, but default value is 8000 if PORT=... is undefined
  USE_PAPERTRAIL: Boolean
})
```

>>> Note: this module pulls environment from the `.env` and `.env.local` using the `localenv` module.
This only happens in development, but make sure it's doing what you're expecting.

## License

MIT
