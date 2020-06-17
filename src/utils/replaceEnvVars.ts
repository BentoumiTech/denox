// TODO - Update this with the dotenv interface.
import { DotenvConfig } from "../interfaces.ts";

/**
 * This is added here in anticipation of https://github.com/BentoumiTech/denox/issues/12 being completed.
 * There are many time we need to inject env variables into a script.
 * These comments are merely to give you an insight to my thinking and would be removed after a successful review.
 */

function replaceEnvVars(cmd: string | undefined, env: DotenvConfig): string {
  const envKeys: string[] = Object.keys(env);

  if (!cmd) {
    throw new ReferenceError("A command is required by this function.");
  }

  // I'm not sure if you have a loop preference? This is the method I have become accustom to in terms of readability and performance.
  envKeys.forEach((envKey: string) => {
    // This is a little ugly but I like explicit variable declaration for readability.
    const envValue: string = env[envKey];
    // String are immutable so it doesn't matter if we directly work on the cmd string.
    cmd = cmd?.replace(`\${${envKey}}`, envValue);
  });

  return cmd;
}

export default replaceEnvVars;
