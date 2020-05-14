type OptionValueType = string[] | string | boolean;

interface IWorkspaceOptions {
  [key: string]: OptionValueType;
}

interface IDenoWorkspace {
  scripts: {
    [key: string]: {
      file: string;
      permissions?: IWorkspaceOptions;
    };
  };
  globals?: {
    permissions?: IWorkspaceOptions;
  };
}

export { IWorkspaceOptions, IDenoWorkspace, OptionValueType };
