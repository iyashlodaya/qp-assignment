import { User, Item, Order, OrderItemMapping } from "./models";
import '../db/models/associations'; // This will apply the associations

const dbInit = async () => {
  try {
    await Promise.all([
        User.sync({ alter: true }),
        Item.sync({ alter: true }),
        Order.sync({ alter: true }),
        OrderItemMapping.sync({ alter: true }),
    ]);
    console.log("Database Synchronization Completed!");
  } catch (error) {
    console.log("Synchronization Error:", error);
  }
};

export default dbInit;
