import { assertEquals, assertThrows } from "../../../dev_deps.ts";
import { parseDenoOptions } from "../parse.ts";
import { DenoOptionIncorrectType } from "../../utils/DenoXErrors.ts";

Deno.test("deno_options not defined", () => {
  const script = { file: ''};
  const global = {};
  const denoOptions = parseDenoOptions(global, script);

  assertEquals(
    denoOptions,
    [],
  );
});

Deno.test("deno_options only defined in globals", () => {
  const script = { file: ''};
  const global = {deno_options: {'allow-read': true}};
  const denoOptions = parseDenoOptions(global, script);

  assertEquals(
    denoOptions,
    ['--allow-read'],
  );
});

Deno.test("deno_options only defined in script", () => {
  const script = {deno_options: {'allow-read': true}, file: ''};
  const global = {};
  const denoOptions = parseDenoOptions(global, script);

  assertEquals(
    denoOptions,
    ['--allow-read'],
  );
});

Deno.test("deno_options only defined in script and globals", () => {
  const script = {deno_options: {'allow-read': true}, file: ''};
  const global = {deno_options: {'allow-write': true}};
  const denoOptions = parseDenoOptions(global, script);

  assertEquals(
    denoOptions,
    ['--allow-write', '--allow-read'],
  );
});


Deno.test("deno_options script overwrite globals one", () => {
  const script = {deno_options: {'allow-read': false}, file: ''};
  const global = {deno_options: {'allow-read': true}};
  const denoOptions = parseDenoOptions(global, script);

  assertEquals(
    denoOptions,
    [],
  );
});


Deno.test("validation error get thrown", () => {
  const script = {deno_options: {'allow-read': false}, file: ''};
  const global = {deno_options: {'allow-hrtime': 'string'}};

  assertThrows(() => {
    parseDenoOptions(global, script);
  }, DenoOptionIncorrectType);
});

