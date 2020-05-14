import { cac } from "./deps.ts";

import run from "./src/run.ts";
import { error } from "./src/utils/consolex.ts";
import { CURRENT_VERSION } from "./src/const.ts";

const cli = cac("denox");

cli
  .command(
    "run <script> [...args]",
    "Run a script",
    { allowUnknownOptions: true, ignoreOptionDefaultValue: true },
  )
  .example("denox run start arg1 arg2")
  .action(run);

// @ts-ignore
cli.on("command:*", () => {
  // @ts-ignore
  error(`Invalid command: ${cli.args.join(" ")}`);
});

cli.example("denox run start");

cli.help(() => ({}));

cli.version(CURRENT_VERSION);

cli.parse();
