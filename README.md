# DenoX

![GitHub](https://img.shields.io/github/license/BentoumiTech/denox?logo=MIT&style=flat-square) ![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/bentoumitech/denox?style=flat-square) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/BentoumiTech/denox/CI/master)

DenoX is a script runner and workspace wrapper for Deno

Using DenoX, you can set up your deno workspace scripts permissions and options in declarative code.

In short, it allows you to to replace having to write this all the time:

```bash
$ deno run --allow-read --allow-write --allow-net main.ts
```

with this

```bash
$ denox run start
```

## Install/Upgrade

Prerequisites: [Deno](https://github.com/denoland/deno_install) (>=1.0.0)

```bash
$ deno install -Af -n denox https://denopkg.com/BentoumiTech/denox/denox.ts
$ denox --help
denox v0.2.0

Usage:
  $ denox <command> [options]

Commands:
  run <script> [...args]  Run a script

For more info, run any command with the `--help` flag:
  $ denox run --help

Options:
  -h, --help     Display this message 
  -v, --version  Display version number 

Examples:
denox run start
```

## Getting Started

Create a file named `deno-workspace` at the root of your Deno project.

> Note: `deno-workspace` format is YAML

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
