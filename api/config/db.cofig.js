// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import logger from "./logger";
// dotenv.config()
// const ConnectDB = async() =>{
//     try {
//         if (process.env.DB_URI == undefined) throw new Error("DB_URI is undefined, please check .env file")
//         await mongoose.connect(process.env.DB_URI)
//         logger.info("Successfully connected to DB")
//     } catch (error) {
//         logger.error("Error connecting to DB")
//     }
// }

// export default ConnectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const ConnectDB = async () => {
    try {
        if (process.env.DB_URI == undefined) throw new Error("DB_URI is undefined, please check .env file");
        await mongoose.connect(process.env.DB_URI);
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log(`Error connecting to DB: ${error.message}`);
        process.exit(1);
    }
};

export default ConnectDB;
