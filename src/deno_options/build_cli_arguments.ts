import { DenoOptionsEntries, DenoOptionValue } from "../interfaces.ts";
import { getOptionType } from "./utils.ts";
import { optionsDefinitions } from "./const.ts";

type CLIArgument = string | [string, number];
type hashCliArgType = { name: string; value: string | boolean | number };

function _hashToCLIArg(
  hash: hashCliArgType,
): CLIArgument {
  if (hash.value === false) {
    return "";
  }

  const cliArgOptionName = `--${hash.name}`;
  const cliArgOptionDefinition = optionsDefinitions[hash.name];

  if (cliArgOptionDefinition.type === "number") {
    return [cliArgOptionName, hash.value as number];
  }

  if (hash.value === true) {
    return cliArgOptionName;
  }

  return `${cliArgOptionName}${cliArgOptionDefinition.spacer}${hash.value}`;
}

function _transformToCLIArguments(option: string, value: DenoOptionValue) {
  const optionType = getOptionType(value);
  const optionDefinitionType = optionsDefinitions[option].type.split("|");

  if (!optionDefinitionType.includes(optionType)) {
    throw new Error(
      `Deno option "${option}" value is incorrect, options supports string, array of strings and boolean.`,
    );
  }

  const argValue = optionType === "string[]"
    ? (value as string[]).join(",")
    : value as string | number | boolean;

  const argHash = {
    name: option,
    value: argValue,
  };

  return _hashToCLIArg(argHash);
}

function buildDenoCLIOptionsArgs(denoOptions: DenoOptionsEntries) {
  const argumentsOptions: CLIArgument[] = [];

  for (const [option, value] of Object.entries(denoOptions)) {
    argumentsOptions.push(_transformToCLIArguments(option, value));
  }

  return argumentsOptions.filter((e) => e).flat(Infinity);
}

export { buildDenoCLIOptionsArgs };
