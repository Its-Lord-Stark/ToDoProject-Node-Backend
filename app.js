import express from "express";
import userRouter from "./routes/routes.js";
import taskRouter from "./routes/task.js";

import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
    path:"./data/config.env"
})

//Using middlewares
app.use(cookieParser());
app.use(express.json());


//Using routes
app.use("/users" ,userRouter);
app.use("/tasks" ,taskRouter);


app.get("/", (req, res) => {
    res.send("Nice Working")
})


//Using Error Middleware
app.use(errorMiddleware);

