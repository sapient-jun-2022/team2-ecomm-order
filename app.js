import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import orderRouter from "./routes/orderRoutes";
//import { routes } from "./routes";
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node_ecomm");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

app.use("/order", orderRouter);
app.listen(3003);
