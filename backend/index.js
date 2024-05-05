
import 'dotenv/config';
import { connectToMongo } from "./db.js"
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
connectToMongo();

//const express = require('express');
//var cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';


app.use(cors());


//available routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);


app.listen(port, host, () => {
  console.log(`Example app running on ${host} listening on port ${port}`);
})