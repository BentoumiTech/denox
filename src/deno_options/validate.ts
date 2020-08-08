import { optionsDefinitions } from "./const.ts";
import {
  DenoOptionNotRecognized,
  DenoOptionIncorrectType,
} from "../utils/DenoXErrors.ts";
import { getOptionType } from "./utils.ts";
import { DenoOptionsEntries } from "../interfaces.ts";

function validateOptions(options: DenoOptionsEntries): void {
  for (const [optionName, optionValue] of Object.entries(options)) {
    _isOptionValid(optionName);
    _isOptionTypeValid(optionName, optionValue);
  }
}

function _isOptionValid(optionName: string): void {
  if (Object.prototype.hasOwnProperty.call(optionsDefinitions, optionName) === false) {
    throw new DenoOptionNotRecognized(optionName);
  }
}

function _isOptionTypeValid(optionName: string, optionValue: unknown): void {
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
export { validateOptions };
