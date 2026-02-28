const { Router } = require("express");
const authController = require("../controllers/auth.controllers")
const { authenticate } = require("../middlewares/auth.middleware")

const authRouter = Router();

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.loginUser);

authRouter.get("/get-me", authenticate, authController.getUserDetails);

authRouter.get("/logout", authenticate, authController.logoutUser)

module.exports = authRouter;