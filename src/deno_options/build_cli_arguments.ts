import { DenoOptionsEntries, DenoOptionValue } from "../interfaces.ts";
import { getOptionType } from "./utils.ts";
import { optionsDefinitions } from "./const.ts";

type CLIArgument = string | [string, number];

function _toCliArgument(
  name: string,
  spacer = "",
  value: string | number = "",
) {
  return `--${name}${spacer}${value}`;
}

function _transformToCLIArguments(option: string, value: DenoOptionValue): CLIArgument {
  const optionType = getOptionType(value);

  if (optionType === "string[]") {
    const arrayOfValues = value as (string | number)[];
    return _toCliArgument(
      option,
      optionsDefinitions[option].spacer,
      arrayOfValues.join(","),
    );
  } else if (optionType === "string") {
    const stringValue = value as (string | number);
    return _toCliArgument(
      option,
      optionsDefinitions[option].spacer,
      stringValue,
    );
  } else if (optionType === "boolean") {
    if (value === true) {
      return _toCliArgument(option);
    }
    return "";
  } else if (optionType === "number") {
    return [`--${option}`, value]
  }

  throw new Error(
    `Deno option "${option}" value is incorrect, options supports string, array of strings and boolean.`,
  );
}

function buildDenoCLIOptionsArgs(denoOptions: DenoOptionsEntries) {
  const argumentsOptions: CLIArgument[] = [];

  for (const [option, value] of Object.entries(denoOptions)) {
    argumentsOptions.push(_transformToCLIArguments(option, value));
  }

  return argumentsOptions.filter((e) => e).flat(Infinity);
}

export { buildDenoCLIOptionsArgs };
