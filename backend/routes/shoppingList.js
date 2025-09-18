const express = require('express');
const ShoppingItem = require('../models/ShoppingItem');
const { validateShoppingItem } = require('../middleware/validation');

const router = express.Router();

// GET /api/shopping-list - Get all shopping items
router.get('/', async (req, res) => {
  try {
    const items = await ShoppingItem.findAll();
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching shopping items:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch shopping items' 
    });
  }
});

// GET /api/shopping-list/:id - Get single shopping item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ShoppingItem.findById(id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        error: 'Shopping item not found' 
      });
    }
    
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching shopping item:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch shopping item' 
    });
  }
});

// POST /api/shopping-list - Create new shopping item
router.post('/', validateShoppingItem, async (req, res) => {
  try {
    const { name, description, quantity, completed } = req.body;
    const item = await ShoppingItem.create({ name, description, quantity, completed });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error('Error creating shopping item:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create shopping item' 
    });
  }
});

// PUT /api/shopping-list/:id - Update shopping item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, completed } = req.body;
    
    const item = await ShoppingItem.update(id, { name, description, quantity, completed });
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        error: 'Shopping item not found' 
      });
    }
    
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error updating shopping item:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update shopping item' 
    });
  }
});

// PATCH /api/shopping-list/:id/toggle - Toggle completion status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ShoppingItem.toggleComplete(id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        error: 'Shopping item not found' 
      });
    }
    
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error toggling shopping item:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to toggle shopping item' 
    });
  }
});

// DELETE /api/shopping-list/:id - Delete shopping item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ShoppingItem.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        error: 'Shopping item not found' 
      });
    }
    
    res.json({ success: true, message: 'Shopping item deleted successfully' });
  } catch (error) {
    console.error('Error deleting shopping item:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete shopping item' 
    });
  }
});

module.exports = router;
