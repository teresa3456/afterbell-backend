const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// GET all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await req.db.collection('lessons').find({}).toArray();
    res.json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Search lessons - MUST be before /:id route
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    
    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        error: 'Search query parameter "q" is required'
      });
    }
    
    const lessons = await req.db.collection('lessons').find({
      $or: [
        { subject: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } }
      ]
    }).toArray();
    
    res.json({
      success: true,
      count: lessons.length,
      query: searchQuery,
      data: lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await req.db.collection('lessons').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }
    
    res.json({
      success: true,
      data: lesson
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST - Create new lesson
router.post('/', async (req, res) => {
  try {
    const newLesson = req.body;
    const result = await req.db.collection('lessons').insertOne(newLesson);
    
    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: {
        _id: result.insertedId,
        ...newLesson
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT - Update lesson (e.g., update spaces when adding to cart)
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    
    const result = await req.db.collection('lessons').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Lesson updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE - Delete a lesson
router.delete('/:id', async (req, res) => {
  try {
    const result = await req.db.collection('lessons').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

// RESTful API endpoints
