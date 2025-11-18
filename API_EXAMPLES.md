# Testing API Examples

This file contains practical examples for testing the Sisaket Charity Shirts API.

## Prerequisites

- Application running at: `http://localhost:3000`
- MongoDB connected and running

## Example Data

### Customer Creation

**Request:**
```json
POST http://localhost:3000/api/customers
Content-Type: application/json

{
  "firstName": "สมชาย",
  "lastName": "ใจดี",
  "email": "somchai123@example.com",
  "phone": "0812345678",
  "address": {
    "fullName": "สมชาย ใจดี",
    "phoneNumber": "0812345678",
    "street": "123 หมู่ 1 ถ.สุขภัยนี",
    "district": "เมืองศรีสะเกษ",
    "province": "ศรีสะเกษ",
    "postalCode": "33000",
    "country": "Thailand"
  }
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "สมชาย",
    "lastName": "ใจดี",
    "email": "somchai123@example.com",
    "phone": "0812345678",
    "address": {
      "fullName": "สมชาย ใจดี",
      "phoneNumber": "0812345678",
      "street": "123 หมู่ 1 ถ.สุขภัยนี",
      "district": "เมืองศรีสะเกษ",
      "province": "ศรีสะเกษ",
      "postalCode": "33000",
      "country": "Thailand"
    },
    "totalOrders": 0,
    "totalSpent": 0,
    "status": "active",
    "createdAt": "2025-11-18T10:30:00.000Z",
    "updatedAt": "2025-11-18T10:30:00.000Z"
  }
}
```

### Product Creation

**Request:**
```json
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "เสื้อเฉลิมฉลองเมือง 243 ปี",
  "description": "เสื้อสู่ขวัญบ้าน บายศรีเมือง รุ่งเรือง 243 ปี - รุ่นปกติ",
  "price": 300,
  "sizes": [
    { "size": "XS", "stock": 50, "sold": 0 },
    { "size": "S", "stock": 100, "sold": 0 },
    { "size": "M", "stock": 150, "sold": 0 },
    { "size": "L", "stock": 120, "sold": 0 },
    { "size": "XL", "stock": 80, "sold": 0 },
    { "size": "XXL", "stock": 40, "sold": 0 }
  ],
  "image": "https://sisaket-charity.net/static/assets/img/logos/shirt_243_black.jpg",
  "active": true
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "เสื้อเฉลิมฉลองเมือง 243 ปี",
    "description": "เสื้อสู่ขวัญบ้าน บายศรีเมือง รุ่งเรือง 243 ปี - รุ่นปกติ",
    "price": 300,
    "sizes": [
      { "_id": "60d7a1b1a1a1a1a1a1a1a1a", "size": "XS", "stock": 50, "sold": 0 },
      { "_id": "60d7a1b1a1a1a1a1a1a1a1b", "size": "S", "stock": 100, "sold": 0 },
      { "_id": "60d7a1b1a1a1a1a1a1a1a1c", "size": "M", "stock": 150, "sold": 0 },
      { "_id": "60d7a1b1a1a1a1a1a1a1a1d", "size": "L", "stock": 120, "sold": 0 },
      { "_id": "60d7a1b1a1a1a1a1a1a1a1e", "size": "XL", "stock": 80, "sold": 0 },
      { "_id": "60d7a1b1a1a1a1a1a1a1a1f", "size": "XXL", "stock": 40, "sold": 0 }
    ],
    "image": "https://sisaket-charity.net/static/assets/img/logos/shirt_243_black.jpg",
    "active": true,
    "createdAt": "2025-11-18T10:35:00.000Z",
    "updatedAt": "2025-11-18T10:35:00.000Z"
  }
}
```

### Order Creation

