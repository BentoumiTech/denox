import { red } from "../deps.ts";

import { IPermissions } from "./interfaces.ts";

function error(msg: string) {
  console.error(`${red("error")} ${msg}`);
  Deno.exit(1);
}

function constructPermissionsArray(permissions: IPermissions) {
  const permissionsFlags: string[] = [];

  for (let [flag, value] of Object.entries(permissions)) {
    if (Array.isArray(value)) {
      value.forEach((element) => {
        permissionsFlags.push(`--${flag}=${element}`);
      });
    } else if (typeof value === "string") {
      permissionsFlags.push(`--${flag}=${value}`);
    } else if (typeof value === "boolean") {
      if (value === true) {
        permissionsFlags.push(`--${flag}`);
      }
    } else {
      throw new Error(
        `Flag permission "${flag}" value is incorrect please fix.`,
      );
    }
  }

  return permissionsFlags;
}

export { error, constructPermissionsArray };
