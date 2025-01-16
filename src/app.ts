import express, { Application, Request, Response } from "express";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import sequelize from "./db/config";
import dbInit from "./db/init";

const app: Application = express();

//middleware
app.use(express.json()); // middleware for parsing JSON bodies.

//Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to App!");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    await sequelize.authenticate();
    console.log("Database connection has been established succesfully!");
    await dbInit();

    
  } catch (error) {
    if ((error as any).name === "SequelizeConnectionError") {
      console.error("Database connection error:", (error as any).message);
    } else {
      console.log("Application Error:", error);
    }
  }
};

startServer();