**Request:**
```json
POST http://localhost:3000/api/orders
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
    "address": "123 หมู่ 1 ถ.สุขภัยนี",
    "district": "เมืองศรีสะเกษ",
    "province": "ศรีสะเกษ",
    "postalCode": "33000",
    "country": "Thailand"
  }
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "orderNumber": "ORD-20251118-00001",
    "customerId": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "สมชาย",
      "lastName": "ใจดี",
      "email": "somchai123@example.com",
      "phone": "0812345678"
    },
    "items": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "productId": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "เสื้อเฉลิมฉลองเมือง 243 ปี",
          "price": 300
        },
        "size": "M",
        "quantity": 2,
        "price": 300
      }
    ],
    "totalQuantity": 2,
    "subtotal": 600,
    "shippingCost": 60,
    "totalPrice": 660,
    "status": "pending",
    "paymentMethod": "transfer",
    "paymentStatus": "pending",
    "shippingAddress": {
      "fullName": "สมชาย ใจดี",
      "phone": "0812345678",
      "address": "123 หมู่ 1 ถ.สุขภัยนี",
      "district": "เมืองศรีสะเกษ",
      "province": "ศรีสะเกษ",
      "postalCode": "33000",
      "country": "Thailand"
    },
    "createdAt": "2025-11-18T10:40:00.000Z",
    "updatedAt": "2025-11-18T10:40:00.000Z"
  }
}
```

**Note:** The shipping cost is automatically calculated as: 50 (first item) + 10 (second item) = 60 THB

### Get Statistics

**Request:**
```
GET http://localhost:3000/api/statistics
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalOrders": 1,
      "totalCustomers": 1,
      "totalRevenue": 660,
      "totalSubtotal": 600,
      "totalShipping": 60,
      "totalQuantitySold": 2,
      "averageOrderValue": 660
    },
    "ordersByStatus": [
      {
        "_id": "pending",
        "count": 1,
        "totalValue": 660
      }
    ],
    "sizeDistribution": [
      {
        "_id": "M",
        "count": 2
      }
    ],
    "paymentMethods": [
      {
        "_id": "transfer",
        "count": 1,
        "totalValue": 660
      }
    ],
    "topCustomers": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "สมชาย",
        "lastName": "ใจดี",
        "email": "somchai123@example.com",
        "totalOrders": 1,
        "totalSpent": 660
      }
    ]
  }
}
```

## Common Error Responses

### Duplicate Email (Customer)
**Request:**
```json
POST http://localhost:3000/api/customers
Content-Type: application/json

{
  "firstName": "กัญญา",
  "lastName": "สุขสวัสดิ์",
  "email": "somchai123@example.com",
  "phone": "0898765432"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "E11000 duplicate key error collection: sisaket-charity.customers index: email_1 dup key: { email: \"somchai123@example.com\" }"
}
```

### Missing Required Field
**Request:**
```json
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "เสื้อสีฟ้า"
  // Missing price
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "Product validation failed: price: Please provide a price"
}
```

### Not Found
**Request:**
```
GET http://localhost:3000/api/orders/507f1f77bcf86cd799439999
```

**Response (Error - 404):**
```json
{
  "success": false,
  "error": "Order not found"
}
```

## Order Update Example

**Request:**
```json
PUT http://localhost:3000/api/orders/507f1f77bcf86cd799439013
Content-Type: application/json

{
  "status": "confirmed",
  "paymentStatus": "completed",
  "notes": "ชำระเงินผ่าน PromptPay แล้ว"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "orderNumber": "ORD-20251118-00001",
    "status": "confirmed",
    "paymentStatus": "completed",
    "notes": "ชำระเงินผ่าน PromptPay แล้ว",
    // ... other order fields
    "updatedAt": "2025-11-18T10:45:00.000Z"
  }
}
```

## Filtering Orders Example

**Request:**
```
GET http://localhost:3000/api/orders?status=confirmed&customerId=507f1f77bcf86cd799439011
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    // Orders that match the filter
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

## Pagination Example

**Request:**
```
GET http://localhost:3000/api/customers?page=2&limit=5
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    // 5 customer records
  ],
  "pagination": {
    "page": 2,
    "limit": 5,
    "total": 12,
    "pages": 3
  }
}
```

## Testing Tools

### Using VS Code REST Client Extension

Create a file named `test.http`:

```http
### Create Customer
POST http://localhost:3000/api/customers
Content-Type: application/json

{
  "firstName": "สมชาย",
  "lastName": "ใจดี",
  "email": "somchai@test.com",
  "phone": "0812345678"
}

### Get All Customers
GET http://localhost:3000/api/customers

### Get Statistics
GET http://localhost:3000/api/statistics
```

Then click "Send Request" to test endpoints.

---

**Last Updated:** November 18, 2025
