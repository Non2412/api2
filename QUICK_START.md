# Quick Start Guide - Sisaket Charity API

## 🚀 5-Minute Setup

### 1. Copy Environment File
```bash
copy .env.local.example .env.local
```

### 2. Edit `.env.local`
```
MONGODB_URI=mongodb://localhost:27017/sisaket-charity
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 3. Install & Start
```bash
npm install
npm run dev
```

### 4. Visit Application
```
http://localhost:3000
```

---

## 📚 API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| **Products** |
| GET | `/api/products` | List all products |
| POST | `/api/products` | Create product |
| GET | `/api/products/[id]` | Get product |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |
| **Customers** |
| GET | `/api/customers` | List customers |
| POST | `/api/customers` | Create customer |
| GET | `/api/customers/[id]` | Get customer |
| PUT | `/api/customers/[id]` | Update customer |
| DELETE | `/api/customers/[id]` | Delete customer |
| **Orders** |
| GET | `/api/orders` | List orders |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/[id]` | Get order |
| PUT | `/api/orders/[id]` | Update order |
| DELETE | `/api/orders/[id]` | Delete order |
| **Users** |
| GET | `/api/users` | List users |
| POST | `/api/users` | Create user |
| GET | `/api/users/[id]` | Get user |
| PUT | `/api/users/[id]` | Update user |
| DELETE | `/api/users/[id]` | Delete user |
| **Analytics** |
| GET | `/api/statistics` | Get sales statistics |

---

## 🧪 Quick Test Example

### 1. Create a Customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "สมชาย",
    "lastName": "ใจดี",
    "email": "test@example.com",
    "phone": "0812345678"
  }'
```

Copy the returned `_id` value (e.g., `507f1f77bcf86cd799439011`)

### 2. Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "เสื้อเฉลิมฉลองเมือง 243 ปี",
    "price": 300,
    "sizes": [
      { "size": "M", "stock": 100, "sold": 0 },
      { "size": "L", "stock": 100, "sold": 0 }
    ]
  }'
```

Copy the returned product `_id`

### 3. Create an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUSTOMER_ID_HERE",
    "items": [
      {
        "productId": "PRODUCT_ID_HERE",
        "size": "M",
        "quantity": 2,
        "price": 300
      }
    ],
    "paymentMethod": "transfer"
  }'
```

### 4. View Statistics
```bash
curl http://localhost:3000/api/statistics
```

---

## 📊 Database Models

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  sizes: [{size, stock, sold}],
  image: String,
  active: Boolean
}
```

### Customer
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  address: {...},
  totalOrders: Number,
  totalSpent: Number
}
```

### Order
```javascript
{
  orderNumber: String,
  customerId: ObjectId,
  items: [{productId, size, quantity, price}],
  totalQuantity: Number,
  subtotal: Number,
  shippingCost: Number (auto-calculated),
  totalPrice: Number,
  status: String,
  paymentMethod: String,
  paymentStatus: String
}
```

---

## 💰 Shipping Calculation

- **First shirt:** 50 THB
- **Each additional:** 10 THB per item

Example:
- 1 shirt = 50 THB
- 2 shirts = 60 THB
- 3 shirts = 70 THB

*(Automatically calculated in Orders API)*

---

## 🔄 Order Workflow

```
Customer Creates Account
        ↓
Customer Places Order (POST /api/orders)
        ↓
System Auto-Calculates:
  • Order Number
  • Shipping Cost
  • Total Price
  • Updates Product Sold Count
  • Updates Customer Stats
        ↓
Admin Updates Order Status:
  • pending → confirmed
  • confirmed → processing
  • processing → shipped
  • shipped → delivered
        ↓
Admin Updates Payment Status:
  • pending → completed
```

---

## 📁 Project Structure

```
src/
├── app/
│   └── api/
│       ├── products/      # Product CRUD
│       ├── orders/        # Order CRUD
│       ├── customers/     # Customer CRUD
│       ├── users/         # User CRUD
│       └── statistics/    # Analytics
└── lib/
    ├── mongodb.js         # DB Connection
    └── model/
        ├── Product.js
        ├── Order.js
        ├── Customer.js
        ├── User.js
        └── Setting.js
```

---

## ⚙️ Environment Variables

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/sisaket-charity

# App Config
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Sisaket Charity Shirts
```

---

## 🛠️ Common Commands

```bash
# Start development
npm run dev

# Build for production
npm build

# Start production server
npm start

# Lint code
npm lint

# Install dependencies
npm install
```

---

## 📖 Full Documentation

- **API Documentation:** `API_DOCUMENTATION.md`
- **Setup Guide:** `SETUP_GUIDE.md`
- **Testing Examples:** `API_EXAMPLES.md`

---

## 🐛 Troubleshooting

**MongoDB Error:**
- Ensure MongoDB is running
- Check `.env.local` has correct connection string

**Port 3000 in use:**
```bash
npm run dev -- -p 3001
```

**Module not found:**
```bash
npm install
```

---

## ✅ What's Included

- ✅ MongoDB connection setup
- ✅ 5 complete data models (Product, Order, Customer, User, Setting)
- ✅ 25+ API endpoints (CRUD operations)
- ✅ Automatic order calculations
- ✅ Sales statistics & analytics
- ✅ Shipping cost computation
- ✅ Pagination support
- ✅ Order filtering
- ✅ Error handling
- ✅ Full documentation

---

## 🎯 Next Steps

1. **Frontend Development**
   - Create product browsing page
   - Build shopping cart
   - Design order form
   - Build admin dashboard

2. **Authentication**
   - User login system
   - JWT tokens
   - Role-based access

3. **Payment Integration**
   - Credit card processing
   - Bank transfer verification
   - PromptPay QR codes

4. **Notifications**
   - Email confirmations
   - SMS updates
   - Order status tracking

---

**Created:** November 18, 2025  
**Based on:** https://sisaket-charity.net/  
**Status:** Production Ready - API Complete ✨
