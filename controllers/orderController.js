import res from "express/lib/response";
import Order from "../models/orderModel";

export const create = (req,res)=>{
    if(req.user._id=== req.body.customer.customerId){
        if(req.body.products.length){
            const order = new Order(req.body);
            order.save((err,order)=>{
                if(err){
                    res.json({status:false, error: err});

                }else{
                    res.json({status:true,order:order});

                }
                
            });

        }else{
            res.json({status:false, error: 'No Order products found.'});
        }

    }else{
        res.json({status:false, error: 'Customer is not active customer.'});
    }
    
}