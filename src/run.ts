import { CURRENT_VERSION, GITHUB_REPO_NAME } from "./const.ts";

import * as consolex from "./utils/consolex.ts";
import { ScriptNotFoundError } from "./utils/DenoErrors.ts";

import { upgradeVersionMessage } from "./lib/upgrade_version.ts";

import { constructCLIArguments } from "./parser/deno_arguments.ts";
import { loadDenoWorkspace } from "./parser/deno_workspace.ts";

async function run(script: string, args: string[]) {
  try {
    const workspace = loadDenoWorkspace();

    const workspaceScript = workspace.scripts[script];

    if (workspaceScript === undefined) {
      throw new ScriptNotFoundError(script);
    }

    const globalPermissions = workspace?.globals?.permissions

    const permissions = constructCLIArguments({
      ...globalPermissions,
      ...workspaceScript.permissions,
    });

    const p = Deno.run({
      cmd: [
        "deno",
        "run",
        ...permissions,
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
