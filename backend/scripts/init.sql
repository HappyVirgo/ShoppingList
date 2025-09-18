-- Initialize shopping list database
-- CREATE DATABASE shoppinglist;

-- Connect to the shoppinglist database
-- \c shoppinglist;

-- Create shopping_items table
CREATE TABLE IF NOT EXISTS shopping_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) DEFAULT 'description',
  quantity INTEGER DEFAULT 1,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_shopping_items_updated_at ON shopping_items;
CREATE TRIGGER update_shopping_items_updated_at
  BEFORE UPDATE ON shopping_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO shopping_items (name, description, quantity, completed) VALUES
  ('Milk', 'description', 2, false),
  ('Bread', 'description', 1, true),
  ('Bananas', 'description', 3, false),
  ('Chicken Breast', 'description', 1, false)
ON CONFLICT DO NOTHING;
