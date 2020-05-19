import { red } from "../../deps.ts";

function error(msg: string): void {
  console.error(`${red("error")} ${msg}`);
  Deno.exit(1);
}

export { error };
