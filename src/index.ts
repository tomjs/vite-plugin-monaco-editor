import type { Plugin } from 'vite';
import type { NpmLocal, PluginOptions } from './types';
import path from 'node:path';
import fs from 'fs-extra';
import { parse as htmlParser } from 'node-html-parser';
import { PLUGIN_NAME } from './constants';
import { urlConcat } from './utils';

export * from './types';

const CdnUrlMap = {
  unpkg: 'https://unpkg.com/monaco-editor@{version}',
  jsdelivr: 'https://cdn.jsdelivr.net/npm/monaco-editor@{version}',
};

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

function preHandleOptions(
  options?: PluginOptions,
): Omit<PluginOptions, 'local'> & { local?: NpmLocal } {
  const { local, ...opts } = Object.assign(
    {
      type: 'unpkg',
    } as PluginOptions,
    options,
  );
  const serveOpts = Object.assign({}, opts.serve);
  opts.serve = serveOpts;

  let localOpts: NpmLocal | undefined;
  if (local === true) {
    localOpts = { copy: true };
  } else if (typeof local === 'object') {
    localOpts = local;
  }

  return Object.assign(opts, { local: localOpts });
}

/**
 * use vite plugin for [monaco-editor](https://github.com/microsoft/monaco-editor)
 */
export function useMonacoEditorPlugin(options?: PluginOptions): Plugin[] {
  const opts = preHandleOptions(options);

  const serveOpts = opts.serve!;
  const localOpts = opts.local!;

  let cdUrl: string;

  return [
    {
      name: PLUGIN_NAME,
      apply: 'serve',
      configResolved(config) {
        serveOpts.base = serveOpts?.base || config.base || '/';
      },
      transformIndexHtml(html) {
        const { root, title } = getHtmlRoot(html);
        const urlPrefix = urlConcat(serveOpts.base!, `node_modules/monaco-editor/dev/vs`);
        title?.insertAdjacentHTML('afterend', getInjectHtml(urlPrefix));
        return root.toString();
      },
    },
    {
      name: PLUGIN_NAME,
      apply: 'build',
      configResolved(config) {
        console.log(config.base);

        if (localOpts) {
          localOpts.base ||= config.base;
          localOpts.outDir ||= config.build.outDir;
          localOpts.copy ??= true;

          localOpts.path ||= 'npm/monaco-editor@{version}';
          localOpts.path = localOpts.path.replace(/{version}/g, getPkgVersion());

          opts.local = localOpts;
        } else {
          cdUrl = CdnUrlMap[opts.type || 'unpkg'] || opts.url || '';
          if (!cdUrl) {
            throw new Error('When the type parameter is custom, the url parameter is required.');
          }

          cdUrl = cdUrl.replace(/{version}/g, getPkgVersion());
        }
      },
      transformIndexHtml(html) {
        const { root, title } = getHtmlRoot(html);
        const urlPrefix = cdUrl || urlConcat(localOpts?.base || '/', localOpts?.path || '');
        title?.insertAdjacentHTML('afterend', getInjectHtml(urlConcat(urlPrefix, '/min/vs')));
        return root.toString();
      },
      closeBundle() {
        if (!localOpts?.copy) {
          return;
        }
        // Output directory
        const outDir = localOpts.outDir || 'dist';
        const outPath = path.join(process.cwd(), outDir);
        if (!fs.existsSync(outPath)) {
          fs.mkdirpSync(outPath);
        }

        const srcFolder = path.join(process.cwd(), 'node_modules/monaco-editor/min');
        const destFolder = path.join(outPath, localOpts.path!, 'min');
        fs.copySync(srcFolder, destFolder);
      },
    },
  ];
}

export default useMonacoEditorPlugin;
