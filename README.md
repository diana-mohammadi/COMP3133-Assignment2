# COMP3133 - Assignment 2
**Student ID:** 101481507  
**Student Name:** Diana Mohammadi  
**Course:** COMP3133 - Full Stack Development  

## Sample user
email: test@example.com
password: 123456
## Project Overview

A full-stack Employee Management System built with Angular 21 on the frontend and Node.js + GraphQL on the backend. The app allows authenticated users to manage employee records — add, view, update, search, and delete employees.

---

## Tech Stack

**Frontend**
- Angular 21 (Standalone Components)
- Bootstrap 5
- Apollo GraphQL (HTTP client)
- Hosted on Vercel

**Backend**
- Node.js + Express
- Apollo Server (GraphQL)
- MongoDB + Mongoose
- JWT Authentication
- Hosted on Render

---

## Features

- User signup and login with JWT authentication
- Protected routes using Angular route guards
- View all employees in a searchable, filterable list
- Search employees by department or position
- Add a new employee with full details and profile picture URL
- View individual employee details
- Update existing employee information
- Delete an employee
- Responsive UI with Bootstrap 5
- Custom Angular directive for row hover highlight
- Custom Angular pipe for full name formatting

---

## Deployment

| Service | URL |
|--------|-----|
| Frontend (Vercel) | https://comp3133-assignment2-iota.vercel.app |
| Backend (Render) | https://comp3133-backend-41ku.onrender.com/graphql |

---

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB Atlas account (or local MongoDB)
- Angular CLI (`npm install -g @angular/cli`)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then start the server:

```bash
npm start
```

The GraphQL playground will be available at `http://localhost:4000/graphql`

### Frontend

```bash
cd frontend/101481507_comp3133_assignment2
npm install
ng serve
```

The app will be available at `http://localhost:4200`

> Make sure the backend is running before starting the frontend, or update the API URL in `src/app/services/auth.service.ts` and `src/app/services/employee.service.ts` to point to your local backend.

