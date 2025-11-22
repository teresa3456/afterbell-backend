# TerryAmbani-cw1-backend

# AfterBell Learning App - Backend API

## Project Information
- **Student:** Terry Ambani
- **Module:** CST3144 - Full Stack Development
- **Academic Year:** 2025-26

## Important Links

### Repositories
- **Backend Repository:** https://github.com/teresa3456/afterbell-backend
- **Frontend Repository:** https://github.com/teresa3456/afterbell-frontend

### Live Applications
- **Backend API (Render.com):** https://afterbell-backend.onrender.com
- **Frontend App (GitHub Pages):** https://teresa3456.github.io/afterbell-frontend/

### API Endpoints
- **Get All Lessons:** https://afterbell-backend.onrender.com/api/lessons
- **Search Lessons:** https://afterbell-backend.onrender.com/api/lessons/search?q=math
- **Create Order:** POST https://afterbell-backend.onrender.com/api/orders

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB Atlas (Native Driver - No Mongoose)
- CORS
- dotenv

## MongoDB Collections
- **lessons:** Stores lesson information (subject, location, price, spaces)
- **orders:** Stores order data (name, phone, lessonIds, totalAmount)

## Testing
- Postman collection included in repository
- All routes tested and documented

## Deployment
- Hosted on: Render.com
- Database: MongoDB Atlas
- Environment: Production

## API Routes
- `GET /api/lessons` - Returns all lessons as JSON
- `GET /api/lessons/search?q={query}` - Search lessons
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons` - Create new lesson
- `PUT /api/lessons/:id` - Update lesson
- `POST /api/orders` - Create new order

## Middleware
- Logger middleware for request tracking
- Static file middleware for image serving
- CORS for cross-origin requests
- Error handling middleware

## Deployment
Deployed on Render.com with MongoDB Atlas integration.


## MongoDB Collections
- lessons: Stores lesson data
- orders: Stores order information


## API Testing
Postman collection included for testing all endpoints


## Deployment
Deployed on Render.com: [\[URL will be added\]](https://afterbell-backend.onrender.com)


