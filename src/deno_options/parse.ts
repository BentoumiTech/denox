import { validateOptions } from "./validate.ts";
import { buildDenoCLIOptionsArgs, CLIArgument } from "./build_cli_arguments.ts";
import { WorkspaceGlobal, WorkspaceScript } from "../interfaces.ts";

function parseDenoOptions(
  workspaceGlobal: WorkspaceGlobal,
  workspaceScript: WorkspaceScript,
): CLIArgument[] {
  const denoGlobalOptions = workspaceGlobal?.deno_options;
  const denoScriptOptions = workspaceScript?.deno_options;

  const options = {
    ...denoGlobalOptions,
    ...denoScriptOptions,
  };

  validateOptions(options);

  return buildDenoCLIOptionsArgs(options);
}

export { parseDenoOptions };
