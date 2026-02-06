# Portfolio Blog Server

A Node.js Express API server that provides data endpoints for the Portfolio Blog application.

## Tech Stack

- **Node.js** with TypeScript
- **Express** 4.21 for REST API framework
- **CORS** for cross-origin resource sharing
- **dotenv** for environment variable management

## Project Structure

```
src/
├── data/                 # JSON data files
│   ├── profile.json          # Profile/introduction data
│   ├── techStack.json        # Tech stack items
│   ├── workExperience.json   # Work experience history
│   ├── blogPosts.json        # Blog post entries
│   └── footer.json           # Footer and social links data
└── index.ts              # Express server entry point
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile` | GET | Returns profile/introduction data |
| `/api/tech-stack` | GET | Returns tech stack items |
| `/api/work-experience` | GET | Returns work experience history |
| `/api/blog-posts` | GET | Returns blog post entries |
| `/api/footer` | GET | Returns footer and social links data |

## Available Scripts

### `yarn dev`

Runs the server in development mode with hot-reloading using nodemon at [http://localhost:5000](http://localhost:5000).

### `yarn build`

Compiles TypeScript to JavaScript in the `dist` folder.

### `yarn start`

Runs the compiled server from the `dist` folder (requires `yarn build` first).

## Environment Variables

Create a `.env` file in the server root:

```
PORT=5000
```

## Development

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn dev
   ```

3. The server will be available at `http://localhost:5000`

## Data Format

All endpoints return JSON data. Image paths in the response are relative and should be prefixed with the S3 base URL on the client side:

```
https://portfolio-blog-michael.s3.ap-southeast-2.amazonaws.com/assets/
```
