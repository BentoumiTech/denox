import { validateOptions } from "./validate.ts";
import { buildDenoCLIOptionsArgs, CLIArgument } from "./build_cli_arguments.ts";
import { WorkspaceGlobal, WorkspaceScriptFile } from "../interfaces.ts";

function parseDenoOptions(
  workspaceGlobal: WorkspaceGlobal,
  workspaceScript: WorkspaceScriptFile,
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
