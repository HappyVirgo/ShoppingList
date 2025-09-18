const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const config = require('../config');

const sqlFilePath = path.join(__dirname, 'init.sql');
const sql = fs.readFileSync(sqlFilePath, 'utf8');

const pool = new Pool({
  connectionString: config.database.url,
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
});

(async () => {
  try {
    // Execute the entire SQL file as a single query
    await pool.query(sql);
    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
