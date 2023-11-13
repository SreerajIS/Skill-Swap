import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import userRouter from './routes/user'
import adminRouter from './routes/admin'
import workerRouter from './routes/worker'
import createHttpError, {isHttpError} from "http-errors";
import cors from 'cors'

const app = express();



app.use(express.json());

app.use (cors())

app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/worker",workerRouter)

app.use((req,res,next)=>{
  next(createHttpError(404, "Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request, res:Response, next: NextFunction)=>{
  console.log(error);
  let errorMessage = "an unknown error occurred"
  let statusCode = 500;
  if(isHttpError(error)){
    statusCode = error.status;
    errorMessage = error.message
  }
  res.status(statusCode).json({error:errorMessage})
});


export default app;