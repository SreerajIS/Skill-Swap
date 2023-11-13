import express from "express"
import * as UserController from "../controllers/usercontroller/user"

const router = express.Router();

router.post("/login", UserController.getUser);

router.post("/signup",UserController.createUser)
router.post("/forgotpassword",UserController.forgotPassword)
router.post("/signup",UserController.createUser)
// router.get("/:id/verify/:token/:userr",UserController.registerUser)
router.post("/verify",UserController.verifyUser)



export default router;