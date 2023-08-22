import express, { Request, Response } from "express";
import cors from 'cors';
import * as bodyParser from "body-parser";
import router from './routes/index';
import * as mongodb from './_helper/mongodb';
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
        message: "Hello, this is Node.js app."
    })
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use(router());
