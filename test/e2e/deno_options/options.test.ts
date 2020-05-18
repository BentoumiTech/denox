import { assertEquals, assertStrContains, resolve } from "../../../dev_deps.ts";
import { changeAndRestoreCWD } from "../../utils/cwd.ts";

async function testDenoXRun(
  scriptName: string,
  assertRunOutput: (denoxOutput: { output: string; errOutput: string, code: number }) => Promise<void>,
) {
  await changeAndRestoreCWD(
    `test/fixture/deno_options`,
    async (denoxPath) => {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "-A",
          denoxPath,
          "run",
          scriptName,
        ],
        stdout: "piped",
        stderr: "piped",
      });

      const outputBuffer = await p.output();
      const errOutputBuffer = await p.stderrOutput();
      const { code } = await p.status();

      const output = new TextDecoder().decode(outputBuffer);
      const errOutput = new TextDecoder().decode(errOutputBuffer);

      p.close();

      await assertRunOutput({ output, errOutput, code });
    },
  );
}

async function exists(filename: string): Promise<boolean> {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
}

Deno.test("test permissions are applied", async () => {
  await testDenoXRun("permissions", async ({ output, code }) => {
    assertEquals(code, 0);

    assertStrContains(
      output,
      'allow-env: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-hrtime: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-net: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-plugin: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-read: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-run: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-write: PermissionStatus { state: \"granted\" }',
    );
  });
});

Deno.test("test all permissions are applied", async () => {
  await testDenoXRun("all-permissions", async ({ output, code }) => {
    assertEquals(code, 0);

    assertStrContains(
      output,
      'allow-env: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-hrtime: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-net: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-plugin: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-read: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-run: PermissionStatus { state: \"granted\" }',
    );
    assertStrContains(
      output,
      'allow-write: PermissionStatus { state: \"granted\" }',
    );
  });
});

Deno.test("test seed option is applied", async () => {
  await testDenoXRun("seed", async ({ output, code }) => {
    assertEquals(code, 0);
    assertStrContains(output, "seed: 0.147205063401058");
  });
});

Deno.test("test quiet option is applied", async () => {
  await testDenoXRun("quiet", async ({ output, code }) => {
    assertEquals(code, 0);
    assertStrContains(output, "Only console.log\n");
  });
});

Deno.test("test lock option is applied", async () => {
  await testDenoXRun("lock", async ({ code }) => {
    const lockFilePath = resolve('../../fixture/deno_options/files/lock.json');
    const isLockFilePresent = await exists(lockFilePath);

    assertEquals(code, 0);
    assertEquals(isLockFilePresent, true);

    await Deno.remove(lockFilePath);
  });
});

Deno.test("test log-level option is applied", async () => {
  await testDenoXRun("log-level", async ({ code, output }) => {
    assertEquals(code, 0);
    assertStrContains(output, 'DEBUG JS');
  });
});

Deno.test("test config option is applied", async () => {
  await testDenoXRun("config", async ({ code, output }) => {
    assertEquals(code, 0);
    assertStrContains(output, 'files/tsconfig.json');
  });
});

Deno.test("test import map option is applied", async () => {
  await testDenoXRun("import-map", async ({ code, errOutput }) => {
    assertEquals(code, 0);
    assertStrContains(errOutput, 'ModuleSpecifier("https://deno.land/std/http/"');
  });
});

Deno.test("test v8-flags, cached-only, cert, no-remote, reload options do not crash", async () => {
  await testDenoXRun("rest-options", async ({ code }) => {
    assertEquals(code, 0);
  });
});
