import express from "express";
import * as jwt from "jsonwebtoken";
import * as http from 'http';
import request from "request";

import * as CartController from "../controllers/cartController";

const cartRouter = express.Router();

function checkAuth(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  const bearerArray = bearerHeader.split(" ");
  const token = bearerArray[1];
  req.token = token;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) {
      // res.sendStatus(403);
      res.json({
        status: false,
        errorCode: 401,
        errMessage: "Authorizatin failed.",
      });
    } else {
      req.user = data.user;
      delete req.user.password;
      next();
    }
  });
}

function checkAuthV2(req, res, next) {
  console.log(req.headers);
  request.post('http://localhost:8000/user/authorize',{
    headers:{
      "Authorization":req.headers.authorization,
      "Content-Type":"application/json"
    }
  },(err,response,body)=>{
    const resJSON = JSON.parse(body);
    if(resJSON.status && resJSON.user){
      req.user = resJSON.user;
      next();

    }else{
      res.json(resJSON);
    }
    
  })
}

cartRouter.use(checkAuthV2);

cartRouter.route("/").get(CartController.getCart);
cartRouter.route("/add").post(CartController.addProductToCart);
cartRouter.route("/delete").post(CartController.deleteProductToCart);

export default cartRouter;
