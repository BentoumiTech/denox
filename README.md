# DenoX

DenoX adds workspace file support for your Deno projects.

Instead of having to rely on `--allow-all` due to the tedious task to rewrite all the permissions in your shell, you can now write your premissions once in a `.deno-workspace` file.

In addition to that you can set different scripts to be run with different permissions.

Eg:

- `denox run start`
- `denox run develop`
- `denox run pre-start`
