const mongoose = require("mongoose");

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch(() => {
            console.log("Error connecting database")
        })
}

module.exports = connectToDb;