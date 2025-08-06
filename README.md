# Mini LinkedIn - Backend API

A robust Express.js backend API for the Mini LinkedIn social networking application. Built with Node.js, MongoDB, and JWT authentication.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── postController.js   # Post management logic
│   └── userController.js   # User management logic
├── middlewares/
│   ├── auth.js            # JWT authentication middleware
│   └── upload.js          # File upload middleware
├── models/
│   ├── post.js            # Post data model
│   └── user.js            # User data model
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── postRoutes.js      # Post management routes
│   └── userRoutes.js      # User management routes
├── uploads/
│   ├── posts/             # Post image uploads
│   └── profile/           # Profile image uploads
├── services/              # Business logic services
├── utils/                 # Utility functions
├── setup.js               # Database setup script
├── server.js              # Main server file
└── package.json           # Dependencies and scripts
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/mini-linkedin
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

3. **Database Setup**
   ```bash
   npm run setup
   ```

4. **Start the Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/register` | Register new user | `{ name, email, password }` |
| `POST` | `/login` | Login user | `{ email, password }` |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Headers | Body |
|--------|----------|-------------|---------|------|
| `GET` | `/me` | Get current user | `Authorization: Bearer <token>` | - |
| `PUT` | `/profile` | Update user profile | `Authorization: Bearer <token>` | `{ name, bio, profileImage }` |
| `GET` | `/` | Get all users | `Authorization: Bearer <token>` | - |
| `GET` | `/:id` | Get user by ID | `Authorization: Bearer <token>` | - |

### Post Routes (`/api/posts`)

| Method | Endpoint | Description | Headers | Body |
|--------|----------|-------------|---------|------|
| `POST` | `/` | Create new post | `Authorization: Bearer <token>` | `{ content, image }` |
| `GET` | `/feed` | Get all posts | `Authorization: Bearer <token>` | - |
| `GET` | `/me` | Get user's posts | `Authorization: Bearer <token>` | - |
| `PATCH` | `/:id/like` | Toggle post like | `Authorization: Bearer <token>` | - |
| `POST` | `/:id/comment` | Add comment | `Authorization: Bearer <token>` | `{ content }` |
| `PUT` | `/:id/comment/:commentId` | Edit comment | `Authorization: Bearer <token>` | `{ content }` |
| `DELETE` | `/:id/comment/:commentId` | Delete comment | `Authorization: Bearer <token>` | - |
| `DELETE` | `/:id` | Delete post | `Authorization: Bearer <token>` | - |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login**: Get a JWT token
2. **Protected Routes**: Include token in Authorization header
3. **Token Format**: `Authorization: Bearer <your_jwt_token>`

## 📁 File Upload

The API supports file uploads for:
- **Profile Images**: User profile pictures
- **Post Images**: Images attached to posts

### Upload Configuration
- **Storage**: Local file system (`uploads/` directory)
- **File Types**: Images (jpg, jpeg, png, gif)
- **Size Limit**: 5MB per file
- **Naming**: Timestamp-based unique names

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  bio: String,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  content: String,
  image: String,
  author: ObjectId (ref: User),
  likes: [ObjectId (ref: User)],
  comments: [{
    content: String,
    author: ObjectId (ref: User),
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGO_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | - | Yes |
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment mode | development | No |

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set strong JWT secret
4. Run: `npm start`

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run with coverage
npm run test:coverage
```

## 📊 Monitoring

The API includes basic logging for:
- Request/response logging
- Error tracking
- Database connection status
- File upload events

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Stateless authentication
- **CORS Protection**: Configured for frontend domain
- **Input Validation**: Request body validation
- **File Upload Security**: Type and size restrictions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 