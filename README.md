# DenoX

DenoX adds workspace support for your Deno projects.

Instead of having to rely on `--allow-all` due to the tedious task of rewriting all your permissions in the shell, you can now write your premissions once in a `.deno-workspace` file.

In addition to that you can set different scripts to be run with different permissions.

Eg:

- `denox run start`
- `denox run develop`
- `denox run pre-start`

## Installation

Prerequisites: [Deno](https://github.com/denoland/deno_install) (>=1.0.0)

`$ deno install -Af denox https://denopkg.com/BentoumiTech/denox/denox.ts`

You can now access `denox`

## Getting Started

Create a file named `.deno-workspace` at the root of your deno project.

> Note: The `.deno-workspace` file uses YAML

### Scripts

Defines a set of deno scripts you can run

##### Example:

```yaml
scripts:
  # "denox run start" will execute main.ts with example.com networking permissions
  start:
    file: main.ts
    permissions:
      allow-net: example.com
  # "denox run develop" will execute main.ts with localhost networking permissions
  develop:
  	file: main.ts
  	permissions:
      allow-net: localhost
```
