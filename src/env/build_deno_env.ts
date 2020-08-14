import { WorkspaceEnv } from "../interfaces.ts";
import { getDotEnvConfig, resolve, DotenvConfig } from "../../deps.ts";

function buildDenoEnv(
  workspaceScript: WorkspaceEnv,
  workspaceGlobal: WorkspaceEnv,
): DotenvConfig {
  let env = Deno.env.toObject();
  const envFilePath = workspaceScript.env_file || workspaceGlobal.env_file;

  if (envFilePath) {
    env = { ...env, ...getDotEnvConfig({ path: resolve(envFilePath) }) };
  }

  env = { ...env, ...workspaceGlobal.env_vars, ...workspaceScript.env_vars };

  return env;
}

export { buildDenoEnv };
