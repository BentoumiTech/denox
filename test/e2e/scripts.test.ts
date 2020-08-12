import { assertEquals, assertStringContains } from "../../dev_deps.ts";
import { testDenoXRun } from "../utils/denox-run.ts";

Deno.test("Return an error when script doesn't exist", async () => {
  await testDenoXRun(
    "not-found-script",
    "test/fixture/single_script",
    async ({ code, errOutput }) => {
      assertEquals(code, 1);
      assertStringContains(errOutput, '"not-found-script" not found');
    },
  );
});

Deno.test("execute existing script", async () => {
  await testDenoXRun(
    "start",
    "test/fixture/single_script",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStringContains(output, "Hello World!");
    },
  );
});

Deno.test("execute existing script when multiple are specified", async () => {
  await testDenoXRun(
    "develop",
    "test/fixture/multiple_scripts",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStringContains(output, "Hello World Develop!");
    },
  );
});
