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
export const getDishByName = async (req: Request<{name : string}>, res: Response): Promise<void> => {
    try
    {
        const dish = await Dish.findOne({name:req.params.name})
        if(!dish)
            res.status(404).json({error: "Dish not found"});
            return;
        res.json(dish);
    }
    catch(err)
    {
        res.status(500).json({error: "Server error"});
    }
}

// Add a new dish
export const addDish = async (req:Request, res: Response): Promise<void> => {
    try 
    {
        const exists = await Dish.findOne({name: req.body.name});
        if(exists)
        {
            res.status(409).json({error: "Dish already eixsts!"});
            return;
        }

        const newDish = new Dish(req.body);
        await newDish.save();
        res.status(201).json(newDish);
    }
    catch(err)
    {
        res.status(500).json({error: "Failed to add dish"});
    }
};

//Update a dish by ID
export const updateDish = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try 
    {
      const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) 
        {
            res.status(404).json({ error: "Dish not found" });
            return;
        }
      res.json(updated);
    } 
    catch (err) 
    {
      res.status(500).json({ error: "Failed to update dish" });
    }
  };

// Delete a dish by ID
export const deleteDish = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try 
    {
        const deleted = await Dish.findByIdAndDelete(req.params.id);
        if(!deleted)
        {
            res.status(404).json({error: "Dish not found"});
            return;
        }
        res.json({message: "Dish deleted"})
    } 
    catch (err) 
    {
        res.status(500).json({error:"Failed to delete dish"});
    }
}

// Just a fun easter egg for testing and whatever
export const imATeapot = async (_req: Request, res: Response ): Promise<void> => {
    res.status(418).json({
        error: "I'm a teapot ☕",
        message: "This server is refusing to brew coffee because it is a teapot!",
    });
};