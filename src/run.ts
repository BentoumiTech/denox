import { CURRENT_VERSION, GITHUB_REPO_NAME } from "./const.ts";

import * as consolex from "./utils/consolex.ts";
import { CommandNotFoundError } from "./utils/DenoErrors.ts";

import { upgradeVersionMessage } from "./lib/upgrade_version.ts";

import { constructCLIArguments } from "./parser/deno_arguments.ts";
import { loadDenoWorkspace } from "./parser/deno_workspace.ts";

async function run(command: string, args: string[]) {
  try {
    const denoWorkspace = loadDenoWorkspace();

    const denoWorkspaceCommand = denoWorkspace.scripts[command];

    if (denoWorkspaceCommand === undefined) {
      throw new CommandNotFoundError(command);
    }

    const permissions = constructCLIArguments({
      ...denoWorkspace.globals.permissions,
      ...denoWorkspaceCommand.permissions,
    });

    const p = Deno.run({
      cmd: [
        "deno",
        "run",
        ...permissions,
        denoWorkspaceCommand.file,
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
