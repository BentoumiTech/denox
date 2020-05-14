import {
  assertThrows,
  assertEquals,
  assertArrayContains,
  resolve,
} from "../../../dev_deps.ts";
import { loadDenoWorkspace } from "../../../src/parser/deno_workspace.ts";
import {
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
} from "../../../src/utils/DenoErrors.ts";

function changeAndRestoreCWD(directory: string, assertion: () => void) {
  const cwd = Deno.cwd();
  Deno.chdir(resolve(directory));

  assertion();

  Deno.chdir(cwd);
}

Deno.test("throw WorkspaceNotFoundError when workspace file doesn't exist", () => {
  changeAndRestoreCWD("test/fixture/no_workspace", () => {
    assertThrows(() => {
      loadDenoWorkspace();
    }, WorkspaceNotFoundError);
  });
});

Deno.test("throw WorkspaceMalformed when workspace file is not valid", () => {
  changeAndRestoreCWD("test/fixture/malformed", () => {
    assertThrows(() => {
      loadDenoWorkspace();
    }, WorkspaceFileIsMalformed);
  });
});




Deno.test("load valid workspaces with correct order of priority", () => {
  const tests = [
    "deno-workspace",
    "deno-workspace.yml",
    "deno-workspace.yaml",
    ".deno-workspace",
    ".deno-workspace.yml",
    ".deno-workspace.yaml"
  ];

  tests.forEach((workspaceFolderFile) => {
    changeAndRestoreCWD(`test/fixture/workspace_multiple_names/${workspaceFolderFile}`, () => {
      assertEquals(loadDenoWorkspace(), {
        scripts: { start: { file: `${workspaceFolderFile}.ts`, permissions: { reload: true } } },
        globals: { permissions: { "allow-read": ["./files"] } },
      });
    });
  });
});
