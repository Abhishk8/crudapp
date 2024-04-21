dotenv.config();

import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db.js';
import cors from 'cors';
import router from './routes.js';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/',router);

app.listen(3000,async()=>{
    await connectToMongoDB();
    console.log('server is runing');
})