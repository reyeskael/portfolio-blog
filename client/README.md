# Portfolio Blog Client

A React-based portfolio and blog application built with Material-UI, featuring a personal introduction, tech stack showcase, blog carousel, work experience timeline, and markdown blog rendering.

**Live Demo**: [http://portfolio-blog-michael.s3-website-ap-southeast-2.amazonaws.com](http://portfolio-blog-michael.s3-website-ap-southeast-2.amazonaws.com)

## Tech Stack

- **React** 19.1 with TypeScript 5.9
- **Material-UI (MUI)** 7.3 for UI components
- **React Router** 7.5 for routing
- **Redux** 5.0 with React-Redux 9.2 for state management
- **Axios** 1.13 for API requests
- **React Markdown** 10.1 for blog content rendering
- **AWS S3** for image asset hosting

## Project Structure

```
src/
├── component/            # Reusable UI components
│   ├── Header.tsx            # Fixed navigation header with smooth scroll
│   ├── Footer.tsx            # Footer with social media links
│   ├── Introduction.tsx      # Personal intro with animated entrance
│   ├── TechStack.tsx         # Tech stack cards with staggered animation
│   ├── BlogList.tsx          # Blog carousel with auto-swipe
│   ├── WorkExperience.tsx    # Work history timeline
│   ├── LazyImage.tsx         # Lazy loading image component
│   └── MarkdownRenderer.tsx  # Reusable markdown content renderer
├── page/                 # Page components
│   ├── MainPage.tsx          # Main landing page
│   └── BlogPage.tsx          # Blog page with markdown support
├── constant/             # Application constants
│   └── index.ts              # S3 base URL and API base URL
├── styles/               # Shared styles
│   └── pageStyles.ts         # Reusable page layout styles
├── reducer/              # Redux reducers
├── utils/                # Utility functions and theme configuration
│   └── cosmeticsHelper.ts    # Color palette and custom theme
├── App.tsx               # Main application component with routing
└── index.tsx             # Application entry point
```

## Features

- **Responsive Design**: Adapts to desktop and mobile viewports
- **Smooth Scroll Navigation**: Header menu scrolls to page sections
- **Lazy Loading Images**: Images load only when visible with skeleton placeholders
- **Animated Entrance**: Introduction slides in from edges, tech stack fades in sequentially
- **Blog Carousel**: Auto-swipes every 5 seconds, pauses on hover, shows 3 items on desktop / 1 on mobile
- **Fixed Header**: Stays visible while scrolling
- **Markdown Blog**: Full markdown support for blog content with styled headings, code blocks, blockquotes, and more
- **API Integration**: Fetches data from the backend server using Axios

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

## API Integration

The client fetches data from the backend server. Configure the API base URL in `src/constant/index.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:5000';
```

### Endpoints Used

- `GET /api/profile` - Profile/introduction data
- `GET /api/tech-stack` - Tech stack items
- `GET /api/work-experience` - Work experience history
- `GET /api/blog-posts` - Blog post entries
- `GET /api/footer` - Footer and social links data

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
- `/footer-icons/` - Social media icons

## Credits

- Tech stack icons are downloaded from [TechIcons.dev](https://techicons.dev/)
