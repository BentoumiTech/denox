import { parseYaml } from "../deps.ts";

import { error, constructPermissionsArray } from "./utils.ts";
import { upgradeVersionMessage } from "./upgrade_version.ts";
import { IDenoWorkspace } from "./interfaces.ts";
import { CURRENT_VERSION, GITHUB_REPO_NAME } from "./const.ts";

async function run(command: string, args: string[]) {
  try {
    const denoWorkspaceYamlData = Deno.readFileSync(".deno-workspace");
    const decoder = new TextDecoder("utf-8");
    const denoWorkspaceYaml = decoder.decode(denoWorkspaceYamlData);
    const denoWorkspace = parseYaml(denoWorkspaceYaml) as IDenoWorkspace;

    const denoWorkspaceCommand = denoWorkspace.scripts[command];

    if (denoWorkspaceCommand === undefined) {
      throw new Error(
        `Command "${command}" not found please add it to the .deno-workspace file`,
      );
    }

    const permissions = constructPermissionsArray({
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
    if (e instanceof Deno.errors.NotFound) {
      return error(`Couldn't find a .deno-workspace file in "${Deno.cwd()}"`);
    } else if (e instanceof Deno.errors.PermissionDenied) {
      return error(`
        Please reinstall denox with the correct pemissions
        deno install -Af https://denopkg.com/BentoumiTech/denox/denox.ts
      `);
    }
    return error(e.message);
  }
}

export default run;
