declare function envobj <T extends envobj.ValidConfig> (config: T): envobj.Result<T>
declare function envobj <T extends envobj.ValidResult> (config: envobj.Config<T>): T

declare namespace envobj {
  interface ValidConfig {
    [key: string]: string | typeof String | number | typeof Number | boolean | typeof Boolean
  }

  interface ValidResult {
    [key: string]: string | number | boolean
  }

  type Config <T> = {
    [K in keyof T]: T[K] extends string
      ? (string | typeof String) : T[K] extends number
      ? (number | typeof Number) : T[K] extends boolean
      ? (boolean | typeof Boolean) : never
  }

  type Result <T> = {
    [K in keyof T]: T[K] extends string | typeof String
      ? string : T[K] extends number | typeof Number
      ? number : T[K] extends boolean | typeof Boolean
      ? boolean : never
  }
}

export = envobj
