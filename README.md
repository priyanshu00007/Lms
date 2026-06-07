```markdown
# 🚀 Node.js Express Backend Boilerplate

A production-ready, scalable, and secure Node.js Express backend boilerplate with MongoDB, Redis, JWT authentication, file uploads, payment integration, and more.

[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D9.0.0-blue)](https://www.npmjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)
- [Available Scripts](#available-scripts)
- [Authentication Flow](#authentication-flow)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Core Features
- 🔐 **JWT Authentication** - Access & Refresh tokens with role-based access control
- 👥 **User Management** - Registration, login, profile management, password reset
- 📦 **Product Management** - CRUD operations with image upload, variants, reviews
- 🛒 **Order Management** - Shopping cart, checkout, order tracking
- 💳 **Payment Integration** - Stripe payment processing with webhooks
- 📧 **Email Service** - Welcome emails, password reset, order confirmations
- 📁 **File Upload** - AWS S3 integration with image optimization
- 📊 **Analytics** - Dashboard stats, sales reports, customer insights

### Security Features
- 🛡️ **Helmet.js** - Secure HTTP headers
- 🚦 **Rate Limiting** - API protection against brute force
- ✅ **Input Validation** - Joi schema validation
- 🔒 **XSS Protection** - Sanitize user inputs
- 🚫 **HTTP Parameter Pollution** - Prevent parameter pollution
- 🔑 **Password Hashing** - Bcrypt with salt rounds
- 📝 **Request Logging** - Morgan with Winston logger

### Performance Features
- ⚡ **Redis Caching** - Response caching for better performance
- 🗜️ **Compression** - Gzip compression for responses
- 📄 **Pagination** - Efficient data retrieval with pagination
- 🔍 **Query Building** - Advanced filtering, sorting, searching
- 🗃️ **MongoDB Indexing** - Optimized database queries

### Developer Experience
- 📝 **ESLint & Prettier** - Code quality and formatting
- 🧪 **Jest Testing** - Unit and integration tests
- 📚 **API Versioning** - v1, v2 structure ready
- 🔄 **Hot Reload** - Nodemon for development
- 📖 **Comprehensive Documentation** - API docs and code comments

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js 4.x |
| **Database** | MongoDB with Mongoose ODM |
| **Cache** | Redis with ioredis |
| **Authentication** | JWT (jsonwebtoken), Passport.js |
| **Validation** | Joi |
| **File Upload** | Multer, Sharp, AWS S3 |
| **Email** | Nodemailer |
| **Payment** | Stripe |
| **Logging** | Winston, Morgan |
| **Testing** | Jest, Supertest |
| **Security** | Helmet, CORS, Rate Limiting |
| **Linting** | ESLint, Prettier |

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MongoDB** (v6.0 or higher) - [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Redis** (v7.0 or higher) - [Download Redis](https://redis.io/download/)
- **Git** - [Download Git](https://git-scm.com/downloads)

### Optional Services
- **AWS Account** - For S3 file storage
- **Stripe Account** - For payment processing
- **SendGrid/Mailgun** - For email services
- **Docker** - For containerization

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/express-boilerplate.git
cd express-boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Open .env and update with your configurations
nano .env
```

### 4. Database Setup

```bash
# Start MongoDB (if not running)
mongod --dbpath /path/to/data/db

# Start Redis (if not running)
redis-server
```

### 5. Run the Application

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## 🔧 Environment Variables

Create a `.env` file with these essential variables:

```env
# Server
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/your_app_name

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_key_min_32_characters_long
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_SECRET=your_refresh_secret_key_different_from_above
JWT_REFRESH_EXPIRATION=7d

# Email (Optional - for testing, leave as is)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
EMAIL_FROM=noreply@yourapp.com

# AWS S3 (Optional - for file upload)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_BUCKET_NAME=

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=debug
```

## 📁 Project Structure

