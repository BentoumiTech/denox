import { red } from "../../deps.ts";

function error(msg: string) {
  console.error(`${red("error")} ${msg}`);
  Deno.exit(1);
}

export { error };
