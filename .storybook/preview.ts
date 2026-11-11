import type { Preview } from "@storybook/react-native-web-vite"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      viewMode: "docs",
    },
  },
  tags: ["autodocs"],
}

export default preview
