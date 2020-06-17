import { assertEquals, assertThrows } from "../../../dev_deps.ts";
import replaceEnvVars from "../replaceEnvVars.ts";

const CMD = "deno run ${SOME_ENV_VAR_1} ${SOME_ENV_VAR_2} mod.js";
const EMPTY_ENV = {};
const ENV = {
  SOME_ENV_VAR_1: "VALUE_1",
  SOME_ENV_VAR_2: "VALUE_2",
};
const REPLACED_CMD = "deno run VALUE_1 VALUE_2 mod.js";

Deno.test("should throw no cmd error", async () => {
  assertThrows((): void => {
    replaceEnvVars("", EMPTY_ENV);
  }, ReferenceError);
});

Deno.test("should return the cmd that entered as is", async () => {
  const cmd = replaceEnvVars(CMD, EMPTY_ENV);

  assertEquals(cmd, CMD);
});

Deno.test("should return the replaced cmd", async () => {
  const cmd = replaceEnvVars(CMD, ENV);

  assertEquals(cmd, REPLACED_CMD);
});
