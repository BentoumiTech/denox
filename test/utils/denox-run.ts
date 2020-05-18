import { changeAndRestoreCWD } from "./cwd.ts";

async function testDenoXRun(
  scriptName: string,
  workspaceFolder: string,
  assertRunOutput: (denoxOutput: { output: string; errOutput: string, code: number }) => Promise<void>,
) {
  await changeAndRestoreCWD(
    workspaceFolder,
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

export { testDenoXRun };
