import { Request, Response } from "express";
import Dish from "../models/Dish";

// Get all the dishes
export const getAllDishes = async (_req: Request, res:Response) => {
    try 
    {
        const dishes = await Dish.find();
        res.json(dishes);
    }
    catch (err) 
    {
        res.status(500).json({ error: "Failed to retrieve dishes" });
    }
}

// Get a dish by name
export const getDishByName = async (req: Request<{name : string}>, res: Response) => {
    try
    {
        const dish = await Dish.findOne({name:req.params.name})
        if(!dish)
            return res.status(404).json({error: "Dish not found"});
        res.json(dish);
    }
    catch(err)
    {
        res.status(500).json({error: "Server error"});
    }
}



// Just a fun easter egg for testing and whatever
export const imATeapot = (_req: Request, res: Response ) => {
    res.status(418).json({
        error: "I'm a teapot ☕",
        message: "This server is refusing to brew coffee because it is a teapot!",
    });
};