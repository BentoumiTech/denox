import { assertEquals, assertStrContains } from "../../dev_deps.ts";
import { changeAndRestoreCWD } from "../utils/cwd.ts";

Deno.test("run script with scoped permissions", async () => {
  await changeAndRestoreCWD(
    `test/fixture/script_permission`,
    async (denoxPath) => {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "-A",
          denoxPath,
          "run",
          "start",
        ],
        stdout: "piped",
      });

      const output = await p.output();
      const { code } = await p.status();

      const string = new TextDecoder().decode(output);

      assertEquals(code, 0);
      assertStrContains(string, "I'm text file content");

      p.close();
    },
  );
});

Deno.test("run script with global permissions", async () => {
  await changeAndRestoreCWD(
    `test/fixture/global_permission`,
    async (denoxPath) => {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "-A",
          denoxPath,
          "run",
          "start",
        ],
        stdout: "piped",
      });

      const output = await p.output();
      const { code } = await p.status();

      const string = new TextDecoder().decode(output);

      assertEquals(code, 0);
      assertStrContains(string, "I'm text file content");

      p.close();
    },
  );
});

Deno.test("run script with scoped and global permissions", async () => {
  await changeAndRestoreCWD(
    `test/fixture/script_global_permission`,
    async (denoxPath) => {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "-A",
          denoxPath,
          "run",
          "start",
        ],
        stdout: "piped",
      });

      const output = await p.output();
      const { code } = await p.status();

      const string = new TextDecoder().decode(output);

      assertEquals(code, 0);
      assertStrContains(string, "I'm text file content");
      assertStrContains(string, "delectus aut autem");

      p.close();
    },
  );
});

Deno.test("run script with erroneous merged scoped and global permissions", async () => {
  await changeAndRestoreCWD(
    `test/fixture/merged_scoped_global__invalid_permission`,
    async (denoxPath) => {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "-A",
          denoxPath,
          "run",
          "start",
        ],
        stdout: "piped",
        stderr: "piped",
      });

      await p.output();
      const errOutput = await p.stderrOutput();
      const { code } = await p.status();

      const string = new TextDecoder().decode(errOutput);

      assertEquals(code, 1);
      assertStrContains(
        string,
        'Uncaught PermissionDenied: network access to "https://jsonplaceho',
      );

      p.close();
    },
  );
});


Deno.test("run script with seed deno options", async () => {
  await changeAndRestoreCWD(
    `test/fixture/seed`,
    async (denoxPath) => {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "-A",
          denoxPath,
          "run",
          "start",
        ],
        stdout: "piped",
      });

      const output = await p.output();
      const { code } = await p.status();

      const string = new TextDecoder().decode(output);

      assertEquals(code, 0);
      assertStrContains(string, "0.147205063401058");

      p.close();
    },
  );
});
