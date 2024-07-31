import express from 'express';
import ConnectDB from "./config/db.cofig.js"; // Ensure the path matches your project structure
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"


dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    })
})

// Await the database connection before starting the server
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(`Failed to start server due to database connection issue: ${error.message}`)
});


