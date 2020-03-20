const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const path = require("path");

const mongoUrl = "mongodb://localhost:27017";
global.db = '';
mongoClient.connect(mongoUrl, {useUnifiedTopology:true},(err,res)=>{
    if(err){console.log("Database error"); return}
    db = res.db("company");
    console.log("Database listening...");
});

const postUsers = require(path.join(__dirname,"routes","users","post.js"));
const app = express();

app.post("/users", postUsers);

app.listen(8080, err => {
    if(err){console.log("Server error"); return}
    console.log("server listening")
});