```
express-boilerplate/
├── src/
│   ├── config/           # Configuration files
│   │   ├── index.js      # Main config with env validation
│   │   ├── database.js   # MongoDB connection
│   │   ├── redis.js      # Redis connection & caching
│   │   ├── logger.js     # Winston logger setup
│   │   ├── email.js      # Email service config
│   │   ├── passport.js   # Passport strategies
│   │   ├── payment.js    # Stripe config
│   │   └── aws.js        # AWS S3 config
│   │
│   ├── controllers/      # Request handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── product.controller.js
│   │   ├── order.controller.js
│   │   ├── upload.controller.js
│   │   ├── payment.controller.js
│   │   └── analytics.controller.js
│   │
│   ├── middlewares/       # Custom middlewares
│   │   ├── auth.middleware.js      # JWT authentication
│   │   ├── error.middleware.js     # Error handling
│   │   ├── validate.middleware.js  # Joi validation
│   │   ├── rateLimiter.middleware.js
│   │   ├── upload.middleware.js
│   │   ├── pagination.middleware.js
│   │   └── logger.middleware.js
│   │
│   ├── models/           # Mongoose models
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   ├── category.model.js
│   │   ├── review.model.js
│   │   ├── cart.model.js
│   │   ├── coupon.model.js
│   │   ├── notification.model.js
│   │   └── token.model.js
│   │
│   ├── routes/           # API routes
│   │   ├── v1/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── admin.routes.js
│   │   │   └── index.js
│   │   └── index.js
│   │
│   ├── services/         # Business logic
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── product.service.js
│   │   ├── order.service.js
│   │   ├── category.service.js
│   │   ├── analytics.service.js
│   │   └── payment.service.js
│   │
│   ├── validations/      # Joi validation schemas
│   │   ├── auth.validation.js
│   │   ├── user.validation.js
│   │   ├── product.validation.js
│   │   └── custom.validation.js
│   │
│   ├── utils/            # Utility functions
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── catchAsync.js
│   │   ├── pick.js
│   │   ├── helpers.js
│   │   ├── generateTokens.js
│   │   ├── queryBuilder.js
│   │   ├── emailTemplates.js
│   │   ├── fileUpload.js
│   │   └── socketManager.js
│   │
│   └── app.js            # Express app setup
│
├── tests/                # Test files
│   ├── unit/
│   │   └── models/
│   ├── integration/
│   └── setup.js
│
├── logs/                 # Application logs
├── uploads/              # Local file uploads (dev)
├── postman/              # Postman collections
├── .env.example          # Environment template
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── package.json
├── server.js             # Entry point
└── README.md
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/auth/register` | Register new user | No | - |
| POST | `/auth/login` | Login user | No | - |
| POST | `/auth/refresh-token` | Refresh access token | No | - |
| POST | `/auth/forgot-password` | Send reset email | No | - |
| POST | `/auth/reset-password` | Reset password | No | - |
| POST | `/auth/verify-email` | Verify email | No | - |

### User Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/users/profile` | Get current user profile | Yes | - |
| PATCH | `/users/profile` | Update profile | Yes | - |
| PATCH | `/users/update-password` | Change password | Yes | - |
| GET | `/users` | Get all users | Yes | Admin |
| POST | `/users` | Create user | Yes | Admin |
| GET | `/users/:id` | Get user by ID | Yes | Admin |
| PATCH | `/users/:id` | Update user | Yes | Admin |
| DELETE | `/users/:id` | Delete user | Yes | Admin |

### Product Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/products` | Get all products | No | - |
| GET | `/products/:id` | Get single product | No | - |
| POST | `/products` | Create product | Yes | Admin |
| PATCH | `/products/:id` | Update product | Yes | Admin |
| DELETE | `/products/:id` | Delete product | Yes | Admin |
| POST | `/products/:id/reviews` | Add review | Yes | - |
| GET | `/products/:id/reviews` | Get reviews | No | - |

### Order Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/orders` | Create order | Yes | - |
| GET | `/orders` | Get user orders | Yes | - |
| GET | `/orders/:id` | Get order details | Yes | - |
| PATCH | `/orders/:id/status` | Update status | Yes | Admin |
| PATCH | `/orders/:id/cancel` | Cancel order | Yes | - |

### Admin Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/admin/dashboard` | Dashboard stats | Yes | Admin |
| GET | `/admin/analytics/sales` | Sales analytics | Yes | Admin |
| GET | `/admin/analytics/products` | Top products | Yes | Admin |
| GET | `/admin/analytics/customers` | Top customers | Yes | Admin |

## 🧪 Testing with Postman

### Import Postman Collection

We've included a complete Postman collection for testing all APIs.

### Collection Structure

