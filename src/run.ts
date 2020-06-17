import { CURRENT_VERSION, GITHUB_REPO_NAME } from "./const.ts";

import * as consolex from "./utils/consolex.ts";
import { ScriptNotFoundError } from "./utils/DenoXErrors.ts";
import replaceEnvVars from "./utils/replaceEnvVars.ts";

import { upgradeVersionMessage } from "./lib/upgrade_version.ts";

import { loadDenoWorkspace } from "./parser/deno_workspace.ts";
import { parseDenoOptions } from "./deno_options/parse.ts";
import { CLIArgument } from "./deno_options/build_cli_arguments.ts";
import { WorkspaceOptions, WorkspaceScript } from "./interfaces.ts";

async function run(scriptName: string): Promise<void> {
  try {
    const args = Deno.args.slice(2);
    const { code } = await _runScript(scriptName, args);

    await upgradeVersionMessage(CURRENT_VERSION, GITHUB_REPO_NAME);

    Deno.exit(code);
  } catch (e) {
    if (e instanceof Deno.errors.PermissionDenied) {
      consolex.error(`
        Please reinstall denox with the correct permissions
        deno install -Af -n denox https://denopkg.com/BentoumiTech/denox/denox.ts
      `);
    } else {
      consolex.error(e.message);
    }
  }
}

async function _runScript(
  scriptName: string,
  args: string[],
): Promise<{ code: number }> {
  const workspace = await loadDenoWorkspace();

  const workspaceScript = workspace.scripts[scriptName];
  const workspaceGlobal = workspace?.globals || {};

  if (workspaceScript === undefined) {
    throw new ScriptNotFoundError(scriptName);
  }

  return workspaceScript.file
    ? await _runDenoFile(workspaceScript, workspaceGlobal, args)
    : await _runInlineScript(workspaceScript, workspaceGlobal, args);
}

async function _runInlineScript(
  workspaceScript: WorkspaceScript,
  workspaceGlobal: WorkspaceOptions,
  args: string[],
): Promise<{ code: number }> {
  const cmd: any[] = replaceEnvVars(workspaceScript?.cmd, Deno.env.toObject())
    .split(" ")
    .concat(args) || [];
  const denoOptions = await _getDenoOptions(workspaceScript, workspaceGlobal);

  cmd.concat(denoOptions);

  const process = Deno.run({
    cmd,
  });

  const { code } = await process.status();

  return { code };
}

async function _runDenoFile(
  workspaceScript: WorkspaceScript,
  workspaceGlobal: WorkspaceOptions,
  args: string[],
): Promise<{ code: number }> {
  const denoOptions = await _getDenoOptions(workspaceScript, workspaceGlobal);
  const process = Deno.run({
    // @ts-ignore
    cmd: [
      "deno",
      "run",
      ...denoOptions,
      workspaceScript.file,
      ...args,
    ],
  });
  const { code } = await process.status();

  return { code };
}

async function _getDenoOptions(
  workspaceScript: WorkspaceScript,
  workspaceGlobal: WorkspaceOptions,
): Promise<CLIArgument[]> {
  return parseDenoOptions(
    workspaceGlobal,
    workspaceScript,
  );
}

export default run;
