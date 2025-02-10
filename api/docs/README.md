# LogiQuest API Documentation

## Overview
This documentation describes the core API endpoints for LogiQuest, a puzzle-solving game platform.

## Base URL
All API requests should be made to: `/api`

## Authentication
Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### Login
`POST /auth/login`

Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "username": "puzzlemaster"
  }
}
```

### Puzzles

#### Get All Puzzles
`GET /puzzles`

Retrieve list of available puzzles.

**Response:**
```json
[
  {
    "id": "puzzle-123",
    "title": "Logic Gate Challenge",
    "description": "Solve the logic gate puzzle",
    "difficulty": "MEDIUM"
  }
]
```

#### Get Puzzle by ID
`GET /puzzles/{id}`

Get detailed information about a specific puzzle.

**Parameters:**
- `id`: Puzzle identifier

**Response:**
```json
{
  "id": "puzzle-123",
  "title": "Logic Gate Challenge",
  "description": "Solve the logic gate puzzle",
  "difficulty": "MEDIUM"
}
```

### Progress

#### Get User Progress
`GET /progress`

Retrieve user's progress across all puzzles.

**Response:**
```json
[
  {
    "puzzleId": "puzzle-123",
    "completed": true,
    "score": 100
  }
]
```

### User Profile

#### Get Current User
`GET /users/me`

Get profile information for the current user.

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "username": "puzzlemaster"
}
```

## Error Handling

The API uses conventional HTTP response codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses follow this format:
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "errors": ["Invalid email format"]
}
```