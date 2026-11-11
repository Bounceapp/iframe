# CLAUDE.md

`@bounceapp/iframe`: one `Iframe` component that renders `react-native-webview`'s `WebView` on iOS/Android and a sandboxed DOM `<iframe>` on web, behind a shared `uri` / `style` / `onLoadEnd` API.

## Commands (pnpm only)

```sh
pnpm typecheck
pnpm lint        # lint:fix to autofix
pnpm test        # add --selectProjects iOS|Android|Web for one platform
pnpm dev:docs    # Storybook on http://localhost:6006
pnpm example web # Expo example app; also: example ios, example android
```

## Testing changes

Always test changes in `src/` in Storybook. Start it with `pnpm dev:docs` and keep it running: the `storybook` MCP server in `.mcp.json` is served by it at `http://localhost:6006/mcp`.

Storybook only covers web. To test on Expo web, iOS and Android, use the example app in `example/` (it imports the library from `src/` and runs in Expo Go): `pnpm example web`, `pnpm example ios`, `pnpm example android`.

## Notes

- `Iframe.native.tsx` is the native implementation, `Iframe.tsx` the web one; shared props live in `types.ts`.
- Tests sit next to the source: `*.native.test.tsx` runs on iOS + Android, `*.web.test.tsx` on web, `*.test.tsx` on all.
- `docs/` and `lib/` are build output; don't edit them by hand.
- Commits follow Conventional Commits.
