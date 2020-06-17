import { assertEquals, assertStrContains } from "../../dev_deps.ts";
import { testDenoXRun } from "../utils/denox-run.ts";

Deno.test("Return an error when script doesn't exist", async () => {
  await testDenoXRun(
    "not-found-script",
    "test/fixture/single_script",
    async ({ code, errOutput }) => {
      assertEquals(code, 1);
      assertStrContains(errOutput, '"not-found-script" not found');
    },
  );
});

Deno.test("execute existing script", async () => {
  await testDenoXRun(
    "start",
    "test/fixture/single_script",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStrContains(output, "Hello World!");
    },
  );
});

Deno.test("execute existing script when multiple are specified", async () => {
  await testDenoXRun(
    "develop",
    "test/fixture/multiple_scripts",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStrContains(output, "Hello World Develop!");
    },
  );
});

Deno.test("execute existing inline script when multiple are specified with no environment variables", async () => {
  await testDenoXRun(
    "inlineNoEnv",
    "test/fixture/multiple_scripts",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStrContains(output, "my name is: Deno");
    },
  );
});

Deno.test("execute existing inline script when multiple are specified with multiple environment variables", async () => {
  await testDenoXRun(
    "inlineEnv",
    "test/fixture/multiple_scripts",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStrContains(output, "my name is: Deno and my last name is: Script");
    },
  );
});

Deno.env.set("ENV_VAR_1", "Deno");
Deno.env.set("ENV_VAR_2", "Script");

Deno.test("execute existing inline deno script when multiple are specified", async () => {
  // Set the env vars we'll need for testing.

  await testDenoXRun(
    "inline",
    "test/fixture/multiple_scripts",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStrContains(output, "Hello World!");
    },
  );
});
