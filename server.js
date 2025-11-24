import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import app from './app.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});