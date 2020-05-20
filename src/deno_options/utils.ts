import { DenoOptionValue } from "../interfaces.ts";

type TypeOfValues =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";
type OptionTypeValues = TypeOfValues | "string[]" | "mixed[]";

function getOptionType(value: DenoOptionValue): OptionTypeValues {
  if (Array.isArray(value)) {
    if (_isStringNumberArray(value)) {
      return "string[]";
    }

    return "mixed[]";
  }

  return typeof value;
}

function _isStringNumberArray(value: unknown[]): boolean {
  return value.reduce((accumulator: boolean, currentValue) => {
    return accumulator && _typeoffNumberAsString(currentValue) === "string";
  }, true);
}

function _typeoffNumberAsString(value: unknown): TypeOfValues {
  if (typeof value === "number") {
    return "string";
  }

  return typeof value;
}

export { getOptionType, OptionTypeValues };
