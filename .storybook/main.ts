import type { StorybookConfig } from "@storybook/react-native-web-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
  docs: {},
}

export default config
