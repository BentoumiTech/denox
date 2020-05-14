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

export { readFirstExistingFile };
