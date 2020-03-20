const formidable = require("formidable");
const detect = require("detect-file-type");
const {v4: uuidv4} = require("uuid");
const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.send("Error in file")
        }
        detect.fromFile(files.picture.path, (err, result) => {
            const allowedImageTypes = ["jpg", "png", "jpeg", "webp"];
            if (!allowedImageTypes.includes(result.ext)) {
                return res.send("Document type unsupported");
            }
            const pictureName = uuidv4() + "." + result.ext;
            const oldPath = files.picture.path;
            const newPath = path.join(__dirname, "..", "..", "images", pictureName);
            fs.rename(oldPath, newPath, (err, res) => {
                if (err) {
                    console.log("Error uploading picture");
                    return
                }
                const user = {"firstName": fields.firstName, "surname": fields.surname, "picture": pictureName};
                try {
                    db.collection("users").insertOne(user, (err, dbResponse) => {
                        if (err) {
                            return res.send("Mongo cannot register user");
                        }
                        return res.send('ok here')
                    });
                } catch(ex) {
                    return res.status(500).send("Internal error")
                }
            });
        });
    });
};