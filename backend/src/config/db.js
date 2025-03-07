const { Sequelize } = require("sequelize");

// Create Sequelize instance and connect to PostgreSQL database
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false, // Set to true if you want to see SQL queries in the console
});

// Authenticate the connection to ensure everything is working
const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDBConnection();

module.exports = sequelize;

