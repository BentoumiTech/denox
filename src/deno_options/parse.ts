import { validateOptions } from "./validate.ts";
import { buildDenoCLIOptionsArgs } from "./build_cli_arguments.ts";

function parseDenoOptions(
  workspaceGlobal: WorkspaceGlobal,
  workspaceScript: WorkspaceScript,
) {
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
