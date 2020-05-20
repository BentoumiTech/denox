import { parse } from "https://deno.land/std/flags/mod.ts";

console.log(JSON.stringify({
  parsed: parse(Deno.args, { "--": true }),
  raw: Deno.args
}));
