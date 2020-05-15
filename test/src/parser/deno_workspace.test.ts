import {
  assertThrows,
  assertEquals,
} from "../../../dev_deps.ts";
import { loadDenoWorkspace } from "../../../src/parser/deno_workspace.ts";
import {
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
} from "../../../src/utils/DenoXErrors.ts";
import { changeAndRestoreCWD } from "../../utils/cwd.ts";

Deno.test("throw WorkspaceNotFoundError when workspace file doesn't exist", async () => {
  await changeAndRestoreCWD("test/fixture/no_workspace", async () => {
    assertThrows(() => {
      loadDenoWorkspace();
    }, WorkspaceNotFoundError);
  });
});

Deno.test("throw WorkspaceMalformed when workspace file is not valid", async () => {
  await changeAndRestoreCWD("test/fixture/malformed", async () => {
    assertThrows(() => {
      loadDenoWorkspace();
    }, WorkspaceFileIsMalformed);
  });
});

Deno.test("load valid workspaces with correct order of priority", async () => {
  const files = [
    "deno-workspace.yml",
    "deno-workspace",
    "deno-workspace.yaml",
    ".deno-workspace",
    ".deno-workspace.yml",
    ".deno-workspace.yaml",
  ];

  for (const file of files) {
    await changeAndRestoreCWD(
      `test/fixture/workspace_multiple_names/${file}`,
      async () => {
        assertEquals(loadDenoWorkspace(), {
          scripts: {
            start: { file: `${file}.ts`, deno_options: { reload: true } },
          },
          globals: { deno_options: { "allow-read": ["./files"] } },
        });
      },
    );
  }
});
