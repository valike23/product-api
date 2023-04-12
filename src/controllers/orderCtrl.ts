import { Request, Response } from "express";
import { Order } from "../helphers/order";

const order = new Order();
export async function getUserOrders (req: any, res:  Response) {
   console.log(req.user.id);
    res.json({
        msg:'success',
        data: await order.getAllOrdersForUser(req.user.id),
        status: 200
    })
   ;
}  

export async function addUserOrder(req: any, res: Response){
    let data = await order.addOrderToUser(req.user.id, req.body);
    if(data?.status == 200){
        res.json(data);
    }
    else{
        res.status(data?.status as number).json(data);
    }
}