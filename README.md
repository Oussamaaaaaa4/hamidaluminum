# Hamid Aluminum - Professional E-Commerce Website

![Hamid Aluminum Logo](docs/logo-placeholder.png)

A modern, professional e-commerce website for aluminum products, built with cutting-edge web technologies and industry best practices.

## 🌟 Features

### Core E-Commerce Functionality
- **Product Catalog**: Advanced product browsing with filtering and search
- **Shopping Cart**: Persistent cart with real-time updates
- **Secure Checkout**: Integrated payment processing with Stripe
- **User Accounts**: Registration, login, and profile management
- **Order Management**: Order tracking and history
- **Admin Panel**: Complete product and order management

### Professional Design Elements
- **Responsive Design**: Mobile-first approach for all devices
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Performance Optimized**: Fast loading times and optimized images
- **SEO Ready**: Structured data and meta tags for search engines
- **Accessibility**: WCAG 2.1 compliant for all users

### Technical Features
- **Security**: Helmet.js, CORS, JWT authentication
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API architecture
- **Testing**: Comprehensive test coverage with Jest
- **Code Quality**: ESLint and Prettier for consistent code style

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp config/.env.example config/.env
   # Edit config/.env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
hamid-aluminum/
├── frontend/                 # Client-side application
│   ├── assets/              # Images, fonts, and static files
│   │   ├── css/             # Stylesheets
│   │   ├── js/              # JavaScript modules
│   │   └── images/          # Product and UI images
│   ├── components/          # Reusable UI components
│   ├── pages/              # Individual page templates
│   └── index.html          # Main entry point
├── backend/                 # Server-side application
│   ├── controllers/         # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── server.js           # Main server file
├── config/                  # Configuration files
│   ├── .env.example        # Environment variables template
│   └── database.js         # Database configuration
├── docs/                   # Documentation
├── tests/                  # Test files
└── package.json           # Project dependencies
```

## 🛠 Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

### Environment Variables

Create a `.env` file in the `config/` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hamid-aluminum
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

## 🎨 Design System

### Color Palette
- **Primary**: #2C3E50 (Dark blue-gray)
- **Secondary**: #3498DB (Blue)
- **Accent**: #E74C3C (Red)
- **Success**: #27AE60 (Green)
- **Warning**: #F39C12 (Orange)
- **Light**: #ECF0F1 (Light gray)
- **Dark**: #2C3E50 (Dark gray)

### Typography
- **Headings**: Roboto, sans-serif
- **Body**: Open Sans, sans-serif
- **Monospace**: Fira Code, monospace

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## 📦 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Heroku**: Ready for Heroku deployment
- **Vercel**: Frontend deployment with API routes
- **AWS**: EC2 or Lambda deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@hamidaluminum.com
- **Phone**: +1 (555) 123-4567
- **Documentation**: [docs/](docs/)

## 🙏 Acknowledgments

- Modern e-commerce best practices
- Responsive design principles
- Security-first development approach
- Performance optimization techniques

---

**Built with ❤️ for professional aluminum solutions**