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

    db.collection("users").find().toArray( (err, res) => {
        if(err){console.log("error cannot read users"); return}
        console.log(res);
    })
});