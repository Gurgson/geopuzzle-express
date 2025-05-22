# GeoPuzzle Server

GeoPuzzle Server is a Node.js/Express backend for a geolocation-based puzzle game. It provides RESTful APIs and WebSocket endpoints for user authentication, track and waypoint management, game sessions, and scoreboards.

## Features

- **User Authentication**: Google OAuth 2.0 and JWT-based authentication.
- **Track Management**: Create, update, delete, and retrieve tracks with waypoints.
- **Waypoint Management**: Support for text and graphic waypoints, including file uploads.
- **Scoreboard**: Track and manage user scores and game results.
- **WebSocket Game Sessions**: Real-time game logic and scoring.
- **API Documentation**: Swagger UI available at `/api-docs`.
- **Security**: Helmet, CORS, input sanitization, and more.

## Project Structure

```
.
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config.ts
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   └── websockets/
├── public/
│   ├── tracksThumbnails/
│   └── waypoints/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or compatible MongoDB instance

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/geopuzzle-server.git
   cd geopuzzle-server
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env` and update values as needed (see `.env` for required variables).

4. **Build the project:**
   ```sh
   npm run build
   ```

5. **Run the server (development):**
   ```sh
   npm run server
   ```

## API Documentation

- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Usage

- **Authentication:**  
  - Google OAuth: `/auth/google`
  - JWT-protected routes: Use `Authorization: Bearer <token>`
- **Tracks:**  
  - `GET /api/track` — List all tracks  
  - `POST /api/track` — Create a new track  
  - `GET /api/track/:id` — Get track by ID  
  - `PATCH /api/track/:id` — Update track  
  - `DELETE /api/track/:id` — Delete track

- **Waypoints:**  
  - `POST /api/track/waypoint/text/:id` — Add text waypoint  
  - `POST /api/track/waypoint/graphic/:id` — Add graphic waypoint (file upload)  
  - `DELETE /api/track/waypoint/` — Delete waypoint

- **Scoreboard:**  
  - `GET /api/scoreboard` — List all scores  
  - `DELETE /api/scoreboard/:id` — Truncate scoreboard for a track

- **WebSocket Game:**  
  - Connect to `ws://<host>/game` for real-time game sessions.

## Environment Variables

See `.env` for all required variables, including:

- `PORT`
- `NODE_ENV`
- `DB_URL`
- `DB_PASS`
- `TRACK_DEFAULT_THUMBNAIL`
- `JWT_SECRET`
- `JWT_ISSUER`
- `JWT_AUDIENCE`
- `OAUTH20_GOOGLE_SECRET`
- `OAUTH20_GOOGLE_CLIENT`

## Development

- **Nodemon** is configured for hot-reloading in development.
- **Jest** is set up for testing (add your tests in the `src/` directory).

## License

This project is licensed under the ISC License.

---

**Contact:**  
For questions or support, please open an issue or contact the maintainer.
