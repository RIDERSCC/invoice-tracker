# Invoice Tracker API

A RESTful backend API for managing clients and invoices, built with Node.js, Express, and MySQL. Built as a hands-on project while transitioning from a PHP/Laravel background into the Node.js ecosystem.

## Features

- Full CRUD for Clients and Invoices
- Relational data model (one Client has many Invoices) with eager loading
- JWT-based authentication (signup/login)
- Password hashing with bcrypt
- Role-based access control (`admin` vs `staff` permissions)
- Request validation with Joi (rejects invalid data with clear error messages)
- Environment-based configuration (`.env`) — no secrets in source code

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Auth:** JSON Web Tokens (jsonwebtoken), bcrypt for password hashing

## Project Structure

```
invoice-tracker/
├── config/          # Database connection setup
├── models/          # Sequelize models (Client, Invoice, User) + associations
├── controllers/      # Business logic for each resource
├── routes/          # Express route definitions
├── middleware/       # Auth middleware (JWT verification, role checks)
├── server.js         # Application entry point
└── .env.example      # Template for required environment variables
```

## Setup

1. Clone the repo
   ```bash
   git clone <your-repo-url>
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
   node server.js
   ```
   Tables are created automatically on first run via Sequelize's `sync()`.

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
| GET | `/clients` | List all clients | Yes |
| POST | `/clients` | Create a client | Yes |
| PUT | `/clients/:id` | Update a client | Yes |
| DELETE | `/clients/:id` | Delete a client | Yes (admin only) |
| GET | `/clients/:clientId/invoices` | Get a client with all their invoices | Yes |

### Invoices
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/invoices` | List all invoices | Yes |
| POST | `/invoices` | Create an invoice | Yes |
| PUT | `/invoices/:id` | Update an invoice | Yes |
| DELETE | `/invoices/:id` | Delete an invoice | Yes (admin only) |

Protected routes require an `Authorization: Bearer <token>` header, obtained from `/auth/login`.

## What This Project Demonstrates

- REST API design with proper HTTP status codes (200/201/204/401/403/404)
- Relational modeling and eager loading with Sequelize associations
- Secure authentication: password hashing, JWT issuance/verification, stateless auth
- Middleware-based authorization (route protection + role-based access)
- Separation of concerns (routes / controllers / models / middleware)
- Environment-based secret management

## Roadmap

- [ ] Centralized error-handling middleware
- [ ] Pagination on list endpoints
- [ ] Deployment (Render/Railway)
- [ ] Optional: React frontend
