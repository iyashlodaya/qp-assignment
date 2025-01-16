import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(
  {
    dialect: "postgres", // Database dialect
    database: process.env.DB_NAME as string, // Database name
    username: process.env.DB_USER as string, // Database user
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string, // Host
    port: parseInt(process.env.DB_PORT as string, 10), // Port
    logging: false, // Disable query logging
  }
);

export default sequelize;