```
📁 Express Boilerplate API
├── 📁 Authentication
│   ├── 📄 Register User
│   ├── 📄 Login User
│   ├── 📄 Refresh Token
│   ├── 📄 Forgot Password
│   ├── 📄 Reset Password
│   └── 📄 Verify Email
│
├── 📁 Users
│   ├── 📄 Get Profile
│   ├── 📄 Update Profile
│   ├── 📄 Change Password
│   ├── 📄 Get All Users (Admin)
│   ├── 📄 Get User (Admin)
│   ├── 📄 Update User (Admin)
│   └── 📄 Delete User (Admin)
│
├── 📁 Products
│   ├── 📄 Get All Products
│   ├── 📄 Get Single Product
│   ├── 📄 Create Product (Admin)
│   ├── 📄 Update Product (Admin)
│   ├── 📄 Delete Product (Admin)
│   ├── 📄 Add Review
│   └── 📄 Get Reviews
│
├── 📁 Orders
│   ├── 📄 Create Order
│   ├── 📄 Get My Orders
│   ├── 📄 Get Order Details
│   ├── 📄 Cancel Order
│   └── 📄 Update Order Status (Admin)
│
└── 📁 Admin
    ├── 📄 Dashboard Stats
    ├── 📄 Sales Analytics
    └── 📄 System Health
```

### Postman Environment Setup

Create a new environment in Postman with these variables:

```json
{
  "base_url": "http://localhost:3000/api/v1",
  "token": "",
  "refresh_token": "",
  "user_id": "",
  "product_id": "",
  "order_id": ""
}
```

### Step-by-Step Testing Guide

#### **1. Register a New User**

```http
POST {{base_url}}/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123",
  "passwordConfirm": "Password@123"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "isVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

**Postman Test Script:**
```javascript
// Save tokens for subsequent requests
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("token", response.data.tokens.accessToken);
    pm.environment.set("refresh_token", response.data.tokens.refreshToken);
    pm.environment.set("user_id", response.data.user._id);
}
```

#### **2. Login User**

```http
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Postman Test Script:**
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.data.tokens.accessToken);
    pm.environment.set("refresh_token", response.data.tokens.refreshToken);
    pm.environment.set("user_id", response.data.user._id);
    
    // Test that tokens exist
    pm.test("Tokens should exist", () => {
        pm.expect(response.data.tokens.accessToken).to.exist;
        pm.expect(response.data.tokens.refreshToken).to.exist;
    });
}
```

#### **3. Get User Profile (Authenticated)**

```http
GET {{base_url}}/users/profile
Authorization: Bearer {{token}}
```

**Postman Test Script:**
```javascript
pm.test("Should return user profile", () => {
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    pm.expect(response.data.user.email).to.eql("john@example.com");
});

pm.test("Should not contain password", () => {
    const response = pm.response.json();
    pm.expect(response.data.user.password).to.be.undefined;
});
```

#### **4. Create Product (Admin)**

First, update user role to admin (in MongoDB or create admin user):

```http
POST {{base_url}}/products
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 99.99,
  "comparePrice": 149.99,
  "category": "507f1f77bcf86cd799439012",
  "brand": "TechBrand",
  "sku": "WH-001-BLK",
  "inventory": 50,
  "specifications": [
    {
      "name": "Battery Life",
      "value": "30 hours"
    },
    {
      "name": "Bluetooth",
      "value": "5.0"
    }
  ],
  "tags": ["wireless", "headphones", "audio"],
  "isActive": true,
  "isFeatured": true
}
```

**Postman Test Script:**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("product_id", response.data.product._id);
    
    pm.test("Product created successfully", () => {
        pm.expect(response.data.product.name).to.eql("Wireless Headphones");
        pm.expect(response.data.product.price).to.eql(99.99);
    });
}
```

#### **5. Get All Products (with Filters)**

```http
GET {{base_url}}/products?page=1&limit=10&sort=-price&minPrice=50&maxPrice=200&search=headphones
```

**Postman Test Script:**
```javascript
pm.test("Should return paginated products", () => {
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    pm.expect(response.data.results).to.be.an('array');
    pm.expect(response.data.pagination).to.have.property('page');
    pm.expect(response.data.pagination).to.have.property('totalPages');
});

pm.test("Filter should work", () => {
    const response = pm.response.json();
    response.data.results.forEach(product => {
        pm.expect(product.price).to.be.above(49);
        pm.expect(product.price).to.be.below(201);
    });
});
```

#### **6. Add Product Review**

```http
POST {{base_url}}/products/{{product_id}}/reviews
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "rating": 4,
  "title": "Great headphones!",
  "review": "These headphones are amazing. The sound quality is excellent and they're very comfortable.",
  "isRecommended": true
}
```

#### **7. Create Order**

First, create a cart (not shown), then:

```http
POST {{base_url}}/orders
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  },
  "paymentMethod": "credit_card",
  "notes": "Please leave at the door"
}
```

