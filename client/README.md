# Portfolio Blog Client

A React-based portfolio and blog application built with Material-UI, featuring a personal introduction, tech stack showcase, blog carousel, and work experience timeline.

**Live Demo**: [http://portfolio-blog-michael.s3-website-ap-southeast-2.amazonaws.com](http://portfolio-blog-michael.s3-website-ap-southeast-2.amazonaws.com)

## Tech Stack

- **React** 18.2 with TypeScript
- **Material-UI (MUI)** 5.14 for UI components
- **React Router** 6.15 for routing (HashRouter for static hosting)
- **Redux** 4.2 with React-Redux for state management
- **AWS S3** for image asset hosting

## Project Structure

```
src/
├── component/        # Reusable UI components
│   ├── Header.tsx        # Fixed navigation header with smooth scroll
│   ├── Footer.tsx        # Footer with social media links
│   ├── Introduction.tsx  # Personal intro with animated entrance
│   ├── TechStack.tsx     # Tech stack cards with staggered animation
│   ├── BlogList.tsx      # Blog carousel with auto-swipe
│   ├── WorkExperience.tsx# Work history timeline
│   └── LazyImage.tsx     # Lazy loading image component
├── page/             # Page components
│   ├── MainPage.tsx      # Main landing page
│   └── BlogPage.tsx      # Blog page
├── constant/         # Application constants
│   └── index.ts          # S3 base URL and other constants
├── reducer/          # Redux reducers
├── utils/            # Utility functions and theme configuration
├── App.tsx           # Main application component with routing
└── index.tsx         # Application entry point
```

## Features

- **Responsive Design**: Adapts to desktop and mobile viewports
- **Smooth Scroll Navigation**: Header menu scrolls to page sections
- **Lazy Loading Images**: Images load only when visible with skeleton placeholders
- **Animated Entrance**: Introduction slides in from edges, tech stack fades in sequentially
- **Blog Carousel**: Auto-swipes every 5 seconds, pauses on hover, shows 3 items on desktop / 1 on mobile
- **Fixed Header**: Stays visible while scrolling

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
- **Tertiary**: #F5F5F5
- **Info**: #6B728E

## Assets

Images are hosted on AWS S3 at:
```
https://portfolio-blog-michael.s3.ap-southeast-2.amazonaws.com/assets/
```

Asset structure:
- `/icons/` - Tech stack SVG icons
- `/profile/small/` - Profile picture
- `/company/small/` - Company logos
- `/blog/*/small/` - Blog thumbnails

## Credits

- Tech stack icons are downloaded from [TechIcons.dev](https://techicons.dev/)
