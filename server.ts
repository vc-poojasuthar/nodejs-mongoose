import express, { Request, Response } from "express";
import cors from 'cors';
import router from './src/routes/index';
import { errorHandler } from "./src/config/error-handler";
import * as bodyParser from "body-parser";
import * as mongodb from './src/config/mongodb';
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
mongodb.connect();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hello, Node.js app running."
    })
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use("/api/v1", router());
app.use(errorHandler);