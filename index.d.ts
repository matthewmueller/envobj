declare function envobj <T> (config: envobj.Config<T>): T

declare namespace envobj {
  type Config <T> = {
    [K in keyof T]: string | number | boolean | typeof Number | typeof String | typeof Boolean
  }
}

export = envobj
