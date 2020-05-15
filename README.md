<h1 align="center">
  <br>
  <a href="https://github.com/BentoumiTech/denox" alt="DenoX">
    <img height="100%" width="475px" src="https://raw.githubusercontent.com/BentoumiTech/denox/master/.github/img/denox-logo.png" alt="Deno script runner">
  </a>
  <br/>
</h1>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/BentoumiTech/denox/CI/master" alt="GitHub Workflow Status"/>
  <img src="https://img.shields.io/github/v/tag/bentoumitech/denox?style=flat-square" alt="latest SemVer"/>
  <img src="https://img.shields.io/badge/contribution-welcome-brightgreen.svg?style=flat-square" alt="Contribution welcome"/>
  <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square" alt="Commitizen friendly"/>
  <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square" alt="Commitizen friendly"/>
  <img src="https://img.shields.io/badge/semantic-release-e10079.svg?style=flat-square" alt="Semantic release"/>
  <img src="https://img.shields.io/github/license/BentoumiTech/denox?logo=MIT&style=flat-square" alt="MIT License"/>
  <br />
  <br />
  <a href="#installupgrade">Install/Upgrade</a> •
  <a href="#overview">Overview</a> •
  <a href="#usage">Usage</a> •
  <a href="#getting-started">Getting started</a> •
  <a href="#contributing">Contributing</a>
  <br />
  <br />
  <img height="100%" width="600px" src="https://raw.githubusercontent.com/bentoumitech/denox/master/.github/img/screenshot-example.png" alt="DenoX screenshot example">
</p>

## Install/Upgrade

Prerequisites: [Deno](https://github.com/denoland/deno_install) (>=1.0.0)

```bash
$ deno install -Af -n denox https://denopkg.com/BentoumiTech/denox/denox.ts
```

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

## Usage

```bash
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

> Note: `deno-workspace.yml` format is YAML but it also supports JSON

## Scripts

You can easily run scripts using denox by adding them to the "scripts" field in `deno-workspace.yml` and run them with `denox run <script-name>`.

### Example:

```yaml
scripts:
  # "denox run start" will execute main.ts with example.com networking permissions
  start:
    file: main.ts
    deno_options:
      allow-net: example.com
  # "denox run develop" will execute main.ts with localhost networking permissions and source code cache reloaded
  develop:
    file: main.ts
    deno_options:
      allow-net: localhost
      reload: true
```

## Options

Scripts can be extended with options.

### deno_options:

Deno options will add the corresponding deno argument with it's value to the deno command.

It supports string, array of strings and boolean.

### Example:

```yaml
scripts:
  # "denox run start" will execute "deno run --allow-net=example.com github.com --reload --allow-read=./files main.ts"
  start:
    file: main.ts
    deno_options:
      reload: true
      allow-net:
        - example.com
        - github.com
      allow-read: ./files
      allow-write: false
```

### Compatibility

It currently support all the options that are accepted by the `deno run` command. For more informations refer to `deno run --help`.

```
allow-all, allow-env, allow-hrtime, allow-net, allow-plugin, allow-read, allow-run,
allow-write, cached-only, cert, config, importmap, inspect, inspect-brk, lock, lock-write,
log-level, no-remote, quiet, reload, seed, unstable, v8-flags
```

## Globals

Options added in "globals" field gets added to all scripts.

> Note: If a same option is set in a script and also set globally the script scoped value overwrite the global one

### Example:

```yaml
scripts:
  # "denox run develop" inherit the --allow-read permission from the globals deno_options
  # "deno run --all-read main.ts"
  develop:
    file: main.ts
globals:
  deno_options:
    allow-read: true
```

## Contributing

Please take a look at our [contributing](./CONTRIBUTING.md) guidelines if you're interested in helping!
