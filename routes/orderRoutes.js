import express from "express";
import request from "request";

import * as orderController from "../controllers/orderController";

const orderRouter = express.Router();

function checkAuth(req, res, next) {
  console.log(req.headers);
  request.post('http://localhost:3000/user/authorize',{
    headers:{
      "Authorization":req.headers.authorization,
      "Content-Type":"application/json"
    }
  },(err,response,body)=>{
    //console.log(body);
    const resJSON = JSON.parse(body);
    if(resJSON.status && resJSON.user){
      req.user = resJSON.user;
      next();

    }else{
      res.json(resJSON);
    }
    
  })
}

orderRouter.use(checkAuth);

orderRouter.route("/create").post(orderController.create);

export default orderRouter;
