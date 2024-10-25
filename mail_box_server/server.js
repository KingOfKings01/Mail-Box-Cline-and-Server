import { config } from "dotenv";
config();
import cors from "cors"
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
const app = express();


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

  
app.use(express.json());

// API Routes
app.use("/user", userRoutes);
// get /

app.get("/", (req, res) => {
  const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 28 },
  ];

  res.json(users);
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
