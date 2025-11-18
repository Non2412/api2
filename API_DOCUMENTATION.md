# API Documentation

## Overview
This API provides endpoints for managing a charity shirt selling system. It includes products, orders, customers, users, and statistics.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Products
- **GET** `/products` - Get all active products
- **POST** `/products` - Create a new product
- **GET** `/products/[id]` - Get a specific product
- **PUT** `/products/[id]` - Update a product
- **DELETE** `/products/[id]` - Delete a product

### Customers
- **GET** `/customers` - Get all customers (paginated)
- **POST** `/customers` - Create a new customer
- **GET** `/customers/[id]` - Get a specific customer
- **PUT** `/customers/[id]` - Update a customer
- **DELETE** `/customers/[id]` - Delete a customer

### Orders
- **GET** `/orders` - Get all orders (paginated, can filter by status or customerId)
- **POST** `/orders` - Create a new order
- **GET** `/orders/[id]` - Get a specific order
- **PUT** `/orders/[id]` - Update an order
- **DELETE** `/orders/[id]` - Delete an order

### Users
- **GET** `/users` - Get all users (paginated)
- **POST** `/users` - Create a new user
- **GET** `/users/[id]` - Get a specific user
- **PUT** `/users/[id]` - Update a user
- **DELETE** `/users/[id]` - Delete a user

### Statistics
- **GET** `/statistics` - Get sales statistics and analytics

## Database Collections

### Product Schema
```javascript
{
  name: String (required),
  description: String,
  price: Number (required),
  sizes: [{
    size: String (XS, S, M, L, XL, XXL),
    stock: Number,
    sold: Number
  }],
  image: String,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Customer Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  phone: String (required),
  address: {
    fullName: String,
    phoneNumber: String,
    street: String,
    district: String,
    province: String,
    postalCode: String,
    country: String
  },
  totalOrders: Number,
  totalSpent: Number,
  status: String (active/inactive),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  orderNumber: String (unique),
  customerId: ObjectId (required, ref: Customer),
  items: [{
    productId: ObjectId (ref: Product),
    size: String (XS, S, M, L, XL, XXL),
    quantity: Number,
    price: Number
  }],
  totalQuantity: Number,
  subtotal: Number,
  shippingCost: Number,
  totalPrice: Number,
  status: String (pending/confirmed/processing/shipped/delivered/cancelled),
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    district: String,
    province: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String (cash/transfer/credit_card/qr_code),
  paymentStatus: String (pending/completed/failed),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### User Schema
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required),
  firstName: String,
  lastName: String,
  role: String (admin/staff/user),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Setting Schema
```javascript
{
  key: String (unique),
  value: Mixed,
  type: String (string/number/boolean/object),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Shipping Cost Calculation
- First item: 50 THB
- Each additional item: 10 THB per item

Example:
- 1 shirt: 50 THB
- 2 shirts: 60 THB (50 + 10)
- 3 shirts: 70 THB (50 + 10 + 10)

## Request/Response Examples

### Create a Customer
```bash
POST /api/customers
Content-Type: application/json

{
  "firstName": "สมชาย",
  "lastName": "ใจดี",
  "email": "somchai@example.com",
  "phone": "0812345678",
  "address": {
    "fullName": "สมชาย ใจดี",
    "phoneNumber": "0812345678",
    "street": "123 หมู่ 1",
    "district": "เมืองศรีสะเกษ",
    "province": "ศรีสะเกษ",
    "postalCode": "33000",
    "country": "Thailand"
  }
}
```

### Create a Product
```bash
POST /api/products
Content-Type: application/json

{
  "name": "เสื้อเฉลิมฉลองเมือง 243 ปี",
  "description": "เสื้อสู่ขวัญบ้าน บายศรีเมือง รุ่งเรือง 243 ปี",
  "price": 300,
  "sizes": [
    { "size": "S", "stock": 100, "sold": 0 },
    { "size": "M", "stock": 150, "sold": 0 },
    { "size": "L", "stock": 100, "sold": 0 },
    { "size": "XL", "stock": 80, "sold": 0 }
  ],
  "image": "https://sisaket-charity.net/static/assets/img/logos/shirt_243_black.jpg",
  "active": true
}
```

### Create an Order
```bash
POST /api/orders
Content-Type: application/json

{
  "customerId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "size": "M",
      "quantity": 2,
      "price": 300
    }
  ],
  "paymentMethod": "transfer",
  "shippingAddress": {
    "fullName": "สมชาย ใจดี",
    "phone": "0812345678",
    "address": "123 หมู่ 1",
    "district": "เมืองศรีสะเกษ",
    "province": "ศรีสะเกษ",
    "postalCode": "33000",
    "country": "Thailand"
  }
}
```

### Get Statistics
```bash
GET /api/statistics
```

Response:
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalOrders": 45,
      "totalCustomers": 30,
      "totalRevenue": 15500,
      "totalSubtotal": 14600,
      "totalShipping": 900,
      "totalQuantitySold": 50,
      "averageOrderValue": 344.44
    },
    "ordersByStatus": [
      { "_id": "delivered", "count": 35, "totalValue": 12500 },
      { "_id": "pending", "count": 10, "totalValue": 3000 }
    ],
    "sizeDistribution": [
      { "_id": "M", "count": 18 },
      { "_id": "L", "count": 15 },
      { "_id": "S", "count": 12 },
      { "_id": "XL", "count": 5 }
    ],
    "paymentMethods": [
      { "_id": "transfer", "count": 35, "totalValue": 12500 },
      { "_id": "qr_code", "count": 10, "totalValue": 3000 }
    ],
    "topCustomers": [...]
  }
}
```

## Error Handling

All endpoints return responses in the following format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/sisaket-charity
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm run dev
```

4. The API will be available at `http://localhost:3000/api`

5. Access the application at `http://localhost:3000`

## Database Initialization

To seed initial data, you can use the `/api/products` and `/api/customers` endpoints to create sample data via POST requests.

---

**Created by:** Sisaket Charity Project
**Last Updated:** 2025-11-18
