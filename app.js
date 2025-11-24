import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
    res.send("Online Learning Platform Running");
});

export default app;