import { parseYaml } from "../../deps.ts";

import { DENO_WORKSPACE_FILES } from "../const.ts";
import { IDenoWorkspace } from "../interfaces.ts";

import { readFirstExistingFile } from "../utils/file.ts";

function loadDenoWorkspace() {
  const denoWorkspaceYaml = readFirstExistingFile(DENO_WORKSPACE_FILES);
  return parseYaml(denoWorkspaceYaml) as IDenoWorkspace;
}

export {loadDenoWorkspace};
