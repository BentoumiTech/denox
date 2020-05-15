import { optionsDefinitions } from "./const.ts";
import {
  DenoOptionNotRecognized,
  DenoOptionIncorrectType,
} from "../utils/DenoXErrors.ts";
import { getOptionType } from "./utils.ts";
import { DenoOptionsEntries } from "../interfaces.ts";

function _isOptionValid(optionName: string) {
  if (optionsDefinitions.hasOwnProperty(optionName) === false) {
    throw new DenoOptionNotRecognized(optionName);
  }
}

function _isOptionTypeValid(optionName: string, optionValue: unknown) {
  const optionType = getOptionType(optionValue);

  const optionDefinition = optionsDefinitions[optionName];
  const optionDefinitionAllowedTypes = optionDefinition.type.split("|");

  if (optionDefinitionAllowedTypes.includes(optionType) === false) {
    throw new DenoOptionIncorrectType(
      optionName,
      optionDefinition.type,
      optionType,
    );
  }
}

function validateOptions(options: DenoOptionsEntries) {
  for (const [optionName, optionValue] of Object.entries(options)) {
    _isOptionValid(optionName);
    _isOptionTypeValid(optionName, optionValue);
  }
}

export { validateOptions };
