# Freelancer Management System Backend

This project is a Freelancer Management System backend built with Node.js, Express.js, and MongoDB. It provides CRUD functionality, user authentication (JWT-based), CSV data import/export, and basic payment simulation.

## Features

JWT-based authentication for user login and access control.
CRUD operations for managing projects and payments.
### CSV Export/Import:
Export project data as CSV.
Import bulk project data from CSV.
Basic payment simulation with a mock payment system.
MongoDB used as the database to store projects and payment details.

## Run the server:

node server.js

## Environment Variables

MONGO_URI=mongodb+srv://rjparsana8:ipsUdruuRd8LdG0X@cluster0.jx4ts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=RJ_SECRET
PORT=5000

## Usage
### 1. Register a User
Endpoint: /api/auth/register
Method: POST

### 2. Login a User
Endpoint: /api/auth/login
Method: POST

### 3. Import Projects via CSV
Endpoint: /api/projects/import
Method: POST
Authorization: Bearer <jwt_token>
Body: Form-data
Key: file, Value: [Select CSV file]

### 4. Export Projects as CSV
Endpoint: /api/projects/export
Method: GET
Authorization: Bearer <jwt_token>

### 5. Create a Payment
Endpoint: /api/payments
Method: POST
Authorization: Bearer <jwt_token>

### 6. Simulate Payment (Mark Payment as Paid)
Endpoint: /api/payments/:id/pay
Replace :id with the payment ID.
Method: POST
Authorization: Bearer <jwt_token>
