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

// Mongoose shcema definition
const DishSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        ingredients: [String],
        preparationSteps: [String],
        cookingTime: String,
        origin: String,
        spiceLevel: String,
    },
    {timestamps: true} // Automatically adds createdAt and updatedAt
);

// Exports the mongoose model

export default mongoose.model<IDish>("Dish", DishSchema);