// Runs on iOS and Android only: `jest.config.ts` keeps `*.native.test.tsx` out
// of the web project.

import { render, screen } from "@testing-library/react-native"

import { Iframe as ResolvedIframe } from "./Iframe"
import { Iframe } from "./Iframe.native"

// The real WebView needs its native module, which the test renderer doesn't have.
// What `Iframe` owns is the props it passes to the WebView, so a host view stands
// in for it and keeps them.
jest.mock("react-native-webview", () => {
  const { createElement } = jest.requireActual<typeof import("react")>("react")
  const { View } =
    jest.requireActual<typeof import("react-native")>("react-native")

  return {
    WebView: (props: object) =>
      createElement(View, { ...props, testID: "webview" }),
  }
})

const uri = "https://example.com/"

describe("Iframe.native", () => {
  it("is what `./Iframe` resolves to on native platforms", () => {
    expect(ResolvedIframe).toBe(Iframe)
  })

  it("loads the uri in a WebView", async () => {
    await render(<Iframe uri={uri} style={{ flex: 1 }} />)

    const webView = screen.getByTestId("webview")
    expect(webView).toHaveProp("source", { uri })
    expect(webView).toHaveProp("style", { flex: 1 })
  })

  it("configures the WebView like an iframe", async () => {
    await render(<Iframe uri={uri} />)

    expect(screen.getByTestId("webview").props).toMatchObject({
      javaScriptEnabled: true,
      originWhitelist: ["*"],
      limitsNavigationsToAppBoundDomains: true,
      textInteractionEnabled: false,
      setSupportMultipleWindows: false,
      showsHorizontalScrollIndicator: false,
      startInLoadingState: true,
    })
  })

  // Not `fireEvent`: it walks up to `Iframe`'s own `onLoadEnd` prop when the
  // WebView doesn't get one, so it would pass either way.
  it("hands onLoadEnd to the WebView", async () => {
    const onLoadEnd = jest.fn()
    await render(<Iframe uri={uri} onLoadEnd={onLoadEnd} />)

    expect(screen.getByTestId("webview")).toHaveProp("onLoadEnd", onLoadEnd)
  })
})
