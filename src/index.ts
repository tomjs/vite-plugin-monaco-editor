import type { Plugin } from 'vite';
import type { PluginOptions } from './types';
import { PLUGIN_NAME } from './constants';

export * from './types';

/**
 * use vite plugin for [monaco-editor](https://github.com/microsoft/monaco-editor)
 */
export function useMonacoEditorPlugin(options?: PluginOptions): Plugin[] {
  const opts = Object.assign({}, options);
  console.log(opts);

  return [
    {
      name: PLUGIN_NAME,
      apply: 'serve',
      transformIndexHtml(html) {
        return html;
      },
    },
    {
      name: PLUGIN_NAME,
      apply: 'build',
      transformIndexHtml(html) {
        return html;
      },
      closeBundle() {},
    },
  ];
}

export default useMonacoEditorPlugin;
