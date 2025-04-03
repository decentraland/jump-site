# Decentraland Jump In Web (Deep Links)

A web application that serves as an entry point to the Decentraland virtual world. This application allows users to launch the Decentraland Explorer desktop client or download it if not installed.

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
  - `position`: Coordinates in the format "x,y" (defaults to "0,0")
  - `realm`: Specify a realm or world (defaults to "main")

## Technology Stack

- React
- TypeScript
- Material UI (via decentraland-ui2)
- React Router
- CSS Styled components
- Vite

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run start
```

3. Build for production:

```bash
npm run build
```

## Usage

The application can be accessed with the following URL patterns:

- For Genesis City locations:

  ```
  /?position=x,y
  ```

- For custom worlds:
  ```
  /?realm=worldname.eth
  ```

## Architecture

- `src/components/`: React components
- `src/contexts/`: React contexts
- `src/hooks/`: React hooks
- `src/utils.ts`: Utility functions for metadata fetching and desktop client integration
- `src/assets/`: Static assets including images
- Styling using `@emotion/styled` components

## Development

This project uses Vite as its build tool, providing:

- Hot Module Replacement (HMR)
- TypeScript support
- Fast development server
- Optimized production builds

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is part of the Decentraland ecosystem.
