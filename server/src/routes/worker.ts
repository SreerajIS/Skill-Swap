import express from "express"
import * as WorkerController from "../controllers/workercontroller/worker"

const router = express.Router();

router.post("/register",WorkerController.registerWorker)


export default router