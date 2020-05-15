type OptionsDefinitionsType = {
  [key: string]: { type: string; spacer?: string };
};

const optionsDefinitions: OptionsDefinitionsType = {
  "allow-all": { type: "boolean" },
  "allow-env": { type: "boolean" },
  "allow-hrtime": { type: "boolean" },
  "allow-net": { type: "string|boolean|string[]", spacer: "=" },
  "allow-plugin": { type: "boolean" },
  "allow-read": { type: "string|boolean|string[]", spacer: "=" },
  "allow-run": { type: "boolean" },
  "allow-write": { type: "string|boolean|string[]", spacer: "=" },
  "cached-only": { type: "boolean" },
  "cert": { type: "string", spacer: " " },
  "config": { type: "string", spacer: " " },
  "importmap": { type: "string", spacer: " " },
  "inspect": { type: "string", spacer: "=" },
  "inspect-brk": { type: "string", spacer: "=" },
  "lock": { type: "string", spacer: " " },
  "lock-write": { type: "boolean" },
  "log-level": { type: "string", spacer: " " },
  "no-remote": { type: "boolean" },
  "quiet": { type: "boolean" },
  "reload": { type: "string|boolean|string[]", spacer: "=" },
  "seed": { type: "number", spacer: " " },
  "unstable": { type: "boolean" },
  "v8-flags": { type: "string|string[]", spacer: "=" },
};

export { optionsDefinitions };
