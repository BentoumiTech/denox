# DenoX

![GitHub](https://img.shields.io/github/license/BentoumiTech/denox?style=flat-square)![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bentoumitech/denox?style=flat-square)![GitHub Workflow Status](https://img.shields.io/github/workflow/status/bentoumitech/denox/ci?style=flat-square)

DenoX adds workspace support for your Deno projects.

In a similar fashion to `package.json` in NodeJS, you can specify a list of scripts and their respective permissions.

Instead of having to rely on `--allow-all` due to the tedious task of rewriting all your permissions in the shell, you can now write your permissions once in a `.deno-workspace` file.

## Installation

Prerequisites: [Deno](https://github.com/denoland/deno_install) (>=1.0.0)

`$ deno install -Af denox https://denopkg.com/BentoumiTech/denox/denox.ts`

You can now access `denox`

## Getting Started

Create a file named `.deno-workspace` at the root of your Deno project.

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

### Globals

Options set under the `globals` property gets added to all scripts.

> Note: If an option is specified globally as well as for a script the value in the `scripts` block will overwrite the one in the `globals` block

##### Example:

```yaml
scripts:
  # "denox run start" --allow-read permission overwrite the globals permission
  start:
    file: main.ts
    permissions:
      allow-net: example.com
      allow-read: false
  # "denox run develop" inherit the --allow-read permission from the globals permissions
  develop:
    file: main.ts
    permissions:
      allow-net: localhost
globals:
  permissions:
    allow-read: true
```

### Permissions

Permissions value either accept a string, array of strings or boolean.

##### Example:

```yaml
scripts:
  # "denox run start" will translate to "deno run --allow-net=example.com github.com --allow-env --allow-read=./files main.ts"
  start:
    file: main.ts
    permissions:
      allow-net:
        - example.com
        - github.com
      allow-env: true
      allow-read: ./files
      allow-write: false
```
