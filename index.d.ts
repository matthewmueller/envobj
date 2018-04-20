declare function envobj <T> (config: T): envobj.Result<T>
declare function envobj <T> (config: envobj.Config<T>): T

declare namespace envobj {
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
