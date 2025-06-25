import { Meta, StoryObj } from "@storybook/react-webpack5"
import React from "react"

import { Iframe } from "./Iframe"

export default {
  title: "Iframe",
  component: Iframe,
  parameters: {
    viewMode: "docs",
    layout: "fullscreen",
  },
  decorators: [
    Story => (
      <div style={{ height: "100vh", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Iframe>

export const Default: StoryObj<typeof Iframe> = {
  name: "Iframe",
  args: {
    uri: "https://bounce.com/careers",
    style: { width: "100%", height: "100%" },
  },
}
