import React, { useEffect, useRef } from "react"

import { IframeProps } from "./types"

/**
 * ```tsx
 * import React from "react"
 *
 * import { Iframe } from "@bounce/iframe"
 *
 * const App = () => (
 *   <Iframe uri="https://usebounce.com/careers" style={{ flex: 1 }} />
 * )
 *
 * export default App
 * ```
 *
 * @category Component
 */
const Iframe = ({ uri, style, onLoadEnd }: IframeProps) => {
  const ref = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = ref.current
    if (!onLoadEnd || !iframe) return

    iframe.addEventListener("load", onLoadEnd)

    return () => {
      iframe.removeEventListener("load", onLoadEnd)
    }
  }, [ref, onLoadEnd])

  return (
    <iframe
      ref={ref}
      src={uri}
      style={style as React.CSSProperties}
      sandbox="allow-same-origin allow-scripts"
      frameBorder="0"
    />
  )
}

export { Iframe }
