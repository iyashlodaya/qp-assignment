import { User, Item } from "./models";

const dbInit = async () => {
  try {
    await Promise.all([
        User.sync({ alter: true }),
        Item.sync({ alter: true })
    ]);
    console.log("Database Synchronization Completed!");
  } catch (error) {
    console.log("Synchronization Error:", error);
  }
};

export default dbInit;
