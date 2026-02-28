const { Schema, model } = require("mongoose");

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: [true, "Token is required for blacklisting"],
        unique: [true, "Token should be unique"]
    }
}, {
    timestamps: true
})

const blacklistModel = model("blacklist", blacklistSchema);

module.exports = blacklistModel