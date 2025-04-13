import mongoose, {Document, Schema} from "mongoose";

// Simple interface describing a single dish's properties
export interface IDish extends Document 
{
    name: string;
    ingredients: string[];
    preparationSteps: string[];
    cookingTime: string;
    origin: string;
    spiceLevel: string; // A custom field to make it somewhat more original
}

