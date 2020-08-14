import { DotenvConfig } from "../deps.ts";

type DenoOptionValue = unknown;

type DenoOptionsEntries = {
  [key: string]: DenoOptionValue;
};

interface WorkspaceEnv {
  env_file?: string;
  env_vars?: DotenvConfig;
}

interface WorkspaceOptions {
  deno_options?: DenoOptionsEntries;
}

type WorkspaceScriptFile = {
  file: string;
} & WorkspaceOptions;

interface WorkspaceScriptCommand {
  command: string;
}

type WorkspaceScript =
  & (WorkspaceScriptFile | WorkspaceScriptCommand)
  & WorkspaceEnv;

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
  WorkspaceEnv,
  WorkspaceScriptFile,
  WorkspaceScriptCommand,
  DenoOptionsEntries,
  DenoOptionValue,
};
