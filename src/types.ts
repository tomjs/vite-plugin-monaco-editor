export interface NpmLocal {
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
   * Local output path, module URLs will also be replaced with this path. Default is "npm/monaco-editor@{version}"
   * @default "npm/monaco-editor@{version}"
   */
  path?: string;
  /**
   * Whether to copy monaco-editor to output directory. The default value is true when cdn is empty
   * @default true
   */
  copy?: boolean;
}

export interface ServerConfig {
  /**
   * Relative path to node_modules. Default is "./".
   * @default './'
   */
  base?: string;
}

/**
 * vite plugin options for [monaco-editor](https://github.com/microsoft/monaco-editor)
 */
export interface PluginOptions {
  /**
   * cdn source type, parameters name/version/file are taken from the modules configuration. Default is "unpkg".
   * * jsdelivr: base will be set to https://cdn.jsdelivr.net/npm/monaco-editor@{version}
   * * unpkg: base will be set to https://unpkg.com/monaco-editor@{version}
   * * custom: custom url can be defined
   *
   * @default unpkg
   */
  type?: 'unpkg' | 'jsdelivr' | 'custom';

  /**
   * Used in conjunction with the type parameter, sets different urls
   * * jsdelivr: https://cdn.jsdelivr.net/npm/monaco-editor@{version}
   * * unpkg: https://unpkg.com/monaco-editor@{version}
   * * custom: custom url
   */
  url?: string;

  /**
   * Local mode or more configurations for local mode. Default is false.
   * @default false
   */
  local?: boolean | NpmLocal;
  /**
   * Configuration when vite command is serve
   */
  serve?: ServerConfig;
}
