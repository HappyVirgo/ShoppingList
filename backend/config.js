module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'shoppinglist',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/shoppinglist'
  }
};
