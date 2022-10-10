import { WebView } from "react-native-webview"

import { IframeProps } from "./types"

const Iframe = ({ uri, style, onLoadEnd }: IframeProps) => (
  <WebView
    source={{ uri }}
    style={style}
    javaScriptEnabled
    onLoadEnd={onLoadEnd}
    originWhitelist={["*"]}
    limitsNavigationsToAppBoundDomains
    textInteractionEnabled={false}
    setSupportMultipleWindows={false}
    showsHorizontalScrollIndicator={false}
    startInLoadingState
  />
)

export { Iframe }
