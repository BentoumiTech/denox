import {
  resolve,
} from "../../dev_deps.ts";

async function changeAndRestoreCWD(
  directory: string,
  assertion: (denoxPath: string) => Promise<any>,
) {
  const cwd = Deno.cwd();
  const denoxPath = resolve("./denox.ts");
  Deno.chdir(resolve(directory));

  await assertion(denoxPath);

  Deno.chdir(cwd);
}

export { changeAndRestoreCWD };
