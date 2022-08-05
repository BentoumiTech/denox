import { error } from "./utils/consolex.ts";

const INIT_YAML = `scripts:
  start:
    file: %mainfile%
    deno_options:
      allow-net: example.com
`;
const INIT_JSON = `{
  "scripts": {
    "start": {
      "file": "%mainfile%",
      "deno_options": {
        "allow-net": "example.com"
      }
    }
  }
}
`;
const INIT_TYPESCRIPT =
  `import { DenoWorkspace } from "https://denopkg.com/BentoumiTech/denox/src/interfaces.ts";

const workspace: DenoWorkspace = {
  "scripts": {
    "start": {
      "file": "%mainfile%",
      "deno_options": {
        "allow-net": "example.com"
      }
    },
  },
};

export { workspace };
`;

interface Options {
  yaml: boolean;
  json: boolean;
  typescript: boolean;
  force: boolean;
}

const configExists = async () => {
  for await (const file of Deno.readDir(".")) {
    if (
      file.isFile &&
      (file.name.startsWith("deno-workspace") ||
        file.name.startsWith(".deno-workspace"))
    ) {
      return true;
    }
  }
  return false;
};

const findMain = async () => {
  for await (const file of Deno.readDir(".")) {
    if (
      file.isFile && file.name.endsWith(".ts")
    ) {
      return file.name;
    }
  }
  return "main.ts";
};

async function init(options: Options) {
  if (options.force || !(await configExists())) {
    let config = INIT_YAML;
    let extension = ".yml";
    if (options.yaml) {
      config = INIT_YAML;
      extension = ".yml";
    }
    if (options.json) {
      config = INIT_JSON;
      extension = ".json";
    }
    if (options.typescript) {
      config = INIT_TYPESCRIPT;
      extension = ".ts";
    }
    config = config.replace("%mainfile%", await findMain());
    await Deno.writeTextFile("deno-workspace" + extension, config);
    console.log(`A denox workspace was created in deno-workspace${extension}`);
  } else {
    error(
      "A denox workspace file already exists in this directory. To force recreation run denox init -f",
    );
  }
}

export default init;
export { INIT_JSON, INIT_TYPESCRIPT, INIT_YAML };
