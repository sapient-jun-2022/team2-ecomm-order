import res from "express/lib/response";
import Order from "../models/orderModel";

export const create = (req,res)=>{
    if(req.user._id=== req.customer.customerId){
        if(req.products.length){
            const order = new Order(req.body);
            order.save((err,order)=>{
                if(err){
                    res.send(err);

                }else{
                    res.json(order);

                }
                
            });

        }else{
            res.send("No Order products found.");
        }

    }else{
        res.send("Customer is not active customer.");
    }
    
}