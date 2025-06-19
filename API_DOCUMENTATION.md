# API Documentation with Swagger

This project includes comprehensive API documentation using Swagger/OpenAPI 3.0. The documentation provides interactive API exploration and testing capabilities.

## 🚀 Accessing the Documentation

### Local Development
- **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **API Base URL**: [http://localhost:3000/api](http://localhost:3000/api)

### Docker Development
- **Swagger UI**: [http://localhost:3003/api/docs](http://localhost:3003/api/docs)
- **API Base URL**: [http://localhost:3003/api](http://localhost:3003/api)

## 📋 Available Endpoints

### General Endpoints
- `GET /` - Welcome message
- `GET /nodemon` - Nodemon test endpoint

### Health Check Endpoints
- `GET /health` - Service health status
- `GET /test-db` - Database connectivity test

### User Management
- `POST /users/register` - Register a new user
- `POST /users/login` - User authentication
- `GET /users/profile/{id}` - Get user profile
- `GET /users/all` - Get all users
- `PUT /users/profile/{id}` - Update user profile
- `DELETE /users/profile/{id}` - Delete user

## 🛠️ Using the Swagger UI

1. **Start your application**:
   ```bash
   npm start
   # or with Docker
   docker-compose up
   ```

2. **Open Swagger UI** in your browser at the appropriate URL above

3. **Explore APIs**:
   - Browse available endpoints organized by tags
   - View request/response schemas
   - See example payloads

4. **Test APIs**:
   - Click "Try it out" on any endpoint
   - Fill in required parameters
   - Execute requests directly from the UI
   - View real responses

## 📖 Documentation Structure

### Schema Definitions
The API uses the following main schemas:

- **User**: Complete user object with all fields
- **UserResponse**: User object without password (for responses)
- **UserRegisterRequest**: Required fields for user registration
- **UserLoginRequest**: Required fields for user login
- **UserUpdateRequest**: Optional fields for user updates
- **ApiResponse**: Standard success response format
- **ErrorResponse**: Standard error response format
- **HealthResponse**: Health check response format

### Response Status Codes
- `200` - Success
- `201` - Created (for new user registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 🔧 Configuration

The Swagger configuration is located in `src/config/swagger.config.js` and includes:

- **API Information**: Title, version, description
- **Server URLs**: Development and Docker environments
- **Component Schemas**: Reusable data models
- **Response Templates**: Standard response formats

## 📝 Example API Usage

### Register a New User
```bash
curl -X POST "http://localhost:3000/api/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

### Login User
```bash
curl -X POST "http://localhost:3000/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

### Get User Profile
```bash
curl -X GET "http://localhost:3000/api/users/profile/1"
```

## 🚦 Health Checks

Before testing user endpoints, verify the service is running:

```bash
# Check service health
curl http://localhost:3000/api/health

# Check database connectivity
curl http://localhost:3000/api/test-db
```

## 🔍 Features

- **Interactive Documentation**: Test APIs directly from the browser
- **Schema Validation**: Comprehensive request/response schemas
- **Example Payloads**: Real-world examples for all endpoints
- **Error Handling**: Detailed error response documentation
- **Multiple Environments**: Support for local and Docker development
- **Clean UI**: Customized Swagger UI with proper branding

## 📁 File Structure

```
src/
├── config/
│   └── swagger.config.js    # Swagger configuration and schemas
└── routes/
    ├── index.js             # Main routes with Swagger docs
    └── user.routes.js       # User routes with detailed documentation
```

## 🎯 Next Steps

1. **Add Authentication**: Implement JWT token authentication
2. **Product APIs**: Document product management endpoints
3. **Pagination**: Add pagination schemas for list endpoints
4. **File Uploads**: Document file upload endpoints
5. **Rate Limiting**: Document rate limiting responses

---

**Note**: The documentation is automatically generated from JSDoc comments in your route files. When you add new endpoints, make sure to include proper Swagger annotations to keep the documentation up to date. 