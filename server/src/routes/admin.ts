import express from "express"
import * as AdminController from "../controllers/admincontroller/admin"

const router = express.Router();

router.post("/login", AdminController.adminLogin);
router.get("/userList", AdminController.userList);
router.get("/workerList", AdminController.workerList);
router.put("/userBlock",AdminController.userBlock)



export default router;