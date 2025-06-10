# RESTful API with In-Memory Storage

## Overview

This project implements a RESTful API with complete CRUD operations using Express.js. It uses in-memory data storage to maintain product information and demonstrates standard REST endpoints for managing resources.

## Features

- Complete CRUD operations (Create, Read, Update, Delete)
- In-memory data storage implementation
- RESTful API design with proper status codes
- Detailed response metadata
- JSON request/response format

## Code Structure

- `server.js` - Entry point for the application
- `app/index.js` - Express application setup
- `app/routes/index.js` - Main router configuration
- `app/routes/products.js` - Products resource endpoints

## Running the Project

To run the server:

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Root Endpoint

- `GET /` - Returns "Service is up" message

### API Root

- `GET /api` - Returns API status

### Products Endpoints

- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve a specific product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product by ID
- `DELETE /api/products/:id` - Delete a product by ID

## Request and Response Examples

### Get All Products

```
GET http://localhost:3000/api/products
```

Response:

```json
{
  "message": "Get all products",
  "count": 3,
  "data": [
    { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" },
    { "id": 2, "name": "Smartphone", "price": 800, "category": "Electronics" },
    { "id": 3, "name": "Headphones", "price": 150, "category": "Accessories" }
  ],
  "metadata": {
    "hostname": "localhost",
    "method": "GET"
  }
}
```

### Get Product by ID

```
GET http://localhost:3000/api/products/1
```

Response:

```json
{
  "message": "GET product with ID 1",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 1200,
    "category": "Electronics"
  },
  "metadata": {
    "hostname": "localhost",
    "method": "GET"
  }
}
```

### Create New Product

```
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Monitor",
  "price": 300,
  "category": "Electronics"
}
```

Response:

```json
{
  "message": "Product created",
  "data": {
    "id": 4,
    "name": "Monitor",
    "price": 300,
    "category": "Electronics"
  },
  "metadata": {
    "hostname": "localhost",
    "method": "POST"
  }
}
```

### Update Product

```
PUT http://localhost:3000/api/products/2
Content-Type: application/json

{
  "name": "Smartphone Pro",
  "price": 1000,
  "category": "Electronics"
}
```

Response:

```json
{
  "message": "Updated product with ID 2",
  "data": {
    "id": 2,
    "name": "Smartphone Pro",
    "price": 1000,
    "category": "Electronics"
  },
  "metadata": {
    "hostname": "localhost",
    "method": "PUT"
  }
}
```

### Delete Product

```
DELETE http://localhost:3000/api/products/3
```

Response:

```json
{
  "message": "Deleted product with ID 3",
  "data": {
    "id": 3,
    "name": "Headphones",
    "price": 150,
    "category": "Accessories"
  },
  "metadata": {
    "hostname": "localhost",
    "method": "DELETE"
  }
}
```

## Implementation Details

### In-Memory Data Storage

The application uses an in-memory array to store product data. This data persists only for the lifetime of the server process. In a production environment, this would be replaced with a database.

### Response Format

All API responses follow a consistent format:

- `message`: Description of the operation result
- `data`: The requested resource data (when applicable)
- `metadata`: Additional information about the request
