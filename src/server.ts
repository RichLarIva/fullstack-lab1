import express from "express";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db"; // MongoDB connection
import dishRoutes from "./routes/dishes"; // Dish routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON in request body

// Serve static HTML (for index.html)
app.use(express.static(path.join(__dirname, "public")));


// API route for dishes
app.use("/api/v1/dishes", dishRoutes);

// Start server after DB connection
connectDB().then(() => 
{
  app.listen(PORT, () => console.log(`🚀 Server running on address: http://127.0.0.1:${PORT}`));
});
