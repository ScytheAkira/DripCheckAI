import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser' // Correct import statement

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config();

const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser()); // Correct usage of cookieParser middleware

app.use('/api/users', userRoutes);
app.listen(port, ()=>{
    console.log(`Server running on Port : ${port}`)
})
