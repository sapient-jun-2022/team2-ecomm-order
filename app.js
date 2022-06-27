import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cartRoutes";
//import { routes } from "./routes";
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node_ecomm");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' })); 





app.use("/cart",cartRouter);
app.listen(3002);