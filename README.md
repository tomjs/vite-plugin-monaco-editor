# @tomjs/vite-plugin-monaco-editor

[![npm](https://img.shields.io/npm/v/@tomjs/vite-plugin-monaco-editor)](https://www.npmjs.com/package/@tomjs/vite-plugin-monaco-editor) ![node-current (scoped)](https://img.shields.io/node/v/@tomjs/vite-plugin-monaco-editor) ![NPM](https://img.shields.io/npm/l/@tomjs/vite-plugin-monaco-editor) [![Docs](https://img.shields.io/badge/API-unpkg-orange)](https://www.unpkg.com/browse/@tomjs/vite-plugin-monaco-editor/dist/index.d.ts)

**English** | [中文](./README.zh_CN.md)

> [vite](https://vitejs.dev) plugin for [monaco-editor](https://github.com/microsoft/monaco-editor), inject scripts for index.html

## Features

- Use libraries in the `node_modules` directory when `vite serve`
- Optional use of `local` or `CDN` when `vite build`

## Install

```bash
# pnpm
pnpm add monaco-editor
pnpm add @tomjs/vite-plugin-monaco-editor -D

# yarn
yarn add monaco-editor
yarn add @tomjs/vite-plugin-monaco-editor -D

# npm
npm i monaco-editor --save
npm i @tomjs/vite-plugin-monaco-editor --save-dev
```

## Usage

Taking Vue/React projects as examples:

### Vue Example

```js
import { defineConfig } from 'vite';
import monaco from '@tomjs/vite-plugin-monaco-editor';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    // use cdn by default
    monaco(),
  ],
});
```

### React Example

```js
import { defineConfig } from 'vite';
import monaco from '@tomjs/vite-plugin-monaco-editor';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  // use the local monaco-editor, copy from node_modules to the dist directory
  plugins: [react(), monaco({ local: true })],
});
```

## Documentation

- [index.d.ts](https://www.unpkg.com/browse/@tomjs/vite-plugin-monaco-editor/dist/index.d.ts) provided by [unpkg.com](https://www.unpkg.com).

## Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'npmmirror' \| 'unpkg' \| 'jsdelivr' \| 'custom'` | `'unpkg'` | `CDN` source type, parameters `version` are taken from the modules configuration. When the OS language is `zh_CN` , the default value is `npmmirror`, otherwise it is `jsdelivr`. |
| url | `string` | '' | Custom URL (used with `type` ) |
| local | `boolean` \| [NpmLocal](#NpmLocal) | `false` | Local mode or more configurations for local mode |
| serve | [ServerConfig](#ServerConfig) | `{ base: './'}` | Configuration when vite command is serve |

CDN type:

- npmmirror: base will be set to https://registry.npmmirror.com/monaco-editor/{version}/files
- jsdelivr: base will be set to https://cdn.jsdelivr.net/npm/monaco-editor@{version}
- unpkg: base will be set to https://unpkg.com/monaco-editor@{version}
- custom: custom url can be defined

### NpmLocal

Local configuration.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| base | `string` | `'/'` | Same as Vite's `base` option |
| outDir | `string` | `'dist'` | Local output directory, defaults to Vite's `build.outDir` |
| path | `string` | `'npm/monaco-editor@{version}'` | Local output path, module URLs will also be replaced with this path |
| copy | `boolean` | `true` | Whether to copy monaco-editor to output directory |

### ServerConfig

Configuration when vite command is serve.

| Parameter | Type     | Default | Description                   |
| --------- | -------- | ------- | ----------------------------- |
| base      | `string` | `'./'`  | Relative path to node_modules |

## Development

- Development requirements:

  - git
  - node>=18
  - pnpm>=8

- For first-time use, install dependencies by running the following commands:

```bash
# Install dependencies
pnpm i
# build library
pnpm build
```

- To debug the `vue` project, execute the following commands:

```bash
cd examples/vue
pnpm build
pnpm preview
```

- To debug the `react` project, execute the following commands:

```bash
cd examples/react
pnpm build
pnpm preview
```
