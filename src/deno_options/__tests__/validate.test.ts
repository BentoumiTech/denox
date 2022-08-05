import { assertThrows } from "../../../dev_deps.ts";
import { validateOptions } from "../validate.ts";
import {
  DenoOptionIncorrectType,
  DenoOptionNotRecognized,
} from "../../utils/DenoXErrors.ts";

Deno.test("invalid option name error get thrown", () => {
  const options = { "invalid-option": false };

  assertThrows(() => {
    validateOptions(options);
  }, DenoOptionNotRecognized);
});

Deno.test("invalid option value error get thrown", () => {
  const options = { "allow-hrtime": "string" };

  assertThrows(() => {
    validateOptions(options);
  }, DenoOptionIncorrectType);
});

Deno.test("not throw for valid values", () => {
  const options = {
    "allow-hrtime": true,
    "allow-read": ".",
    "allow-write": true,
    "allow-net": ["google.com", "github.com"],
  };
  validateOptions(options);
});
