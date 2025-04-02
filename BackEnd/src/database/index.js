import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"


const connectDB = async ()=>{
    try {
        // Ensure the MONGODB_URL is loaded and valid before attempting connection
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl || !mongoUrl.startsWith('mongodb+srv://')) {
            console.error("Invalid or missing MONGODB_URL in environment variables.");
            process.exit(1);
        }
        console.log("Attempting to connect to MongoDB Atlas...");
        // Pass DB_NAME as an option
        const connection = await mongoose.connect(mongoUrl, { dbName: DB_NAME });
        console.log(`Db is connected on ${connection.connection.host}`);
    } catch (error) {
        console.error("Error while connecting db:", error); // Use console.error for errors
        process.exit(1)
    }
}

export default connectDB
