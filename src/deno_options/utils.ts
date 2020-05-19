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

function _typeoffNumberAsString(value: unknown): TypeOfValues {
  if (typeof value === "number") {
    return "string";
  }

  return typeof value;
}

function getOptionType(value: DenoOptionValue): OptionTypeValues {
  if (Array.isArray(value)) {
    const isStringArray = value.reduce((accumulator, currentValue) => {
      return accumulator && _typeoffNumberAsString(currentValue) === "string";
    }, true);
    if (isStringArray === true) {
      return "string[]";
    } else {
      return "mixed[]";
    }
  }

  return typeof value;
}

export { getOptionType, OptionTypeValues };
