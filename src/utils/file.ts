import { resolve } from "../../deps.ts";

async function getFileContent(
  filePath: string,
): Promise<string> {
  const fileBytes = await Deno.readFile(filePath);
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(fileBytes);
}

async function getFirstExistingPath(
  files: string[],
): Promise<string> {
  const [firstFile, ...restFiles] = files;
  const firstFileFullPath = resolve(firstFile);
  const isfirstFileFullPathExist = await exists(firstFileFullPath);

  if (isfirstFileFullPathExist) {
    return firstFileFullPath;
  }

  if (restFiles.length > 0) {
    return await getFirstExistingPath(restFiles);
  }

  throw new Deno.errors.NotFound();
}

async function exists(filename: string): Promise<boolean> {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }

    throw error;
  }
}

export { getFirstExistingPath, getFileContent, exists };