**Postman Test Script:**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("order_id", response.data.order._id);
    
    pm.test("Order created with correct total", () => {
        const order = response.data.order;
        pm.expect(order.totalPrice).to.be.a('number');
        pm.expect(order.status).to.eql('pending');
        pm.expect(order.items).to.be.an('array');
        pm.expect(order.items.length).to.be.above(0);
    });
}
```

#### **8. Get Admin Dashboard**

```http
GET {{base_url}}/admin/dashboard
Authorization: Bearer {{token}}
```

**Postman Test Script:**
```javascript
pm.test("Should return dashboard stats", () => {
    const response = pm.response.json();
    pm.expect(response.data).to.have.property('totalOrders');
    pm.expect(response.data).to.have.property('totalRevenue');
    pm.expect(response.data).to.have.property('totalProducts');
    pm.expect(response.data).to.have.property('totalUsers');
});
```

### Postman Collection Variables

Set up these collection variables for automation:

```javascript
// Collection Pre-request Script
if (!pm.collectionVariables.get("adminToken")) {
    const loginRequest = {
        url: pm.collectionVariables.get("base_url") + "/auth/login",
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                email: "admin@example.com",
                password: "Admin@123"
            })
        }
    };
    
    pm.sendRequest(loginRequest, (err, response) => {
        if (!err) {
            const jsonResponse = response.json();
            pm.collectionVariables.set("adminToken", jsonResponse.data.tokens.accessToken);
        }
    });
}
```

### Error Testing Examples

Test various error scenarios:

```http
# 1. Invalid credentials
POST {{base_url}}/auth/login
{
  "email": "wrong@email.com",
  "password": "wrongpassword"
}
# Expected: 401 Unauthorized

# 2. Missing required fields
POST {{base_url}}/auth/register
{
  "name": "John"
}
# Expected: 400 Bad Request with validation errors

# 3. Duplicate email
POST {{base_url}}/auth/register
{
  "name": "Jane Doe",
  "email": "john@example.com",  // Already exists
  "password": "Password@123",
  "passwordConfirm": "Password@123"
}
# Expected: 400 Email already taken

# 4. Invalid token
GET {{base_url}}/users/profile
Authorization: Bearer invalid_token_here
# Expected: 401 Not authenticated

# 5. Unauthorized access (non-admin)
GET {{base_url}}/users
Authorization: Bearer {{token}}  // Regular user token
# Expected: 403 Forbidden

# 6. Product not found
GET {{base_url}}/products/507f1f77bcf86cd799439099
# Expected: 404 Product not found

# 7. Invalid MongoDB ID
GET {{base_url}}/users/invalid_id_123
# Expected: 400 Invalid ID format
```

### Postman Runner for Automated Testing

1. Create a folder structure in Postman
2. Set up collection runner:
   - Select collection
   - Set iterations: 1
   - Set delay: 100ms
   - Check "Keep variable values"
3. Run the collection to test the complete flow

**Collection Runner Order:**
```
1. Register User
2. Login User
3. Refresh Token
4. Get Profile
5. Update Profile
6. Change Password
7. Create Product (Admin)
8. Get All Products
9. Get Single Product
10. Update Product (Admin)
11. Create Review
12. Get Reviews
13. Create Order
14. Get Orders
15. Get Order Details
16. Cancel Order
17. Delete Product (Admin)
```

## 📜 Available Scripts

```bash
# Development
npm run dev           # Start development server with hot reload
npm start             # Start production server

# Testing
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:unit     # Run unit tests only
npm run test:integration # Run integration tests

# Code Quality
npm run lint          # Check code with ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format code with Prettier

# Database
npm run seed          # Seed database with sample data
npm run migrate       # Run database migrations

# Production
npm run build         # Build for production
npm run prod          # Start production server with PM2
```

## 🔐 Authentication Flow

### JWT Token Flow

1. **Register/Login** → Server returns `accessToken` (15min) + `refreshToken` (7d)
2. **API Requests** → Include `accessToken` in `Authorization: Bearer <token>`
3. **Token Expired** → Use `refreshToken` to get new `accessToken`
4. **Refresh Token Expired** → User must login again

### Role-Based Access

| Role | Permissions |
|------|-------------|
| **user** | Basic access, own profile, orders, reviews |
| **admin** | Product/User management, analytics, all orders |
| **superadmin** | Full system access, role management |
| **moderator** | Content moderation, review management |

## 🐛 Error Handling

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized / Invalid Token |
| 403 | Forbidden / Insufficient Permissions |
| 404 | Not Found |
| 409 | Conflict / Duplicate |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## 🚢 Deployment

### Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Add environment variables
4. Set build command: `npm install`
5. Set start command: `npm start`

### Deploy with Docker

```bash
# Build image
docker build -t express-boilerplate .

