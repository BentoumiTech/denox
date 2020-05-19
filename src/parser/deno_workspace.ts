import { parseYaml, YAMLError, extname } from "../../deps.ts";

import { DENO_WORKSPACE_FILES } from "../const.ts";
import { DenoWorkspace } from "../interfaces.ts";

import { readFirstExistingFile } from "../utils/file.ts";
import {
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
} from "../utils/DenoXErrors.ts";

async function loadDenoWorkspace(): Promise<DenoWorkspace> {
  try {
    const denoWorkspaceFile = readFirstExistingFile(DENO_WORKSPACE_FILES);

    if (extname(denoWorkspaceFile.path) === ".ts") {
      const { workspace } = await import(denoWorkspaceFile.path) as {
        workspace: DenoWorkspace;
      };
      return workspace;
    }

    return parseYaml(denoWorkspaceFile.content) as DenoWorkspace;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      throw new WorkspaceNotFoundError();
    }

    if (e instanceof YAMLError || e instanceof ReferenceError) {
      throw new WorkspaceFileIsMalformed(e.message);
    }

    throw e;
  }
}

export { loadDenoWorkspace };
