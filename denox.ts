import { cac } from "./deps.ts";

import run from "./src/run.ts";
import init from "./src/init.ts";
import { error } from "./src/utils/consolex.ts";
import { CURRENT_VERSION } from "./src/const.ts";

const cli = cac("denox");

cli
  .command(
    "run <script> [...args]",
    "Run a script",
    { allowUnknownOptions: true, ignoreOptionDefaultValue: true },
  )
  .example("denox run start arg1 arg2 --namedArg=value")
  .action(run);

cli
  .command(
    "init",
    "Initialize a denox workspace",
  )
  .option("--yml, --yaml", "Use YAML for configuration")
  .option("--json", "Use JSON for configuration")
  .option("--ts, --typescript", "Use TypeScript for configuration")
  .option("-f, --force", "Force creation of new workspace")
  .example("deno init --json")
  .action(init);

// ToDO: remove '@ts-ignore' (and eslint directive) when vscode_deno is fixed to work with @deno_types; ref: <https://github.com/cacjs/cac/issues/75> , <https://github.com/denoland/vscode_deno/issues/21>
/* eslint @typescript-eslint/ban-ts-comment: "off" */
// deno-lint-ignore ban-ts-comment
// @ts-ignore
cli.on("command:*", () => {
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  error(`Invalid command: ${cli.args.join(" ")}`);
});

cli.example("denox run start");

cli.help(() => ({}));

cli.version(CURRENT_VERSION);

cli.parse();