# Run container
docker run -p 3000:3000 --env-file .env express-boilerplate
```

### Deploy to AWS

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create production

# Deploy
eb deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- All open-source contributors

## 📞 Support

For support, email support@yourapp.com or create an issue in the repository.

---

**Made with ❤️ and JavaScript**

## 🎯 Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Copy and configure `.env` file
- [ ] Start MongoDB and Redis
- [ ] Run development server (`npm run dev`)
- [ ] Test health endpoint (`GET /health`)
- [ ] Import Postman collection
- [ ] Set up Postman environment
- [ ] Run Postman tests
- [ ] Check logs in `logs/` directory
- [ ] Review API documentation
- [ ] Start building your features!

---

## 📊 Monitoring & Logging

### Health Check
```bash
curl http://localhost:3000/health
```

### Logs Location
```
logs/
├── combined.log      # All logs
├── error.log         # Error logs
├── exceptions.log    # Uncaught exceptions
└── rejections.log    # Unhandled rejections
```

### Winston Log Levels
```javascript
logger.error('Error message');
logger.warn('Warning message');
logger.info('Info message');
logger.debug('Debug message');
```

---

## 🎉 Congratulations!

You now have a production-ready backend boilerplate. Start building your amazing application!

**Happy Coding!** 🚀
```

## **Postman Collection JSON**

Save this as `postman/express-boilerplate.postman_collection.json`:

```json
{
  "info": {
    "name": "Express Boilerplate API",
    "description": "Complete API collection for testing Express Boilerplate",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000/api/v1"
    }
  ],
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 201) {",
                  "    const response = pm.response.json();",
                  "    pm.environment.set('token', response.data.tokens.accessToken);",
                  "    pm.environment.set('refresh_token', response.data.tokens.refreshToken);",
                  "    pm.environment.set('user_id', response.data.user._id);",
                  "    ",
                  "    pm.test('Status code is 201', () => {",
                  "        pm.expect(pm.response.code).to.equal(201);",
                  "    });",
                  "    ",
                  "    pm.test('Response has tokens', () => {",
                  "        pm.expect(response.data.tokens.accessToken).to.exist;",
                  "        pm.expect(response.data.tokens.refreshToken).to.exist;",
                  "    });",
                  "}"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"Password@123\",\n  \"passwordConfirm\": \"Password@123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/auth/register",
              "host": ["{{base_url}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login User",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "if (pm.response.code === 200) {",
                  "    const response = pm.response.json();",
                  "    pm.environment.set('token', response.data.tokens.accessToken);",
                  "    pm.environment.set('refresh_token', response.data.tokens.refreshToken);",
                  "    pm.environment.set('user_id', response.data.user._id);",
                  "}"
                ]
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"Password@123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/auth/login",
              "host": ["{{base_url}}"],
              "path": ["auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/users/profile",
              "host": ["{{base_url}}"],
              "path": ["users", "profile"]
            }
          }
        }
      ]
    }
  ]
}
```

## **Setup Instructions**

### 1. Install and Run the Application

```bash
# Clone if you haven't
git clone <your-repo-url>
cd express-boilerplate

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start MongoDB (in new terminal)
mongod

# Start Redis (in new terminal)  
redis-server

# Start application
npm run dev
```

### 2. Import Postman Collection

1. Open Postman
2. Click "Import" button
3. Select the `postman/express-boilerplate.postman_collection.json` file
4. Click "Import"

### 3. Set Up Environment in Postman

1. Click "Environments" in Postman
2. Create new environment "Express Boilerplate Dev"
3. Add variables:
   - `base_url`: `http://localhost:3000/api/v1`
   - `token`: (leave empty - will be auto-set)
   - `refresh_token`: (leave empty)
   - `user_id`: (leave empty)
   - `product_id`: (leave empty)
   - `order_id`: (leave empty)

### 4. Run the Tests

**Method 1: Run Individual Requests**
1. Start with "Register User"
2. Then "Login User"  
3. Then test other endpoints

**Method 2: Run Collection**
1. Click on collection name
2. Click "Run"
3. Select all requests
4. Click "Run Express Boilerplate API"

### 5. Verify Everything Works

Check these endpoints manually:

```bash
# Health Check
curl http://localhost:3000/health

# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Password@123","passwordConfirm":"Password@123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Password@123"}'
```