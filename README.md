# Decentraland Client Web (Deep Links)

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
- CSS Modules
- Vite

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
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

- `src/components/`: React components including Home and Card
- `src/utils.ts`: Utility functions for metadata fetching and desktop client integration
- `src/assets/`: Static assets including images
- Styling using CSS Modules for component-specific styles

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

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
