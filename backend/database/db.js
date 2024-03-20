// const mongoose = require("mongoose");
// const dotenv = require("dotenv")

// import dotenv from "dotenv";
import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongoDB Connected!!!")
    } catch (error) {
        console.error(error);
    }
}

export default connectDatabase