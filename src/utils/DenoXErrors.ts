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

class ScriptNotFoundError extends DenoXError {
  constructor(script: string) {
    super(
      `Script "${script}" not found please add it to your deno-workspace file`,
    );
  }
}

class WorkspaceFileIsMalformed extends DenoXError {
  constructor(parserMessage: string) {
    super(`
      deno-workspace file is not valid

      ${parserMessage}
    `);
  }
}

class DenoOptionNotRecognized extends DenoXError {
  constructor(option: string) {
    super(`
      The option: "${option}" in deno-workspace file is not valid.
      For a list of valid options enter "deno run --help"
    `);
  }
}

class DenoOptionIncorrectType extends DenoXError {
  constructor(
    optionName: string,
    optionDefinitionType: string,
    optionType: string,
  ) {
    super(`
      The option: "${optionName}" in deno-workspace type is not valid.
      Currently it's "${optionType}" but only "${optionDefinitionType}" is/are valid
    `);
  }
}

export {
  ScriptNotFoundError,
  WorkspaceNotFoundError,
  WorkspaceFileIsMalformed,
  DenoOptionNotRecognized,
  DenoOptionIncorrectType,
};
