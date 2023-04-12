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