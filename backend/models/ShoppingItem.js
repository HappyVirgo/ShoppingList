const { pool } = require('../database/connection');

class ShoppingItem {
  static async findAll() {
    const query = `
      SELECT id, name, description, quantity, completed, created_at, updated_at
      FROM shopping_items
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT id, name, description, quantity, completed, created_at, updated_at
      FROM shopping_items
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create({ name, description, quantity = 1, completed = false }) {
    const query = `
      INSERT INTO shopping_items (name, description, quantity, completed)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, description, quantity, completed, created_at, updated_at
    `;
    const result = await pool.query(query, [name, description, quantity, completed]);
    return result.rows[0];
  }

  static async update(id, { name, description, quantity, completed }) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (quantity !== undefined) {
      fields.push(`quantity = $${paramCount++}`);
      values.push(quantity);
    }
    if (completed !== undefined) {
      fields.push(`completed = $${paramCount++}`);
      values.push(completed);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
      UPDATE shopping_items
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, name, description, quantity, completed, created_at, updated_at
    `;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM shopping_items WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  static async toggleComplete(id) {
    const query = `
      UPDATE shopping_items
      SET completed = NOT completed
      WHERE id = $1
      RETURNING id, name, description, quantity, completed, created_at, updated_at
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = ShoppingItem;
