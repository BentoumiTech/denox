import { assertEquals, assertStrContains } from "../../dev_deps.ts";
import { changeAndRestoreCWD } from "../utils/cwd.ts";

Deno.test("Return an error when script doesn't exist", async () => {
  await changeAndRestoreCWD(`test/fixture/single_script`, async (denoxPath) => {
    const p = Deno.run({
      cmd: [
        "deno",
        "run",
        "-A",
        denoxPath,
        "run",
        "not-found-script",
      ],
      stderr: "piped",
    });

    const output = await p.stderrOutput();
    const { code } = await p.status();

    const string = new TextDecoder().decode(output);

    assertEquals(code, 1);
    assertStrContains(string, '\"not-found-script\" not found');

    p.close();
  });
});

Deno.test("execute exising script", async () => {
  await changeAndRestoreCWD(`test/fixture/single_script`, async (denoxPath) => {
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
    assertStrContains(string, "Hello World!");

    p.close();
  });
});

// Write test for multiple scripts
Deno.test("execute existing script when multiple are specified", async () => {
  await changeAndRestoreCWD(
    `test/fixture/multiple_scripts`,
    async (denoxPath) => {
      const p = Deno.run({
        cmd: [
          "deno",
          "run",
          "-A",
          denoxPath,
          "run",
          "develop",
        ],
        stdout: "piped",
      });

      const output = await p.output();
      const { code } = await p.status();

      const string = new TextDecoder().decode(output);

      assertEquals(code, 0);
      assertStrContains(string, "Hello World Develop!");

      p.close();
    },
  );
});
