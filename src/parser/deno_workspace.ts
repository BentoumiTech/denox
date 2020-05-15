import { parseYaml, YAMLError } from "../../deps.ts";

import { DENO_WORKSPACE_FILES } from "../const.ts";
import { IDenoWorkspace } from "../interfaces.ts";

import { readFirstExistingFile } from "../utils/file.ts";
import {
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
} from "../utils/DenoXErrors.ts";

function loadDenoWorkspace() {
  try {
    const denoWorkspaceYaml = readFirstExistingFile(DENO_WORKSPACE_FILES);
    return parseYaml(denoWorkspaceYaml) as IDenoWorkspace;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      throw new WorkspaceNotFoundError();
    }

    if (e instanceof YAMLError) {
      throw new WorkspaceFileIsMalformed(e.message);
    }

    throw e;
  }
}

export { loadDenoWorkspace };
