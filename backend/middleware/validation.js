const validateShoppingItem = (req, res, next) => {
  const { name, quantity, completed } = req.body;
  const errors = [];

  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  } else if (name.length > 255) {
    errors.push('Name must be 255 characters or less');
  }

  // Validate quantity
  if (quantity !== undefined) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      errors.push('Quantity must be a positive integer');
    }
  }

  // Validate completed
  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('Completed must be a boolean value');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Clean up the data
  req.body.name = name.trim();
  req.body.quantity = quantity || 1;
  req.body.completed = completed || false;

  next();
};

module.exports = {
  validateShoppingItem
};
