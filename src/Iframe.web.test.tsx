// Runs on web only (jsdom + react-native-web): `jest.config.ts` keeps
// `*.web.test.tsx` out of the iOS and Android projects.

import { fireEvent, render } from "@testing-library/react"

import { Iframe } from "./Iframe"

const uri = "https://example.com/"

const renderIframe = (props: Partial<Parameters<typeof Iframe>[0]> = {}) => {
  const result = render(<Iframe uri={uri} {...props} />)
  const iframe = result.container.querySelector("iframe")
  if (!iframe) {
    throw new Error("Iframe rendered no <iframe>")
  }
  return { ...result, iframe }
}

describe("Iframe.web", () => {
  it("renders an iframe that loads the uri", () => {
    const { iframe } = renderIframe({ style: { width: 320, height: 240 } })

    expect(iframe.getAttribute("src")).toBe(uri)
    expect(iframe.style.width).toBe("320px")
    expect(iframe.style.height).toBe("240px")
  })

  it("sandboxes the page and draws no border", () => {
    const { iframe } = renderIframe()

    expect(iframe.getAttribute("sandbox")).toBe(
      "allow-same-origin allow-scripts",
    )
    expect(iframe.getAttribute("frameborder")).toBe("0")
  })

  it("calls onLoadEnd when the page finishes loading", () => {
    const onLoadEnd = jest.fn()
    const { iframe } = renderIframe({ onLoadEnd })

    fireEvent.load(iframe)

    expect(onLoadEnd).toHaveBeenCalledTimes(1)
  })

  it("calls only the latest onLoadEnd", () => {
    const first = jest.fn()
    const second = jest.fn()
    const { iframe, rerender } = renderIframe({ onLoadEnd: first })

    rerender(<Iframe uri={uri} onLoadEnd={second} />)
    fireEvent.load(iframe)

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it("stops listening when unmounted", () => {
    const onLoadEnd = jest.fn()
    const { iframe, unmount } = renderIframe({ onLoadEnd })

    unmount()
    fireEvent.load(iframe)

    expect(onLoadEnd).not.toHaveBeenCalled()
  })
})
