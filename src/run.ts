import { CURRENT_VERSION, GITHUB_REPO_NAME } from "./const.ts";

import * as consolex from "./utils/consolex.ts";
import { ScriptNotFoundError } from "./utils/DenoXErrors.ts";

import { upgradeVersionMessage } from "./lib/upgrade_version.ts";

import { loadDenoWorkspace } from "./parser/deno_workspace.ts";
import { parseDenoOptions } from "./deno_options/parse.ts";

async function run(script: string, args: string[]) {
  try {
    const workspace = loadDenoWorkspace();

    const workspaceScript = workspace.scripts[script];
    const workspaceGlobal = workspace?.globals;

    if (workspaceScript === undefined) {
      throw new ScriptNotFoundError(script);
    }

    const denoOptions = parseDenoOptions(
      workspaceGlobal,
      workspaceScript,
    );

    const p = Deno.run({
      cmd: [
        "deno",
        "run",
        ...denoOptions,
        workspaceScript.file,
        ...args,
      ],
    });

    const { code } = await p.status();

    await upgradeVersionMessage(CURRENT_VERSION, GITHUB_REPO_NAME);

    Deno.exit(code);
  } catch (e) {
    if (e instanceof Deno.errors.PermissionDenied) {
      return consolex.error(`
        Please reinstall denox with the correct pemissions
        deno install -Af -n denox https://denopkg.com/BentoumiTech/denox/denox.ts
      `);
    }
    return consolex.error(e.message);
  }
}

export default run;
