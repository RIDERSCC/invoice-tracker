# Invoice Tracker API

A RESTful backend API for managing clients and invoices, built with Node.js, Express, and MySQL. Built as a hands-on project while transitioning from a PHP/Laravel background into the Node.js ecosystem.

## Features

- Full CRUD for Clients and Invoices
- Relational data model (one Client has many Invoices) with eager loading
- JWT-based authentication (signup/login)
- Password hashing with bcrypt
- Role-based access control (`admin` vs `staff` permissions)
- Request validation with Joi (rejects invalid data with clear error messages)
- Centralized error handling (consistent error responses across the API)
- Pagination on list endpoints (`?page=&limit=`)
- Environment-based configuration (`.env`) — no secrets in source code

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Auth:** JSON Web Tokens (jsonwebtoken), bcrypt for password hashing
- **Validation:** Joi
- **Dev tooling:** nodemon

## Project Structure

```
invoice-tracker/
├── config/          # Database connection setup
├── models/          # Sequelize models (Client, Invoice, User) + associations
├── controllers/      # Business logic for each resource
├── routes/          # Express route definitions
├── middleware/       # Auth, validation, and centralized error-handling middleware
├── validators/       # Joi schemas for request validation
├── server.js         # Application entry point
└── .env.example      # Template for required environment variables
```

## Setup

1. Clone the repo
   ```bash
   git clone https://github.com/RIDERSCC/invoice-tracker.git
   cd invoice-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root, based on `.env.example`:
   ```
   DB_NAME=invoice_tracker
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=localhost
   JWT_SECRET=your_own_random_secret_here
   PORT=3000
   ```

4. Create the MySQL database (e.g. via phpMyAdmin or the MySQL CLI):
   ```sql
   CREATE DATABASE invoice_tracker;
   ```

5. Start the server
```bash
   npm run dev
```
   Tables are created automatically on first run via Sequelize's `sync()`. `npm run dev` uses nodemon for auto-restart on file changes; use `node server.js` for a one-off run without auto-restart.

The API will be running at `http://localhost:3000`.

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/login` | Log in, returns a JWT | No |

### Clients
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/clients?page=&limit=` | List clients (paginated) | Yes |
| POST | `/clients` | Create a client | Yes |
| PUT | `/clients/:id` | Update a client | Yes |
| DELETE | `/clients/:id` | Delete a client | Yes (admin only) |
| GET | `/clients/:clientId/invoices` | Get a client with all their invoices | Yes |

### Invoices
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/invoices?page=&limit=` | List invoices (paginated) | Yes |
| POST | `/invoices` | Create an invoice | Yes |
| PUT | `/invoices/:id` | Update an invoice | Yes |
| DELETE | `/invoices/:id` | Delete an invoice | Yes (admin only) |

Protected routes require an `Authorization: Bearer <token>` header, obtained from `/auth/login`.
All errors are returned as `{ "error": "message" }` with an appropriate HTTP status code (400, 401, 403, 404, 422, or 500), via centralized error-handling middleware.

## What This Project Demonstrates

- REST API design with proper HTTP status codes (200/201/204/400/401/403/404/422)
- Relational modeling and eager loading with Sequelize associations
- Secure authentication: password hashing, JWT issuance/verification, stateless auth
- Middleware-based authorization (route protection + role-based access)
- Centralized, consistent error handling instead of repeated try/catch logic
- Pagination for scalable list endpoints
- Separation of concerns (routes / controllers / models / middleware)
- Environment-based secret management

## Roadmap

- [x] Input validation
- [x] Centralized error-handling middleware
- [x] Pagination on list endpoints
- [ ] MongoDB-backed feature (Mongoose alongside MySQL)
- [ ] Deployment (Render/Railway)
- [ ] Optional: React frontend
