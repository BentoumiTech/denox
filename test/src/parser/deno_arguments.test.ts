import { assertEquals, assertArrayContains } from "../../../dev_deps.ts";
import { buildDenoCLIOptionsArgs } from "../../../src/deno_options/build_cli_arguments.ts";

Deno.test("parse a single value CLI option", () => {
  assertEquals(
    buildDenoCLIOptionsArgs({ "allow-net": "example.com" }),
    ["--allow-net=example.com"],
  );
});

Deno.test("parse a truthy boolean value CLI option", () => {
  assertEquals(
    buildDenoCLIOptionsArgs({ "allow-env": true }),
    ["--allow-env"],
  );
});

Deno.test("parse a falsey boolean value CLI option", () => {
  assertEquals(
    buildDenoCLIOptionsArgs({ "allow-env": false }),
    [],
  );
});

Deno.test("parse an array of values CLI option", () => {
  assertEquals(
    buildDenoCLIOptionsArgs({ "allow-net": ["example.com", "google.com"] }),
    ["--allow-net=example.com,google.com"],
  );
});

Deno.test("parse mutliple CLI option", () => {
  const cliArgumentsArray = buildDenoCLIOptionsArgs(
    {
      "allow-net": ["example.com", "google.com"],
      "allow-env": true,
      "allow-read": ".",
    },
  );

  assertArrayContains(
    cliArgumentsArray,
    ["--allow-net=example.com,google.com", "--allow-env", "--allow-read=."],
  );

  assertEquals(cliArgumentsArray.length, 3);
});
