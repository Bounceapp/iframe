// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require("expo/metro-config")
const path = require("node:path")

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, "..")

const config = getDefaultConfig(projectRoot)

// The library's source lives outside the app, so Metro has to watch it.
config.watchFolders = [workspaceRoot]

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

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const name = moduleName.startsWith("@")
    ? moduleName.split("/").slice(0, 2).join("/")
    : moduleName.split("/")[0]
  if (singletons.has(name)) {
    return context.resolveRequest(
      { ...context, originModulePath: appEntry },
      moduleName,
      platform,
    )
  }
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
