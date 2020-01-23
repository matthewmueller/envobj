import { BaseError } from "make-error";

/**
 * Create error message from missing and invalid parameters.
 */
function makeMessage(
  missing: Array<PropertyKey>,
  invalid: Array<[PropertyKey, any]>
) {
  const message: string[] = [];

  if (missing.length) {
    const details = missing.join(", ");

    message.push(`Missing values: ${details}`);
  }

  if (invalid.length) {
    const details = invalid
      .map(([key, value]) => `${String(key)}: ${value}`)
      .join(", ");

    message.push(`Invalid values: ${details}`);
  }

  return message.join("; ");
}

/**
 * Invalid environment error.
 */
export class InvalidEnvError<T extends PropertyKey> extends BaseError {
  constructor(public missing: T[], public invalid: Array<[T, any]>) {
    super(makeMessage(missing, invalid));
  }
}

/**
 * Valid schema object.
 */
export interface Schema {
  [key: string]: (value: string) => any;
}

/**
 * Valid source object.
 */
export type Source<T extends PropertyKey> = Partial<Record<T, string>>;

/**
 * Derive the environment from a simple schema.
 */
export type Env<T extends Schema> = {
  [K in keyof T]: Exclude<ReturnType<T[K]>, undefined>;
};

/**
 * Tiny environment variable helper.
 */
export function envobj<T extends Schema>(
  schema: T,
  source: Source<keyof T>,
  ...sources: Source<keyof T>[]
): Env<T> {
  const env: Env<T> = Object.create(null);
  const missing: Array<keyof T> = [];
  const invalid: Array<[keyof T, any]> = [];

  for (const key of Object.keys(schema) as (keyof T)[]) {
    let value: string | undefined = source[key];

    for (const source of sources) {
      if (value !== undefined) break;
      value = source[key];
    }

    if (value === undefined) {
      missing.push(key);
    } else {
      const result = schema[key](value);
      if (result === undefined) invalid.push([key, value]);
      env[key] = result;
    }
  }

  // Throw on invalid environment.
  if (invalid.length || missing.length) {
    throw new InvalidEnvError(missing, invalid);
  }

  return env;
}

/**
 * Parse string variable.
 */
export const string = (input: string) => String(input);

/**
 * Parse boolean variable.
 */
export const boolean = (input: string) => {
  const value = input.toLowerCase();
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

/**
 * Parse numeric variable.
 */
export const number = (input: string) => {
  const value = Number(input);
  if (isNaN(value)) return undefined;
  return value;
};

/**
 * Parse integer variable.
 */
export const integer = (input: string) => {
  const value = Number(input);
  if (isNaN(value) || value % 1 !== 0) return undefined;
  return value;
};
