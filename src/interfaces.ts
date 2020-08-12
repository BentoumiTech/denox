type DenoOptionValue = unknown;

type DenoOptionsEntries = {
  [key: string]: DenoOptionValue;
};

interface WorkspaceEnv {
  env_file?: string;
  env_vars?:  {
    [key: string]: string;
  };
}

interface WorkspaceOptions {
  deno_options?: DenoOptionsEntries;
}

interface WorkspaceScriptFile {
  file: string;
}

interface WorkspaceScriptCommand {
  command: string;
}

type WorkspaceScript = WorkspaceScriptFile | WorkspaceScriptCommand;

type WorkspaceGlobal = WorkspaceOptions & WorkspaceEnv;

type DenoWorkspace = {
  scripts: {
    [key: string]: WorkspaceScript;
  };
  globals?: WorkspaceGlobal;
};

export {
  DenoWorkspace,
  WorkspaceGlobal,
  WorkspaceScript,
  WorkspaceOptions,
  WorkspaceScriptFile,
  WorkspaceScriptCommand,
  DenoOptionsEntries,
  DenoOptionValue,
};
