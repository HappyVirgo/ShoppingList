# Shopping List Application

A full-stack shopping list application built with React, Node.js, Express, and PostgreSQL. This application allows users to create, read, update, and delete shopping list items with a modern, responsive interface.

## Features

- ✅ Add new shopping items with name and quantity
- ✅ Mark items as completed/incomplete
- ✅ Edit existing items
- ✅ Delete items
- ✅ Real-time updates with Redux state management
- ✅ Responsive Material-UI design
- ✅ Docker containerization for easy deployment
- ✅ RESTful API with proper error handling
- ✅ PostgreSQL database with automatic migrations

## Tech Stack

### Frontend
- **React 17** - UI library
- **Redux** - State management
- **Redux-Saga** - Side effect management
- **Material-UI** - UI component library
- **TypeScript** - Type safety
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client for Node.js

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy for frontend

## Project Structure

```
shopping-list-app/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── store/           # Redux store, actions, reducers, sagas
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── Dockerfile           # Frontend Docker configuration
│   └── nginx.conf           # Nginx configuration
├── backend/                 # Node.js backend API
│   ├── database/            # Database connection and models
│   ├── middleware/          # Express middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── scripts/             # Database initialization scripts
│   └── Dockerfile           # Backend Docker configuration
├── docker-compose.yml       # Multi-container setup
└── README.md               # This file
```

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL 15+ (for local development)

## Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopping-list-app
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

## Local Development Setup

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=postgres://user:password@localhost:5432/shoppinglist
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=shoppinglist
   DB_USER=user
   DB_PASSWORD=password
   ```

4. **Start PostgreSQL database**
   ```bash
   # Using Docker
   docker run --name shopping-list-db -e POSTGRES_DB=shoppinglist -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15-alpine
   ```

5. **Run database migrations**
   ```bash
   npm run migrate
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3000

## API Endpoints

### Shopping List Items

- `GET /api/shopping-list` - Get all shopping items
- `GET /api/shopping-list/:id` - Get a specific shopping item
- `POST /api/shopping-list` - Create a new shopping item
- `PUT /api/shopping-list/:id` - Update a shopping item
- `PATCH /api/shopping-list/:id/toggle` - Toggle completion status
- `DELETE /api/shopping-list/:id` - Delete a shopping item

### Request/Response Examples

**Create Item:**
```bash
POST /api/shopping-list
Content-Type: application/json

{
  "name": "Milk",
  "description": "description",
  "quantity": 2,
  "completed": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Milk",
    "description": "description",
    "quantity": 2,
    "completed": false,
    "created_at": "2023-12-01T10:00:00.000Z",
    "updated_at": "2023-12-01T10:00:00.000Z"
  }
}
```

## Database Schema

### shopping_items table

| Column     | Type      | Description                    |
|------------|-----------|--------------------------------|
| id         | UUID      | Primary key                    |
| name       | VARCHAR   | Item name (required)           |
| description| VARCHAR   | Item Description (default: description)                   |
| quantity   | INTEGER   | Item quantity (default: 1, maximum: 3)     |
| completed  | BOOLEAN   | Completion status (default: false) |
| created_at | TIMESTAMP | Creation timestamp             |
| updated_at | TIMESTAMP | Last update timestamp          |

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-all` - Install dependencies for all packages

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Docker Commands

### Build and run all services
```bash
docker-compose up --build
```

### Run in background
```bash
docker-compose up -d --build
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f [service-name]
```

### Rebuild a specific service
```bash
docker-compose up --build [service-name]
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: /api)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change ports in docker-compose.yml or stop conflicting services

2. **Database connection failed**
   - Ensure PostgreSQL is running
   - Check database credentials in environment variables

3. **Frontend can't connect to backend**
   - Verify backend is running on correct port
   - Check CORS configuration in backend

4. **Docker build fails**
   - Ensure Docker is running
   - Check Dockerfile syntax
   - Clear Docker cache: `docker system prune -a`

### Health Checks

The application includes health check endpoints:
- Frontend: http://localhost:3000/health
- Backend: http://localhost:5000/health

### Logs

View application logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```
