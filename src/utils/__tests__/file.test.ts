import { assertEquals, assertThrowsAsync, resolve, assertStrContains } from "../../../dev_deps.ts";
import { getFileContent, getFirstExistingPath, exists } from "../file.ts";


Deno.test("read file", async () => {
  const fileContent = await getFileContent('./src/utils/__tests__/fixture/file.txt')

  assertStrContains(
    fileContent,
    "test file content",
  );
});

Deno.test("throw error if file doesn't exist", async () => {
  await assertThrowsAsync(async ()=> {
    await getFileContent('./src/utils/__tests__/fixture/no-found.txt')
  }, Deno.errors.NotFound);
});

Deno.test("return first existing path", async () => {
  const firstExistingPath = await getFirstExistingPath([
    './src/utils/__tests__/fixture/list-files/first.txt',
    './src/utils/__tests__/fixture/list-files/second.txt',
    './src/utils/__tests__/fixture/list-files/third.txt',
  ])

  assertEquals(
    firstExistingPath,
    resolve("./src/utils/__tests__/fixture/list-files/second.txt"),
  );
});

Deno.test("throw error if no file in list exist", async () => {
  await assertThrowsAsync(async ()=> {
    await getFirstExistingPath([
      './src/utils/__tests__/fixture/list-files/fourth.txt',
      './src/utils/__tests__/fixture/list-files/fifth.txt',
      './src/utils/__tests__/fixture/list-files/sixth.txt',
    ])
  }, Deno.errors.NotFound);
});


Deno.test("return true if file exist", async () => {
  const fileExist = await exists('./src/utils/__tests__/fixture/file.txt')

  assertEquals(
    fileExist,
    true,
  );
});

Deno.test("return false if file is not found", async () => {
  const fileExist = await exists('./src/utils/__tests__/fixture/file-not-found.txt')

  assertEquals(
    fileExist,
    false,
  );
});
