import { assertEquals } from "../../../dev_deps.ts";
import { getOptionType } from "../utils.ts";

Deno.test("string[]", () => {
  const optionType = getOptionType(["first", "second"]);

  assertEquals(
    optionType,
    "string[]",
  );
});

Deno.test("string[] with numbers", () => {
  const optionType = getOptionType(["first", 2]);

  assertEquals(
    optionType,
    "string[]",
  );
});

Deno.test("mixed[]", () => {
  const optionType = getOptionType(["first", { "test": "string" }]);

  assertEquals(
    optionType,
    "mixed[]",
  );
});

Deno.test("object", () => {
  const optionType = getOptionType({ "test": "string" });

  assertEquals(
    optionType,
    "object",
  );
});

Deno.test("string", () => {
  const optionType = getOptionType("string");

  assertEquals(
    optionType,
    "string",
  );
});

Deno.test("number", () => {
  const optionType = getOptionType(1);

  assertEquals(
    optionType,
    "number",
  );
});

Deno.test("boolean", () => {
  const optionType = getOptionType(true);

  assertEquals(
    optionType,
    "boolean",
  );
});
