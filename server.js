// Import required modules
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


// MongoDB connection setup
let db;
const mongoClient = new MongoClient(process.env.MONGODB_URI, {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
});

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.DB_NAME);
    console.log('Connected to MongoDB Atlas successfully!');
    console.log(`Database: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files

// Custom logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Make database accessible to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Welcome to AfterBell Learning API',
    version: '1.0.0',
    endpoints: {
      lessons: '/api/lessons',
      search: '/api/lessons/search',
      lesson_by_id: '/api/lessons/:id',
      create_order: 'POST /api/orders'
    }
  });
});

// Import routes
const lessonsRouter = require('./routes/lessons');
app.use('/api/lessons', lessonsRouter);

// Orders route - Enhanced for Mauritius checkout
app.post('/api/orders', async (req, res) => {
  try {
    const order = {
      // Customer information
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      postcode: req.body.postcode,
      gift: req.body.gift || false,
      
      // Order details
      lessonIds: req.body.lessonIds,
      lessons: req.body.lessons,
      totalAmount: req.body.totalAmount,
      
      // Metadata
      orderDate: new Date(),
      status: 'pending',
      createdAt: new Date()
    };
    
    const result = await db.collection('orders').insertOne(order);
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: result.insertedId,
      orderDetails: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    requestedUrl: req.url
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(' Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}`);
    console.log(`Documentation: http://localhost:${PORT}/`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n Shutting down gracefully...');
  await mongoClient.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
// Production-ready configuration

// POST /api/orders - Creates new order in MongoDB

// Static file middleware for serving images
