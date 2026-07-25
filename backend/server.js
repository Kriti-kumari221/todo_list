require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const taskRoutes = require("./routes/TaskRoutes");
const app = express();

connectDB();

app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Task Manager Backend");
});

// Protected Route
app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to your profile",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});