import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URI)
    } catch (error) {
        console.error(`ERROR: ${error.message}`)
        process.exit(1);
    }
}