import { DotenvConfig } from "../../deps.ts";

function replaceCommandEnvVars(command: string, env: DotenvConfig): string {
  const envKeys: string[] = Object.keys(env);
  let parsedCommand = command;

  envKeys.forEach((envKey: string) => {
    const envValue: string = env[envKey];
    parsedCommand = parsedCommand.replace(`$${envKey}`, envValue);
  });

  return parsedCommand;
}

export { replaceCommandEnvVars };
