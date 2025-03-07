require("dotenv").config(); // Load .env variables

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "default_user",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};

  