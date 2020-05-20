import {
  assertEquals,
  assertStrContains,
  resolve,
  join,
} from "../../../dev_deps.ts";
import { testDenoXRun } from "../../utils/denox-run.ts";
import { exists } from "../../../src/utils/file.ts";

Deno.test("test permissions are applied", async () => {
  await testDenoXRun(
    "permissions",
    "test/fixture/deno_options",
    async ({ output, code }) => {
      assertEquals(code, 0);

      assertStrContains(
        output,
        'allow-env: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-hrtime: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-net: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-plugin: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-read: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-run: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-write: PermissionStatus { state: "granted" }',
      );
    },
  );
});

Deno.test("test allow-all permissions are applied", async () => {
  await testDenoXRun(
    "all-permissions",
    "test/fixture/deno_options",
    async ({ output, code }) => {
      assertEquals(code, 0);

      assertStrContains(
        output,
        'allow-env: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-hrtime: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-net: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-plugin: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-read: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-run: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-write: PermissionStatus { state: "granted" }',
      );
    },
  );
});

Deno.test("test false permissions are applied", async () => {
  await testDenoXRun(
    "false-permissions",
    "test/fixture/deno_options",
    async ({ output, code }) => {
      assertEquals(code, 0);

      assertStrContains(
        output,
        'allow-env: PermissionStatus { state: "prompt" }',
      );
      assertStrContains(
        output,
        'allow-hrtime: PermissionStatus { state: "prompt" }',
      );
      assertStrContains(
        output,
        'allow-net: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-plugin: PermissionStatus { state: "prompt" }',
      );
      assertStrContains(
        output,
        'allow-read: PermissionStatus { state: "granted" }',
      );
      assertStrContains(
        output,
        'allow-run: PermissionStatus { state: "prompt" }',
      );
      assertStrContains(
        output,
        'allow-write: PermissionStatus { state: "granted" }',
      );
    },
  );
});

Deno.test("test seed option is applied", async () => {
  await testDenoXRun(
    "seed",
    "test/fixture/deno_options",
    async ({ output, code }) => {
      assertEquals(code, 0);
      assertStrContains(output, "seed: 0.147205063401058");
    },
  );
});

Deno.test("test quiet option is applied", async () => {
  await testDenoXRun(
    "quiet",
    "test/fixture/deno_options",
    async ({ output, code }) => {
      assertEquals(code, 0);
      assertStrContains(output, "Only console.log\n");
    },
  );
});

Deno.test("test lock option is applied", async () => {
  await testDenoXRun("lock", "test/fixture/deno_options", async ({ code }) => {
    const lockFilePath = resolve("../../fixture/deno_options/files/lock.json");
    const isLockFilePresent = await exists(lockFilePath);

    assertEquals(code, 0);
    assertEquals(isLockFilePresent, true);

    await Deno.remove(lockFilePath);
  });
});

Deno.test("test log-level option is applied", async () => {
  await testDenoXRun(
    "log-level",
    "test/fixture/deno_options",
    async ({ code, output }) => {
      assertEquals(code, 0);
      assertStrContains(output, "DEBUG JS");
    },
  );
});

Deno.test("test config option is applied", async () => {
  await testDenoXRun(
    "config",
    "test/fixture/deno_options",
    async ({ code, output }) => {
      const tsconfigPath = join("files", "tsconfig.json");

      assertEquals(code, 0);
      assertStrContains(output, tsconfigPath);
    },
  );
});

Deno.test("test import map option is applied", async () => {
  await testDenoXRun(
    "import-map",
    "test/fixture/deno_options",
    async ({ code, errOutput }) => {
      assertEquals(code, 0);
      assertStrContains(
        errOutput,
        'ModuleSpecifier("https://deno.land/std/http/"',
      );
    },
  );
});

Deno.test("test v8-flags, cached-only, cert, no-remote, reload options do not crash", async () => {
  await testDenoXRun(
    "rest-options",
    "test/fixture/deno_options",
    async ({ code }) => {
      assertEquals(code, 0);
    },
  );
});
