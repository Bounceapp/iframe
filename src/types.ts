import type { WebViewProps } from "react-native-webview"

export type IframeProps = {
  onLoadEnd?: () => void
  uri: string
  style?: WebViewProps["style"]
}
