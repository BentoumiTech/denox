import { parseYaml, YAMLError, extname } from "../../deps.ts";

import { DENO_WORKSPACE_FILES } from "../const.ts";
import { DenoWorkspace } from "../interfaces.ts";

import { getFirstExistingPath, getFileContent } from "../utils/file.ts";
import {
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
} from "../utils/DenoXErrors.ts";

async function loadDenoWorkspace(): Promise<DenoWorkspace> {
  try {
    const denoWorkspaceFilePath = await getFirstExistingPath(
      DENO_WORKSPACE_FILES,
    );

    if (extname(denoWorkspaceFilePath) === ".ts") {
      const { workspace } = await import(denoWorkspaceFilePath) as {
        workspace: DenoWorkspace;
      };
      return workspace;
    }

    const denoWorkspaceFileContent = await getFileContent(
      denoWorkspaceFilePath,
    );
    return parseYaml(denoWorkspaceFileContent) as DenoWorkspace;
  } catch (e) {
    throw _handleLoadDenoWorkspaceErrors(e);
  }
}

function _handleLoadDenoWorkspaceErrors(e: unknown) {
  if (e instanceof Deno.errors.NotFound) {
    return new WorkspaceNotFoundError();
  }

  if (
    e instanceof YAMLError || e instanceof ReferenceError ||
    e instanceof TypeError
  ) {
    return new WorkspaceFileIsMalformed(e.message);
  }

  return e;
}

export { loadDenoWorkspace };
