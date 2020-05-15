class DenoXError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class WorkspaceNotFoundError extends DenoXError {
  constructor() {
    super(`
      deno-workspace.yml file not found in "${Deno.cwd()}"
      Run "denox init" in your project root directory.
    `);
  }
}

class ScriptNotFoundError extends DenoXError {
  constructor(script: string) {
    super(
      `Script "${script}" not found please add it to deno-workspace.yml file`,
    );
  }
}

class WorkspaceFileIsMalformed extends DenoXError {
  constructor(parserMessage: string) {
    super(`
      "deno-workspace.yml" file is not valid

      ${parserMessage}
    `);
  }
}

export {
  ScriptNotFoundError,
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
};
