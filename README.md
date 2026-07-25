# Task Manager (MEAN Stack)

A simple Task Manager application built using the **MEAN Stack** (MongoDB, Express.js, Angular, Node.js). Users can register, log in securely using JWT authentication, and manage their daily tasks.

## Features

- User Registration & Login
- JWT Authentication
- Password Encryption (bcrypt)
- Create, Read, Update & Delete Tasks
- Protected Routes
- Responsive UI with Bootstrap

## Tech Stack

- Angular
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Bootstrap

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd task-manager-frontend
npm install
ng serve
```

## API Endpoints

| Method | Endpoint |
|--------|----------|
| POST | `/api/users/register` |
| POST | `/api/users/login` |
| POST | `/api/tasks` |
| GET | `/api/tasks` |
| PUT | `/api/tasks/:id` |
| DELETE | `/api/tasks/:id` |

## Author

**Your Name**
