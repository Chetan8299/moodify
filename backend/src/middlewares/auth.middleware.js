const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "token not provided"
        })
    }

    const isTokenBlacklisted = await blacklistModel.findOne({
        token
    });

    if (isTokenBlacklisted) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }
}

module.exports = { authenticate }

