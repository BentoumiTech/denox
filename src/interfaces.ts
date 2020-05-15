type DenoOptionValue = unknown;

type DenoOptionsEntries = {
  [key: string]: DenoOptionValue;
};

type WorkspaceOptions = {
  deno_options?: DenoOptionsEntries;
};

type WorkspaceScript = {
  file: string;
} & WorkspaceOptions;

type WorkspaceGlobal = WorkspaceOptions;

type DenoWorkspace = {
  scripts: {
    [key: string]: WorkspaceScript;
  };
  globals?: WorkspaceGlobal;
};
