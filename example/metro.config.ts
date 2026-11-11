// Learn more https://docs.expo.dev/guides/monorepos
import path from "node:path"

import { getDefaultConfig, type MetroConfig } from "expo/metro-config"

const projectRoot = import.meta.dirname
const workspaceRoot = path.resolve(projectRoot, "..")

const defaultConfig = getDefaultConfig(projectRoot)

// The library's source resolves its imports from the root node_modules, the app
// from its own. Pin the packages that must exist once so both get the same copy.
const singletons = new Set([
  "react",
  "react-dom",
  "react-native",
  "react-native-web",
  "react-native-webview",
])
const appEntry = path.join(projectRoot, "index.ts")

const config: MetroConfig = {
  ...defaultConfig,
  // The library's source lives outside the app, so Metro has to watch it.
  watchFolders: [workspaceRoot],
  resolver: {
    ...defaultConfig.resolver,
    resolveRequest: (context, moduleName, platform) => {
      const name = moduleName.startsWith("@")
        ? moduleName.split("/").slice(0, 2).join("/")
        : moduleName.split("/")[0]
      if (name && singletons.has(name)) {
        return context.resolveRequest(
          { ...context, originModulePath: appEntry },
          moduleName,
          platform,
        )
      }
      return context.resolveRequest(context, moduleName, platform)
    },
  },
}

export default config
