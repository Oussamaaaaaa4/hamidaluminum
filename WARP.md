# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Development Server
```bash
# Start development servers (both frontend and backend)
npm run dev

# Start only backend (Node.js server on port 5000)
npm run dev:backend

# Start only frontend (live-server on port 3000)
npm run dev:frontend

# Start production server
npm start
```

### Building & Testing
```bash
# Build the entire project
npm run build

# Build only frontend (webpack production build)
npm run build:frontend

# Run tests (Jest)
npm test

# Lint code (ESLint)
npm run lint

# Format code (Prettier)
npm run format
```

### Single Test Execution
```bash
# Run specific test file
npx jest path/to/test-file.js

# Run tests matching pattern
npx jest --testNamePattern="pattern"

# Run tests in watch mode
npx jest --watch
```

## Project Architecture

### Frontend-Backend Split Architecture
This is a traditional multi-page application with a clear separation between frontend (static files) and backend (Express.js API):

- **Frontend**: Vanilla HTML/CSS/JS served as static files from Express
- **Backend**: RESTful API built with Express.js and MongoDB
- **Communication**: Frontend makes AJAX calls to `/api/v1/*` endpoints
- **Authentication**: JWT-based authentication with localStorage persistence

### Key Backend Components

#### Server Configuration (`backend/server.js`)
- **Express App**: Main server with security middleware (Helmet, CORS)
- **API Versioning**: All API routes prefixed with `/api/v1`
- **Static File Serving**: Frontend served from `/frontend` directory
- **Rate Limiting**: Applied to all API routes
- **Error Handling**: Centralized error handling middleware
- **Health Check**: Available at `/health` endpoint

#### API Structure
```
/api/v1/auth     # Authentication (public)
/api/v1/products # Product catalog (public)
/api/v1/users    # User management (protected)
/api/v1/orders   # Order management (protected)
```

#### Middleware Stack
- **Authentication**: JWT verification in `middleware/auth.js`
- **Rate Limiting**: Request throttling in `middleware/rateLimiter.js`
- **Logging**: Request logging in `middleware/logger.js`
- **Error Handling**: Centralized error responses in `middleware/errorHandler.js`

### Frontend Architecture

#### JavaScript Architecture (`frontend/assets/js/main.js`)
- **Class-based**: `HamidAluminumApp` main application class
- **State Management**: LocalStorage for cart and user data
- **Modern Features**: ES6+, Intersection Observer API, async/await
- **Modular**: Separate files for cart.js and products.js functionality

#### UI Components
- **Responsive Design**: Mobile-first approach with breakpoint system
- **Animation System**: Intersection Observer for scroll animations
- **Navigation**: Sticky header with active section highlighting
- **Shopping Cart**: Sidebar with persistent storage

### Database Integration
- **MongoDB**: Document database with Mongoose ODM
- **Connection**: Centralized in `utils/database.js`
- **Models**: Defined in `backend/models/` (to be implemented)
- **Sample Data**: Currently using in-memory sample data in routes

### Environment Configuration
Environment variables are managed through `.env` files in the `config/` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hamid-aluminum
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-key
EMAIL_* # Email configuration for notifications
```

## Development Guidelines

### API Development
- All API endpoints return JSON with consistent structure: `{ success: boolean, data?: any, error?: string }`
- Use proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Protected routes require JWT token in Authorization header: `Bearer <token>`
- Implement pagination for list endpoints with `page`, `limit`, `total` fields

### Frontend Development
- Use the existing class-based architecture for new features
- Add new components to the `HamidAluminumApp` initialization
- Store persistent data in localStorage with `hamid-aluminum-` prefix
- Follow existing CSS class naming convention (`kebab-case`)

### Database Patterns
- Use Mongoose schemas for data validation
- Implement proper error handling for database operations
- Add indexes for frequently queried fields
- Use population for related data (users, orders, products)

### Security Considerations
- JWT tokens expire in 30 days (configurable via `JWT_EXPIRES_IN`)
- Rate limiting: 100 requests per 15 minutes per IP
- CORS configured for development origins
- Helmet.js provides security headers
- File uploads limited to images only with size restrictions

### Testing Strategy
- Use Jest for unit and integration tests
- Test API endpoints with proper authentication
- Mock database operations for unit tests
- Test frontend functionality with DOM manipulation

### Deployment Considerations
- Environment variables must be set in production
- MongoDB connection required for full functionality
- Stripe keys needed for payment processing
- Email configuration required for user notifications
- Static files served from Express in production

## File Structure Context

### Backend Structure
```
backend/
├── middleware/     # Express middleware (auth, logging, errors)
├── routes/        # API route handlers (auth, products, users, orders)
├── utils/         # Utility functions (database connection)
└── server.js      # Main server file with full configuration
```

### Frontend Structure
```
frontend/
├── assets/
│   ├── css/       # Stylesheets
│   └── js/        # JavaScript modules
└── index.html     # Single-page application entry point
```

### Configuration
```
config/
└── .env.example   # Environment variables template
```

## Common Development Patterns

### Adding New API Endpoints
1. Create route handler in appropriate `backend/routes/*.js` file
2. Add authentication middleware if needed: `app.use('/api/v1/endpoint', authMiddleware, router)`
3. Follow existing response format with `success`, `data`, and error handling
4. Update API documentation in server.js `/api/v1/docs` endpoint

### Adding Frontend Features
1. Add initialization in `HamidAluminumApp` constructor
2. Create event handlers following existing patterns
3. Use existing state management for persistence
4. Add CSS classes following existing naming conventions

### Database Integration
1. Create Mongoose models in `backend/models/`
2. Replace sample data in routes with database queries
3. Add proper error handling for database operations
4. Implement data validation at model level