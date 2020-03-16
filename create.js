const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017/";
let db = null;

process.on("uncaughtException", (err, data) => {
    if (err){
        console.log("critical error");
        return
    }
});

mongoClient.connect(mongoUrl,  { useUnifiedTopology: true },(err, res) => {
    if(err){console.log("database connection error"); return}
    db = res.db("nodejs-mongo-crud");
    let user = {"firstName": "A", "surname":"AA"};
    db.collection("users").insertOne(user, (err, res) => {
        if(err){console.log("error cannot insert user"); return}
    });
});