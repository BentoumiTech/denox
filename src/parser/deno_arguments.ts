import { IWorkspaceOptions, OptionValueType } from "../interfaces.ts";

function _transformToCLIArgument(option: string, value: OptionValueType) {
  if (Array.isArray(value)) {
    return `--${option}=${value.join(",")}`;
  } else if (typeof value === "string") {
    return `--${option}=${value}`;
  } else if (typeof value === "boolean") {
    if (value === true) {
      return `--${option}`;
    }
    return "";
  }

  throw new Error(
    `Deno option "${option}" value is incorrect.`,
  );
}

function constructCLIArguments(workspaceOptions: IWorkspaceOptions) {
  const argumentsOptions: string[] = [];

  for (let [option, value] of Object.entries(workspaceOptions)) {
    argumentsOptions.push(_transformToCLIArgument(option, value));
  }

  return argumentsOptions.filter(String);
}

export { constructCLIArguments };
