function readFirstExistingFile(files: string[]): string {
  const [firstFile, ...restFiles] = files;
  try {
    const fileBytes = Deno.readFileSync(firstFile);
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(fileBytes);
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
