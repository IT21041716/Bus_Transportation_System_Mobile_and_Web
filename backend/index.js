import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app =express();
const PORT = process.env.PORT || 5005;


dotenv.config()
app.use(cors());
app.use(bodyParser.json())

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {

})

app.listen(PORT, () => {
  console.log("***************************************");
  console.log(`Server Running on port number : ${PORT}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGO_DB Connection successfull......!!");
  console.log("***************************************");
});