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
    if (e instanceof Deno.errors.NotFound) {
      throw new WorkspaceNotFoundError();
    }

    if (
      e instanceof YAMLError || e instanceof ReferenceError ||
      e instanceof TypeError
    ) {
      throw new WorkspaceFileIsMalformed(e.message);
    }

    throw e;
  }
}

export { loadDenoWorkspace };
