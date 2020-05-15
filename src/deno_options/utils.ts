import { DenoOptionValue } from "../interfaces.ts";

function _typeoffNumberAsString(value: unknown) {
  if (typeof value === "number") {
    return "string";
  }

  return typeof value;
}

function getOptionType(value: DenoOptionValue) {
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

export { getOptionType };
