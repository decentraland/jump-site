# AI Agent Context

**Service Purpose:**

Jump Site is a Vite/React SPA served at `jump.decentraland.org` that acts as a deep-link entry point into the Decentraland Explorer. Given a position and/or realm passed as query parameters, it attempts to launch the desktop Explorer client via the `decentraland://` custom protocol URI scheme. If the desktop client is not detected as installed, it redirects the user to the download or onboarding flow.

**Key Capabilities:**

- Deep-link launch of the Decentraland desktop Explorer using the `decentraland://` custom protocol (position and realm encoded as URL search params)
- Detection of whether the desktop client is installed by monitoring window `blur` events after injecting a hidden iframe with the custom protocol URL
- Mobile detection: shows a disclaimer modal instead of attempting the deep link on mobile devices
- Two page types: `PlacesPage` (default, for Decentraland land coordinates) and `EventsPage` (for event-specific jump-in)
- Realm/world validation: checks peer health via `/about` endpoint before accepting a realm parameter; supports ENS names (`.eth`) resolved through the Places API and World Content API
- Place metadata fetching: queries the Places API for scene title, description, image, and owner
- Creator information fetching: queries the Catalyst peer API for scene deployer name, address, and avatar
- Invalid page fallback when realm validation fails
- Wallet-based authentication context (via `decentraland-connect`)
- Segment analytics tracking (click events, mobile detection, client-not-installed events)
- i18n support via `react-intl`

**Communication Pattern:**

- Pure client-side SPA (Vite, no SSR)
- No dedicated backend; all data fetched directly from external Decentraland services at runtime
- Desktop client launch uses a hidden `<iframe>` injection with a `decentraland://` URI (see `src/utils.ts: launchDesktopApp`)
- REST calls to Places API, Catalyst peer API, and World Content API via `fetch`

**Technology Stack:**

- Runtime: Node.js (Vite dev server)
- Language: TypeScript 5.2
- Frontend Framework: React 18 with React Router DOM 6
- UI Components: decentraland-ui2
- Auth: `decentraland-connect` v9
- Analytics: `@segment/analytics-next`
- i18n: `react-intl` v7
- Bot detection: `isbot` v5
- Testing: none configured (no jest/vitest setup)
- Linting: ESLint 8 + Prettier, Husky pre-commit hooks

**External Dependencies:**

- Places API (`places.decentraland.org/api`) — scene metadata (title, description, image) and world name lookup
- Catalyst Peer API (`peer.decentraland.org`) — scene deployer info (name, address, avatar) via `/about/scenes`
- World Content API (`worlds-content-server.decentraland.org/world`) — world metadata and health for ENS-based worlds
- Decentraland Events API (`events.decentraland.org/api`) — event metadata for EventsPage jump-in
- Decentraland Auth (`/auth`) — SSO authentication
- Segment — analytics

**Key Concepts:**

- **`decentraland://` protocol**: The desktop Explorer registers this custom URI scheme on install. Jump Site launches it via a hidden iframe (`launchDesktopApp` in `src/utils.ts`). A `blur` event on `window` within 500 ms is interpreted as the OS handing focus to the desktop app (client installed). If no blur is detected, the client is treated as not installed.
- **Realm vs World**: A "realm" is a Decentraland server peer identified by a URL. A "world" is a private Decentraland space identified by an ENS name (`*.eth`). Validation differs: realms are checked via the peer's `/about` endpoint; worlds are checked via the World Content API.
- **Position format**: Coordinates are expressed as `"x,y"` strings (e.g., `"0,0"`). The default position is `"0,0"` and default realm is `"main"`. These are omitted from the deep-link URL if they are at default values.
- **CardData**: The normalized shape for a place or event used by the `ResponsiveCard`/`Card` components (defined in `src/utils/cardDataTransformers.ts`). Contains id, type (`"place"` or `"event"`), title, coordinates, image, description, user_count, realm.
- **Query params**: The app reads `position` and `realm` (or `world`) from the URL search string via `useQueryParams` hook.
- **Bot/crawler handling**: The `isbot` library is used to detect crawlers. Bot requests are served a static informational response rather than the interactive jump flow.
- **Mobile modal**: On mobile devices, clicking "Jump In" shows `MobileDisclaimerModal` explaining that the desktop client is required, instead of attempting the deep link.

**Out of Scope:**

- No blog, marketplace, DAO, or other Decentraland product pages
- No server-side rendering or SEO pre-rendering
- No user profile editing or wallet transaction signing
- No content management; all content is fetched live from APIs
- No event creation or place management

**Project Structure:**

```
src/
  components/
    Card/               Scene/event info card (desktop)
    MobileCard/         Mobile variant of the scene card
    ResponsiveCard/     Switches between Card and MobileCard by breakpoint
    JumpInButton/       Button that triggers the decentraland:// deep link or shows mobile modal
    DownloadButton/     Redirects to download page when client not installed
    DownloadModal/      Modal shown when client is not detected
    MobileDisclaimerModal/ Modal shown on mobile devices
    LinkButton/         Generic external link button
    ShareLinkButton/    Copy-to-clipboard share button
    Navbar/             Top navigation bar
    Footer/             Footer with social links
    Layout/             Page shell (Outlet wrapper)
    MainPageContainer/  Styled page container
    TextWrapper/        Text layout helper
    Icons/              SVG icon components
    Pages/
      PlacesPage/       Default page: fetches place data and shows jump-in card
      EventsPage/       Events-specific jump-in page
      InvalidPage/      Shown when realm validation fails
  contexts/
    analytics/          Segment analytics context and provider
    auth/               AuthProvider (decentraland-connect wallet auth)
    locale/             Locale context for react-intl
  hooks/
    useAnalytics.ts     Segment track/identify helpers
    useAuthenticatedFetch.ts  Fetch wrapper with auth headers
    useFormatMessage.ts react-intl message formatter
    usePageTracking.ts  Route change analytics
    useQueryParams.ts   Reads position/realm from URL params
    useRealmValidation.ts  Validates realm URL or ENS world name
    useRequireAuth.ts   Redirects to login if not authenticated
  config/
    env/               dev.json, prd.json (per-environment variables)
    index.ts           config accessor
  intl/                i18n message files
  utils.ts             launchDesktopApp, queryData, isPeerHealthy, isEns
  Routes.tsx           React Router route definitions
  main.tsx             App entry point
```

**Configuration:**

Key environment variables (defined in `src/config/env/dev.json` and `prd.json`):

| Variable | Purpose |
|---|---|
| `JUMP_IN_URL` | Base URL for this site (used in share links) |
| `PEER_URL` | Decentraland Catalyst peer URL |
| `PLACES_URL` | Places web app URL |
| `PLACES_API_URL` | Places REST API base URL |
| `EVENTS_URL` | Events web app URL |
| `EVENTS_API_URL` | Events REST API base URL |
| `WORLD_CONTENT_API_URL` | World Content Server API base URL |
| `AUTH_URL` | Decentraland SSO auth URL |
| `ONBOARDING_URL` | New-user onboarding redirect URL |
| `DOWNLOAD_URL` | Desktop client download page URL |
| `HOME_URL` | Decentraland homepage URL |
| `CHAIN_ID` | EVM chain ID (1 = mainnet, 11155111 = Sepolia testnet) |

**Testing:**

No test framework is configured in this project. There are no `jest.config` or `vitest.config` files. Linting is enforced via ESLint and Husky pre-commit hooks.
