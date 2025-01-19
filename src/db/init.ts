import { User, Item, Order, OrderItemMapping } from "./models";
import '../db/models/associations'; // This will apply the associations
import sequelize from "./config";
import { QueryTypes } from "sequelize";

const dbInit = async () => {
  try {

    const dbExists = await sequelize.query(
      "SELECT * from pg_database where datname = :dbname",
      {
        replacements: {dbname: process.env.DB_NAME},
        type: QueryTypes.SELECT,
      }
    );

    if(!dbExists.length) {
      await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Database ${process.env.DB_NAME} created successfully!`);
    }

    await Order.sync({ alter: true });


    await Promise.all([
        User.sync({ alter: true }),
        Item.sync({ alter: true }),
        OrderItemMapping.sync({ alter: true }),
    ]);
    console.log("Database Synchronization Completed!");
  } catch (error) {
    console.log("Synchronization Error:", error);
  }
};

export default dbInit;
