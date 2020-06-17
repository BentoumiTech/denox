import { testDenoXRun } from "../utils/denox-run.ts";
import { assertEquals } from "../../dev_deps.ts";

Deno.test("Args are passed to the denox script", async () => {
  const args = {
    parsed: {
      _: ["first", "second", "third"],
      s: "value",
      full: "value",
      "--": ["--test=arg", "fourth", "fifth"],
    },
    "raw": [
      "first",
      "second",
      "third",
      "-s=value",
      "--full=value",
      "--",
      "--test=arg",
      "fourth",
      "fifth",
    ],
  };

  await testDenoXRun(
    "start",
    "test/fixture/args",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertEquals(JSON.parse(output), args);
    },
    "first second third -s=value --full=value -- --test=arg fourth fifth".split(
      " ",
    ),
  );
});
