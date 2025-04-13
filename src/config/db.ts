import mongoose from "mongoose";
import dotenv from "dotenv";

//Loads the enviroment variables
dotenv.config();

// The function to connect to MongoDB atlas
const connectDB = async () => 
    {
        try 
        {
            await mongoose.connect(process.env.CONNECTION_URL as string);
            console.log("✅ MongoDB successfully connected");
        }
        catch(err)
        {
            console.error("❌ MongoDB Connection Error: ", err);
            process.exit(1);
            // If all fails exit the app.
        }
    }

export default connectDB;