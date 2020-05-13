interface IPermissions {
  [key: string]: [string] | string | boolean;
}

interface IDenoWorkspace {
  scripts: {
    [key: string]: {
      file: string;
      permissions: IPermissions;
    };
  };
  globals: {
    permissions: IPermissions;
  };
}
