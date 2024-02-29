import routerAuth from "./routes/auth_routes.js";
import db from "./models/entities/index.js";
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors({
  origin: ['http://localhost:5000'],
  credentials: true
}));
//api
app.use('/api/auth', routerAuth)
//Connect database
try {
  await db.sequelize.authenticate();
  console.log('Connection database successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
// define a root route
app.get('/home', (req, res) => {
  res.send("Welcome to my web server");
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  // connection.connect(function(err){
  //   if(err) throw err;
  //   console.log("Database connected");
  // })
});