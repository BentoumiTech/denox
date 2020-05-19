import {
  assertThrows,
  assertEquals,
  assertThrowsAsync
} from "../../../dev_deps.ts";
import { loadDenoWorkspace } from "../deno_workspace.ts";
import {
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
} from "../../utils/DenoXErrors.ts";
import { changeAndRestoreCWD } from "../../../test/utils/cwd.ts";

Deno.test("throw WorkspaceNotFoundError when workspace file doesn't exist", async () => {
  await changeAndRestoreCWD("test/fixture/no_workspace", async () => {
    assertThrowsAsync(async () => {
      await loadDenoWorkspace();
    }, WorkspaceNotFoundError);
  });
});

Deno.test("throw WorkspaceMalformed when yaml workspace file is not valid", async () => {
  await changeAndRestoreCWD("test/fixture/malformed_yaml", async () => {
    assertThrowsAsync(async () => {
      await loadDenoWorkspace();
    }, WorkspaceFileIsMalformed);
  });
});

Deno.test("throw WorkspaceMalformed when json workspace file is not valid", async () => {
  await changeAndRestoreCWD("test/fixture/malformed_json", async () => {
    assertThrowsAsync(async () => {
      await loadDenoWorkspace();
    }, WorkspaceFileIsMalformed);
  });
});

Deno.test("throw WorkspaceMalformed when ts workspace file is not valid", async () => {
  await changeAndRestoreCWD("test/fixture/malformed_ts", async () => {
    assertThrowsAsync(async () => {
      await loadDenoWorkspace();
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
    "deno-workspace.json",
    ".deno-workspace.json",
    "deno-workspace.ts",
  ];

  for (const file of files) {
    await changeAndRestoreCWD(
      `test/fixture/workspace_multiple_names/${file}`,
      async () => {
        assertEquals(await loadDenoWorkspace(), {
          scripts: {
            start: { file: `${file}.ts`, deno_options: { reload: true } },
          },
          globals: { deno_options: { "allow-read": ["./files"] } },
        });
      },
    );
  }
});
