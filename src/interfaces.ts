type DenoOptionValue = unknown;
type DotEnvConfigValue = string;

type DenoOptionsEntries = {
  [key: string]: DenoOptionValue;
};

type WorkspaceOptions = {
  deno_options?: DenoOptionsEntries;
};

// There must be either a file or a command provided.
type WorkspaceScript =
  & (
    | { file: string; cmd?: undefined }
    | { cmd: string; file?: undefined }
  )
  & WorkspaceOptions;

type WorkspaceGlobal = WorkspaceOptions;

type DenoWorkspace = {
  scripts: {
    [key: string]: WorkspaceScript;
  };
  globals?: WorkspaceGlobal;
};

// This type is exported from dotenv, which I'm assuming you will be using for this port.
type DotenvConfig = {
  [key: string]: DotEnvConfigValue;
};

export {
  DenoWorkspace,
  WorkspaceGlobal,
  WorkspaceScript,
  WorkspaceOptions,
  DenoOptionsEntries,
  DenoOptionValue,
  DotenvConfig,
};
