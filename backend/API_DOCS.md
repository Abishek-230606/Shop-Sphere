# Shop-Sphere API Documentation

Base URL: `http://localhost:8000/api`

*Note: All endpoints currently have an intentional 2-second delay built-in to allow for frontend loading state implementations.*

---

## Products

### 1. Get All Products (with Search & Pagination)
- **URL**: `/products`
- **Method**: `GET`
- **Query Parameters (Optional)**:
  - `page` or `_page`: Page number (e.g., `1`)
  - `limit` or `_limit`: Number of items per page (e.g., `10`)
  - `search` or `q`: Search keyword to filter by product name or description
- **Example Request**: `GET http://localhost:8000/api/products?page=1&limit=10&search=headphones`
- **Response**: Array of product objects.

### 2. Get Single Product
- **URL**: `/products/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: The ID of the product
- **Example Request**: `GET http://localhost:8000/api/products/1`
- **Response**: A single product object or `{}` if not found.

---

## Contacts

### 3. Get All Contacts
- **URL**: `/contacts`
- **Method**: `GET`
- **Response**: Array of contact objects.

### 4. Submit Contact Form
- **URL**: `/contacts`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body Type** (`JSON`):
  ```json
  {
    "name": "String",
    "email": "String",
    "phone": "String",
    "subject": "String",
    "message": "String"
  }
  ```
- **Example Request**:
  ```json
  POST http://localhost:8000/api/contacts
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Inquiry",
    "message": "Hello!"
  }
  ```
- **Response Status**: `201 Created`
- **Response**: The newly created contact object containing a generated `id` and `submittedAt` timestamp.
