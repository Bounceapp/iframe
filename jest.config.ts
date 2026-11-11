import type { Config } from "jest"

type Project = Exclude<NonNullable<Config["projects"]>[number], string>

// Each project uses a jest-expo platform preset, which resolves `.ios`, `.android`,
// `.native` and `.web` source files the way Metro does. Tests sit next to the file
// they cover and are routed to the platforms that file runs on:
//
//   *.test.tsx         runs on every platform
//   *.native.test.tsx  runs on iOS and Android
//   *.web.test.tsx     runs on web (jsdom + react-native-web)
const project = (
  platform: "ios" | "android" | "web",
  config: Project = {},
): Project => ({
  preset: `jest-expo/${platform}`,
  testMatch: [
    "**/*.test.[jt]s?(x)",
    `!**/*.${platform === "web" ? "native" : "web"}.test.[jt]s?(x)`,
  ],
  // Keep the build output and the example app out of the module map.
  modulePathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/example/"],
  ...config,
})

const config: Config = {
  projects: [project("ios"), project("android"), project("web")],
}

export default config
