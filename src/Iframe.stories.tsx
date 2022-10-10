import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"

import { Iframe } from "./Iframe"

export default {
  title: "Iframe",
  component: Iframe,
  parameters: {
    viewMode: "docs",
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Iframe>

const Template: ComponentStory<typeof Iframe> = args => (
  <div style={{ height: "100vh", width: "100%" }}>
    <Iframe {...args} />
  </div>
)

export const Default = Template.bind({})
Default.storyName = "Iframe"
Default.args = {
  uri: "https://usebounce.com/careers",
  style: { width: "100%", height: "100%" },
}
