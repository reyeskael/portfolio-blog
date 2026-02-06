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

### GET `/api/profile`

Returns profile/introduction data.

**Response:**
```json
{
    "name": "string",
    "greeting": "string",
    "title": "string",
    "description": "string",
    "profilePicture": "string"
}
```

### GET `/api/tech-stack`

Returns tech stack items.

**Response:**
```json
{
    "title": "string",
    "techStack": [
        {
            "name": "string",
            "icon": "string"
        }
    ]
}
```

### GET `/api/work-experience`

Returns work experience history.

**Response:**
```json
{
    "title": "string",
    "workExperience": [
        {
            "company": "string",
            "logo": "string",
            "totalDuration": "string",
            "roles": [
                {
                    "jobTitle": "string",
                    "duration": "string",
                    "description": "string"
                }
            ]
        }
    ]
}
```

### GET `/api/blog-posts`

Returns blog post entries.

**Response:**
```json
{
    "title": "string",
    "blogPosts": [
        {
            "id": "number",
            "title": "string",
            "date": "string",
            "thumbnail": "string",
            "excerpt": "string"
        }
    ]
}
```

### GET `/api/footer`

Returns footer and social links data.

**Response:**
```json
{
    "title": "string",
    "copyright": "string",
    "socialLinks": [
        {
            "name": "string",
            "url": "string",
            "icon": "string",
            "target": "string (optional)"
        }
    ]
}
```

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
