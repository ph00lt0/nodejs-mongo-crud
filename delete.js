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
    const deleteThis = {"firstName":"B"};
    db.collection('users').deleteOne( deleteThis, (err, res) => {
        if(err){console.log("error cannot delete user"); return}
        console.log(res)
    });
});