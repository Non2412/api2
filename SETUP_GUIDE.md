# Sisaket Charity Shirts - Complete Setup Guide

## Project Overview

This is a Next.js application for managing a charity shirt selling system. The website is based on the sisaket-charity.net platform that sells commemorative shirts (เสื้อเฉลิมฉลองเมือง 243 ปี) to raise funds for community events.

## What Has Been Created

### 1. **Database Models** (MongoDB with Mongoose)

- **Product** - Shirt products with sizes, prices, and inventory
- **Order** - Customer orders with automatic calculations (shipping, totals)
- **Customer** - Customer information and order history
- **User** - Admin/staff user management
- **Setting** - Application configuration settings

### 2. **Complete REST API Endpoints**

#### Products API
- `GET /api/products` - List all active products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get specific product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

#### Customers API
- `GET /api/customers` - List customers (paginated)
- `POST /api/customers` - Create customer
- `GET /api/customers/[id]` - Get customer details
- `PUT /api/customers/[id]` - Update customer
- `DELETE /api/customers/[id]` - Delete customer

#### Orders API
- `GET /api/orders` - List orders (with filtering by status/customer)
- `POST /api/orders` - Create order (auto-calculates totals and shipping)
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order
- `DELETE /api/orders/[id]` - Delete order

#### Users API
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/users/[id]` - Get user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

#### Statistics API
- `GET /api/statistics` - Get comprehensive sales analytics

### 3. **Special Features**

**Smart Order Calculation:**
- Automatic order number generation (format: ORD-YYYYMMDD-#####)
- Automatic shipping cost calculation:
  - First shirt: 50 THB
  - Each additional shirt: 10 THB
- Automatic subtotal and total calculation
- Updates customer order count and total spent

**Size Management:**
- Support for sizes: XS, S, M, L, XL, XXL
- Tracks inventory per size
- Records sold quantity per size

**Statistics Dashboard:**
- Total orders, customers, revenue
- Orders by status breakdown
- Size distribution analytics
- Payment method analytics
- Top customers list

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or Atlas account)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/sisaket-charity

# OR for MongoDB Atlas (recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sisaket-charity?retryWrites=true&w=majority
```

### Step 3: Start the Application

```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

## Testing the API

### Using cURL

**Create a Customer:**
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Create a Product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Get All Products:**
```bash
curl http://localhost:3000/api/products
```

**Get Statistics:**
```bash
curl http://localhost:3000/api/statistics
```

### Using Postman

1. Open Postman
2. Create a new request
3. Set method to `POST` for create, `GET` for retrieve
4. Enter the URL: `http://localhost:3000/api/[endpoint]`
5. Add JSON body for POST/PUT requests
6. Click Send

### Using JavaScript Fetch

```javascript
// Create a customer
const response = await fetch('http://localhost:3000/api/customers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    email: 'somchai@example.com',
    phone: '0812345678'
  })
});

const data = await response.json();
console.log(data);
```

## Project Structure

```
sisaket-charity-nextjs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/          # Product endpoints
│   │   │   ├── orders/            # Order endpoints
│   │   │   ├── customers/         # Customer endpoints
│   │   │   ├── users/             # User endpoints
│   │   │   └── statistics/        # Analytics endpoints
│   │   ├── layout.js
│   │   └── page.js
│   └── lib/
│       ├── mongodb.js             # MongoDB connection
│       └── model/
│           ├── Product.js
│           ├── Order.js
│           ├── Customer.js
│           ├── User.js
│           └── Setting.js
├── .env.local                      # Environment variables
├── package.json
├── next.config.ts
└── README.md
```

## Database Schema Details

### Order Workflow
1. Customer places order via `POST /api/orders`
2. System automatically:
   - Generates unique order number
   - Calculates subtotal from items
   - Calculates shipping cost based on quantity
   - Calculates total price
   - Updates product sold count by size
   - Updates customer's total orders and total spent

### Customer Statistics
The system automatically tracks:
- `totalOrders` - Number of orders placed
- `totalSpent` - Total amount spent across all orders
- Updated on every new order

### Payment Methods Supported
- cash - Pay in cash
- transfer - Bank transfer
- credit_card - Credit card payment
- qr_code - QR code payment (PromptPay)

### Order Status Values
- pending - Order awaiting confirmation
- confirmed - Order confirmed by seller
- processing - Being processed for shipment
- shipped - Already shipped
- delivered - Delivered to customer
- cancelled - Order cancelled

## API Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { /* actual data */ },
  "pagination": { /* optional pagination info */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Pagination

List endpoints support pagination:

```bash
GET /api/orders?page=1&limit=10
GET /api/customers?page=2&limit=20
```

Response includes:
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

## Filtering

Orders can be filtered:

```bash
# Filter by status
GET /api/orders?status=delivered

# Filter by customer
GET /api/orders?customerId=507f1f77bcf86cd799439011

# Combine with pagination
GET /api/orders?status=pending&page=1&limit=10
```

## Next Steps

1. **Frontend Development** - Create React components for:
   - Product browsing and shopping cart
   - Order creation and management
   - Customer dashboard
   - Admin statistics dashboard

2. **Authentication** - Implement:
   - User login system
   - JWT token authentication
   - Role-based access control

3. **Email Notifications** - Add:
   - Order confirmation emails
   - Shipping notification emails
   - Payment receipt emails

4. **Payment Integration** - Connect to:
   - Omise or Stripe for credit card payments
   - PromptPay QR code generation
   - Bank transfer verification

5. **Admin Dashboard** - Build interface for:
   - Managing products
   - Processing orders
   - Viewing statistics
   - Managing users

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or connection string is correct
- Check `.env.local` has correct `MONGODB_URI`

**Port Already in Use:**
```bash
npm run dev -- -p 3001
```

**Database Errors:**
- Check that all required fields are provided in request body
- Verify email uniqueness for Customer and User models
- Ensure ObjectIds are valid for references

## Support & Contact

For issues or questions about this API implementation, refer to:
- MongoDB Documentation: https://docs.mongodb.com/
- Next.js Documentation: https://nextjs.org/docs
- Mongoose Documentation: https://mongoosejs.com/docs/

---

**Project:** Sisaket Charity Shirts
**Created:** November 18, 2025
**Status:** API Complete - Ready for Frontend Development
