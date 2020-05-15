<h1 align="center">
  <br>
  <a href="https://github.com/BentoumiTech/denox" alt="DenoX">
    <img src="https://raw.githubusercontent.com/bentoumitech/denox/master/.github/img/denox-logo.png" alt="Deno script runner">
  </a>
  <br/>
</h1>
<p align="center">
  <img src="https://img.shields.io/github/license/BentoumiTech/denox?logo=MIT&style=flat-square" alt="MIT License"/>
  <img src="https://img.shields.io/github/v/tag/bentoumitech/denox?style=flat-square" alt="latest SemVer"/>
  <img src="https://img.shields.io/github/workflow/status/BentoumiTech/denox/CI/master" alt="GitHub Workflow Status"/>
  <br />
  <img src="https://raw.githubusercontent.com/bentoumitech/denox/master/.github/img/screenshot-example.png" alt="DenoX screenshot example">
</p>


## Overview

DenoX is a script runner and workspace wrapper for Deno

Using DenoX, you can set up your workspace scripts permissions and options in declarative code.

In short, it allows you to to replace this:

```bash
$ deno run --allow-read --allow-write --allow-net main.ts
```

with this:

```bash
$ denox run start
```

- **DRY** Only write your permissions and options once.
- **Packaged** Your code can run on a different machine with a short single command `denox run start`
- **Extensible** :soon:

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

Create a file named `deno-workspace.yml` at the root of your Deno project.

> Note: `deno-workspace.yml` format is YAML

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
