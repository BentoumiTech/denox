import { resolve } from "../../deps.ts";

function readFirstExistingFile(
  files: string[],
): { path: string; content: string } {
  const [firstFile, ...restFiles] = files;
  try {
    const firstFileFullPath = resolve(firstFile);
    const fileBytes = Deno.readFileSync(firstFileFullPath);
    const decoder = new TextDecoder("utf-8");
    return {
      path: firstFileFullPath,
      content: decoder.decode(fileBytes),
    };
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      if (restFiles.length > 0) {
        return readFirstExistingFile(restFiles);
      }
    }

    throw e;
  }
}

async function exists(filename: string): Promise<boolean> {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
}

export { readFirstExistingFile, exists };
