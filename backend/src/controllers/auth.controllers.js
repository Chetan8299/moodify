const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.find({
        $or: [
            { email },
            { username }
        ]
    })  

    if (isAlreadyRegistered.length) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered sucessfully",
        user
    });
}

const loginUser = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password");

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials "
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token);

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}

const getUserDetails = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: "User details retreived successfully",
        user
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUserDetails
}