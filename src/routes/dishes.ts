import express from "express";

import 
{
    getAllDishes,
    getDishByName,
    addDish,
    updateDish,
    deleteDish,
    imATeapot,
} from "../controllers/dishController";

const router = express.Router();

// Route handlers

// Route handlers
// GET /api/dishes - Get all dishes
router.get("/", getAllDishes);

// GET /api/dishes/:name - Get a single dish by name
router.get("/:name", getDishByName);

// POST /api/dishes - Add a new dish
router.post("/", addDish);

// PUT /api/dishes/:id - Update an existing dish by ID
router.put("/:id", updateDish);

// DELETE /api/dishes/:id - Delete a dish by ID
router.delete("/:id", deleteDish);

// GET /api/dishes/teapot - Fun Easter egg
router.get("/teapot", imATeapot);

export default router;