# @bounceapp/iframe

[![Package version](https://img.shields.io/npm/v/@bounceapp/iframe?style=for-the-badge&labelColor=000000)](https://www.npmjs.com/package/@bounceapp/iframe)
[![MIT license](https://img.shields.io/badge/License-MIT-brightgreen.svg?style=for-the-badge&labelColor=000000)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-hotpink.svg?style=for-the-badge&labelColor=000000)](https://github.com/dcangulo/@bounceapp/iframe/pulls)

Iframe wrapper for React Native

## Platform Compatibility

| Android Device | Android Emulator | iOS Device | iOS Simulator | Web |
| -------------- | ---------------- | ---------- | ------------- | --- |
| ✅             | ✅               | ✅         | ✅            | ✅  |

## Documentation

[API Reference](https://bounceapp.github.io/iframe/)

## Installation

```bash
npx expo install @bounceapp/iframe react-native-webview
```

## Usage

```tsx
import React from "react"

import { Iframe } from "@bounceapp/iframe"

const App = () => (
  <Iframe uri="https://bounce.com/careers" style={{ flex: 1 }} />
)

export default App
```

## 👏 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

The source code is made available under the [MIT license](LICENSE). Some of the dependencies can be licensed differently, with the BSD license, for example.
