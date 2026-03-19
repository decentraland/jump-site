# Decentraland Jump In Web (Deep Links)

[![Coverage Status](https://coveralls.io/repos/github/decentraland/jump-site/badge.svg?branch=main)](https://coveralls.io/github/decentraland/jump-site?branch=main)

A web application serving as the deep-link entry point to the Decentraland virtual world at jump.decentraland.org. Allows users to launch the Decentraland Explorer desktop client directly from a browser link, or download it if not installed.

## Table of Contents

- [Features](#features)
- [Dependencies & Related Services](#dependencies--related-services)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [AI Agent Context](#ai-agent-context)

## Features

- **World/Location Preview**: Displays preview cards for Decentraland locations, including:
  - Custom world previews (for `.eth` domains)
  - Genesis City location previews (for coordinates)
  - Location images, titles, and descriptions
- **Desktop Client Integration**:
  - Direct launch of Decentraland Explorer using custom protocol (`decentraland://`)
  - Automatic detection of installed desktop client
  - Download option for users without the desktop client installed
- **Dynamic URL Parameters**:
  - `position`: Coordinates in the format `x,y` (defaults to `0,0`)
  - `realm`: Specify a realm or world (defaults to `main`)

## Dependencies & Related Services

- **realm-provider**: provides realm information used to resolve world and location routing
- **Catalyst / worlds-content-server**: supplies scene and world metadata for preview cards
- **Explorer desktop app**: the launch target; this UI opens the Explorer via the `decentraland://` custom protocol

### What This UI Does NOT Handle

- The Explorer application itself (separate download and process)
- Content storage (Catalyst / worlds-content-server)
- Realm routing logic (realm-provider)

## Getting Started

### Prerequisites

- npm

### Installation

```bash
npm install
```

### Configuration

Create a copy of `.env.example` and name it `.env.development`:

```bash
cp .env.example .env.development
```

### Running the UI

```bash
npm run start
```

Build for production:

```bash
npm run build
```

### URL Patterns

- Genesis City location: `/?position=x,y`
- Custom world: `/?realm=worldname.eth`

## Testing

No automated tests are currently configured for this application.

## AI Agent Context

For detailed AI Agent context, see [docs/ai-agent-context.md](docs/ai-agent-context.md).

---
