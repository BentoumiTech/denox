class DenoXError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class WorkspaceNotFoundError extends DenoXError {
  constructor() {
    super(`
      deno-workspace file not found in "${Deno.cwd()}"
      Run "denox init" in your project root directory.
    `);
  }
}

class CommandNotFoundError extends DenoXError {
  constructor(command: string) {
    super(
      `Command "${command}" not found please add it to the deno-workspace file`,
    );
  }
}

class WorkspaceFileIsMalformed extends DenoXError {
  constructor(parserMessage: string) {
    super(`
      "deno-workspace" file is not valid

      ${parserMessage}
    `);
  }
}

export { CommandNotFoundError, WorkspaceNotFoundError, WorkspaceFileIsMalformed };
