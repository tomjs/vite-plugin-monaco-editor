# @tomjs/vite-plugin-monaco-editor

[![npm](https://img.shields.io/npm/v/@tomjs/vite-plugin-monaco-editor)](https://www.npmjs.com/package/@tomjs/vite-plugin-monaco-editor) ![node-current (scoped)](https://img.shields.io/node/v/@tomjs/vite-plugin-monaco-editor) ![NPM](https://img.shields.io/npm/l/@tomjs/vite-plugin-monaco-editor) [![Docs](https://www.paka.dev/badges/v0/cute.svg)](https://www.paka.dev/npm/@tomjs/vite-plugin-monaco-editor)

[English](./README.md) | **中文**

> [vite](https://vitejs.dev) [monaco-editor](https://github.com/microsoft/monaco-editor)插件，为index.html注入脚本

## 特性

- `vite serve` 时使用 `node_modules` 目录下的库
- `vite build` 时可选使用 `本地` 或 `CDN`

## 安装

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

## 使用说明

以 vue/react 项目为例

### vue示例

```js
import { defineConfig } from 'vite';
import monaco from '@tomjs/vite-plugin-monaco-editor';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    // 默认使用 cdn
    monaco(),
  ],
});
```

### react示例

```js
import { defineConfig } from 'vite';
import monaco from '@tomjs/vite-plugin-monaco-editor';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  // 使用本地的monaco-editor，从 node_modules 复制到 dist 目录
  plugins: [react(), monaco({ local: true })],
});
```

## 文档

- [paka.dev](https://paka.dev) 提供的 [API文档](https://paka.dev/npm/@tomjs/vite-plugin-monaco-editor).
- [unpkg.com](https://www.unpkg.com/) 提供的 [index.d.ts](https://www.unpkg.com/browse/@tomjs/vite-plugin-monaco-editor/dist/index.d.ts).

## 参数

| 参数  | 类型                                | 默认            | 描述                             |
| ----- | ----------------------------------- | --------------- | -------------------------------- |
| type  | `'unpkg' \| 'jsdelivr' \| 'custom'` | `'unpkg'`       | CDN源类型                        |
| url   | `string`                            | ''              | 自定义 URL（与 `type` 一起使用） |
| local | `boolean` \| [NpmLocal](#NpmLocal)  | `false`         | 本地模式或本地模式的更多配置     |
| serve | [ServerConfig](#ServerConfig)       | `{ base: './'}` | vite命令为serve时的配置          |

### NpmLocal

本地配置。

| 参数   | 类型      | 默认                            | 描述                                      |
| ------ | --------- | ------------------------------- | ----------------------------------------- |
| base   | `string`  | `'/'`                           | 与 Vite 的 `base` 选项相同                |
| outDir | `string`  | `'dist'`                        | 本地输出目录，默认为Vite的 `build.outDir` |
| path   | `string`  | `'npm/monaco-editor@{version}'` | 本地输出路径，模块 URL 也将替换为该路径   |
| copy   | `boolean` | `true`                          | 是否将 monaco-editor 复制到输出目录       |

### ServerConfig

vite命令为 serve 时的配置

| 参数 | 类型     | 默认   | 描述                    |
| ---- | -------- | ------ | ----------------------- |
| base | `string` | `'./'` | node_modules 的相对路径 |

## 开发

- 开发环境

  - git
  - node>=18
  - pnpm>=8

- 首次使用，需要安装依赖，执行如下命令

```bash
# 安装依赖
pnpm i
# 编译库
pnpm build
```

- 调试 `vue` 项目，执行如下命令

```bash
cd examples/vue
pnpm build
pnpm preview
```

- 调试 `react` 项目，执行如下命令

```bash
cd examples/react
pnpm build
pnpm preview
```
