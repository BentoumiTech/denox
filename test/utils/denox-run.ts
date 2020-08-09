import { changeAndRestoreCWD } from "./cwd.ts";

type ProcessOutputs = { output: string; errOutput: string };

// eslint-disable-next-line max-params
async function testDenoXRun(
  scriptName: string,
  workspaceFolder: string,
  assertRunOutput: (
    denoxOutput: { output: string; errOutput: string; code: number },
  ) => Promise<void>,
  args: string[] = [],
): Promise<void> {
  await changeAndRestoreCWD(
    workspaceFolder,
    async (denoxPath) => {
      const process = _denoXRun(denoxPath, scriptName, args);
      const { output, errOutput } = await _getProcessOutputs(process);
      const { code } = await process.status();
      process.close();

      await assertRunOutput({ output, errOutput, code });
    },
  );
}

function _denoXRun(
  denoxPath: string,
  scriptName: string,
  args: string[],
): Deno.Process {
  return Deno.run({
    cmd: [
      "deno",
      "run",
      "-A",
      denoxPath,
      "run",
      scriptName,
      ...args,
    ],
    stdout: "piped",
    stderr: "piped",
  });
}

async function _getProcessOutputs(
  process: Deno.Process,
): Promise<ProcessOutputs> {
  const outputBuffer = await process.output();
  const errOutputBuffer = await process.stderrOutput();

  const output = new TextDecoder().decode(outputBuffer);
  const errOutput = new TextDecoder().decode(errOutputBuffer);

  return { output, errOutput };
}

export { testDenoXRun };
