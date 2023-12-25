/**
 * vite plugin options for [monaco-editor](https://github.com/microsoft/monaco-editor)
 */
export interface PluginOptions {
  /**
   * vite serve command options
   */
  serve?: {
    /**
     * base node_modules path for monaco-editor. Default is "./".
     * @default './'
     */
    base?: string;
  };
  /**
   * vite build command options
   */
  build?: {
    /**
     * Same as Vite configuration base option. Default is "/".
     * @default "/"
     */
    base?: string;
    /**
     * Local output directory, default is the same as Vite configuration build.outDir option
     * @default "dist"
     */
    outDir?: string;
    /**
     * cdn source type, parameters name/version/file are taken from the modules configuration. Default is "unpkg".
     * * jsdelivr: base will be set to https://cdn.jsdelivr.net/npm/monaco-editor@{version}
     * * unpkg: base will be set to https://unpkg.com/monaco-editor@{version}
     *
     * @default undefined
     */
    cdn?: 'unpkg' | 'jsdelivr';
    /**
     * Local output path, module URLs will also be replaced with this path. Default is "npm/monaco-editor@{version}"
     * @default "npm/monaco-editor@{version}"
     */
    path?: string;
    /**
     * Whether to copy monaco-editor to output directory. The default value is true when cdn is empty
     * @default true
     */
    copy?: boolean;
  };
}
