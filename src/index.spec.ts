import {
  envobj,
  string,
  boolean,
  number,
  integer,
  InvalidEnvError
} from "./index";

describe("envobj", () => {
  it("should parse env", () => {
    const env = envobj(
      { STRING: string, BOOLEAN: boolean, NUMBER: number },
      { STRING: "foobar" },
      { BOOLEAN: "true" },
      { NUMBER: "123" }
    );

    expect(env).toEqual({ STRING: "foobar", BOOLEAN: true, NUMBER: 123 });
  });

  it("should error on missing keys", () => {
    expect(() => envobj({ MISSING: string }, {})).toThrowError(InvalidEnvError);
  });

  it("should error on invalid keys", () => {
    expect(() => envobj({ INVALID: number }, { INVALID: "test" })).toThrowError(
      InvalidEnvError
    );
  });

  describe("string", () => {
    it("should return strings", () => {
      expect(string("123")).toEqual("123");
    });
  });

  describe("boolean", () => {
    it("should return booleans", () => {
      expect(boolean("true")).toEqual(true);
      expect(boolean("TRUE")).toEqual(true);
      expect(boolean("false")).toEqual(false);
      expect(boolean("FALSE")).toEqual(false);
      expect(boolean("invalid")).toEqual(undefined);
    });
  });

  describe("number", () => {
    it("should return numbers", () => {
      expect(number("123")).toEqual(123);
      expect(number("123.45")).toEqual(123.45);
      expect(number("invalid")).toEqual(undefined);
    });
  });

  describe("integer", () => {
    it("should return integers", () => {
      expect(integer("123")).toEqual(123);
      expect(integer("123.45")).toEqual(undefined);
      expect(integer("invalid")).toEqual(undefined);
    });
  });

  describe("localenv integration", () => {
    beforeAll(() => {
      require("localenv");
    });

    it("should load from `.env`", () => {
      const env = envobj({ LOCALENV_TEST: boolean }, process.env);

      expect(env).toEqual({ LOCALENV_TEST: true });
    });
  });
});
