// config.js

require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost', // Change this if your MySQL server is hosted elsewhere
    dialect: 'mysql',
  },
};
