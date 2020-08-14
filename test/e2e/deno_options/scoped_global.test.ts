import {
  assertEquals,
  assertStringContains,
  stripColor,
} from "../../../dev_deps.ts";
import { testDenoXRun } from "../../utils/denox-run.ts";

Deno.test("run script with scoped options", async () => {
  await testDenoXRun(
    "start",
    "test/fixture/script_permission",
    async ({ code, output }) => {
      assertEquals(code, 0);
      output = stripColor(output);
      assertStringContains(output, "I'm text file content");
    },
  );
});

Deno.test("run script with global options", async () => {
  await testDenoXRun(
    "start",
    "test/fixture/global_permission",
    async ({ code, output }) => {
      assertEquals(code, 0);
      output = stripColor(output);
      assertStringContains(output, "I'm text file content");
    },
  );
});

Deno.test("run script with scoped and global options", async () => {
  await testDenoXRun(
    "start",
    "test/fixture/script_global_permission",
    async ({ code, output }) => {
      assertEquals(code, 0);
      output = stripColor(output);
      assertStringContains(output, "I'm text file content");
      assertStringContains(output, "seed: 0.147205063401058");
    },
  );
});

Deno.test("run script with erroneous merged scoped and global options", async () => {
  await testDenoXRun(
    "start",
    "test/fixture/merged_scoped_global__invalid_permission",
    async ({ code, errOutput }) => {
      assertEquals(code, 1);
      errOutput = stripColor(errOutput);
      assertStringContains(
        errOutput,
        'Uncaught PermissionDenied: network access to "https://jsonplaceho',
      );
    },
  );
});
