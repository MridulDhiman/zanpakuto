const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const homeRoute = require("./routes/home.route.js")


// EXPRESS MIDDLEWARES

//  for using static files
app.use(express.static("public"));

// parsing json and url-encoded from request body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// cors setup: 
app.use(cors());
// route MIDDLEWARES
app.use("/", homeRoute)

// DATABASE SETUP
mongoose.connect("<add-your-mongodb-connection-string-here>");
const db = mongoose.connection;
db.once("open", () => {
console.log("Database connected");
});
db.on("error", (error) => {
console.log({database_error: error.message})
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})

