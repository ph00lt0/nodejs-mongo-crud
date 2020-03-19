const express = require("exprress");
const app = express();


app.listen(80, err => {
    if(err){console.log("Server error"); return}
    console.log("server listening")
});