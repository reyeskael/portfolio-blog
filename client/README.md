# Portfolio Blog Client

A React-based portfolio and blog application built with Material-UI.

## Tech Stack

- **React** 18.2 with TypeScript
- **Material-UI (MUI)** 5.14 for UI components
- **React Router** 6.15 for routing
- **Redux** 4.2 with React-Redux for state management
- **date-fns** for date utilities

## Project Structure

```
src/
├── component/        # Reusable UI components (Header, Footer)
├── page/             # Page components (MainPage, BlogPage)
├── reducer/          # Redux reducers
├── utils/            # Utility functions and theme configuration
├── App.tsx           # Main application component with routing
└── index.tsx         # Application entry point
```

## Available Scripts

### `yarn start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `yarn test`

Launches the test runner in interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

## Theming

The application uses a custom MUI theme defined in `src/utils/cosmeticsHelper.ts` with a custom color palette:

- **Primary**: #404258
- **Secondary**: #F5DEB3
- **Info**: #6B728E

## Components

- **Header**: Application header with navigation menu
- **Footer**: Footer with social media links (LinkedIn, GitHub, Instagram, Facebook)

## Credits

- Tech stack icons are downloaded from [TechIcons.dev](https://techicons.dev/)
