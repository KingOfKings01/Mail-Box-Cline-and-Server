import { config } from "dotenv";
config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/user", userRoutes);
app.use("/mail", mailRoutes);

app.get("*", (req, res) => {
  res.json({ message: "This is the endpoint" });
});

// Database Sync
async function initializeDatabase() {
  // await sequelize.sync({ force: false });

  const URL = process.env.MONGODB_SERVER_URL;
  await mongoose.connect(URL);
}

initializeDatabase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
