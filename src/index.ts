import type { Plugin } from 'vite';
import type { PluginOptions } from './types';
import path from 'node:path';
import fs from 'fs-extra';
import { parse as htmlParser } from 'node-html-parser';
import { PLUGIN_NAME } from './constants';
import { urlConcat } from './utils';

export * from './types';

function getPkgVersion() {
  const pwd = process.cwd();
  const modulePath = path.join(pwd, 'node_modules/monaco-editor');
  const pkgFile = path.join(modulePath, 'package.json');
  if (!fs.existsSync(pkgFile)) {
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
  return pkg.version;
}

function getHtmlRoot(html: string) {
  const root = htmlParser(html);
  const title = root.querySelector('title');
  if (!title) {
    const head = root.querySelector('head');
    if (!head) {
      root?.insertAdjacentHTML('beforeend', '<head></head>');
    }
    head?.insertAdjacentHTML('beforeend', '<title></title>');
  }

  return { root, title };
}

function getInjectHtml(urlPrefix: string) {
  return /* html*/ `
<link rel="stylesheet" data-name="vs/editor/editor.main" href="${urlPrefix}/editor/editor.main.css"/>
<script>var require = { paths: { vs: "${urlPrefix}" } };</script>
<script src="${urlPrefix}/loader.js"></script>
<script src="${urlPrefix}/editor/editor.main.nls.js"></script>
<script src="${urlPrefix}/editor/editor.main.js"></script>`;
}

function preHandleOptions(options?: PluginOptions) {
  const opts = Object.assign({}, options);
  const serveOpts = Object.assign({}, opts.serve);
  serveOpts.base = serveOpts.base || './';
  opts.serve = serveOpts;

  opts.build = Object.assign({}, opts.build);

  return opts;
}

/**
 * use vite plugin for [monaco-editor](https://github.com/microsoft/monaco-editor)
 */
export function useMonacoEditorPlugin(options?: PluginOptions): Plugin[] {
  const opts: PluginOptions = preHandleOptions(options);

  const serveOpts = opts.serve;
  const buildOpts = opts.build || {};
  let cdUrl: string;

  return [
    {
      name: PLUGIN_NAME,
      apply: 'serve',
      transformIndexHtml(html) {
        const { root, title } = getHtmlRoot(html);
        const urlPrefix = urlConcat(serveOpts?.base || './', `node_modules/monaco-editor/dev/vs`);
        title?.insertAdjacentHTML('afterend', getInjectHtml(urlPrefix));
        return root.toString();
      },
    },
    {
      name: PLUGIN_NAME,
      apply: 'build',
      configResolved(config) {
        console.log(config.base);

        buildOpts.base ||= config.base;
        buildOpts.outDir ||= config.build.outDir;
        buildOpts.copy ??= true;

        if (buildOpts?.cdn) {
          cdUrl =
            buildOpts?.cdn === 'unpkg'
              ? 'https://cdn.jsdelivr.net/npm/monaco-editor@{version}'
              : 'https://unpkg.com/monaco-editor@{version}';
          cdUrl = cdUrl.replace(/@{version}/g, getPkgVersion());
        } else {
          const buildPath = buildOpts?.path || 'npm/monaco-editor@{version}';
          buildOpts.path = buildPath.replace(/@{version}/g, getPkgVersion());
        }
      },
      transformIndexHtml(html) {
        const { root, title } = getHtmlRoot(html);

        const urlPrefix =
          cdUrl || urlConcat(buildOpts?.base || '/', buildOpts.path || '', '/min/vs');
        title?.insertAdjacentHTML('afterend', getInjectHtml(urlPrefix));
        return root.toString();
      },
      closeBundle() {
        if (!buildOpts?.copy && !cdUrl) {
          return;
        }
        // Output directory
        const outDir = buildOpts.outDir || 'dist';
        const outPath = path.join(process.cwd(), outDir);
        if (!fs.existsSync(outPath)) {
          fs.mkdirpSync(outPath);
        }

        const srcFolder = path.join(process.cwd(), 'node_modules/monaco-editor/min');
        const destFolder = path.join(outPath, buildOpts.path!, 'min');
        fs.copySync(srcFolder, destFolder);
      },
    },
  ];
}

export default useMonacoEditorPlugin;
