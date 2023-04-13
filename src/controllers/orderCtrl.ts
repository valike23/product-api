import { Request, Response } from "express";
import { Category } from "../helphers/category";
import { Order } from "../helphers/order";

const order = new Order();
const category = new Category();
export async function getUserOrders(req: any, res: Response) {
    console.log(req.user.id);
    res.json({
        msg: 'success',
        data: await order.getAllOrdersForUser(req.user.id),
        status: 200
    })
        ;
}

export async function addUserOrder(req: any, res: Response) {
    let data = await order.addOrderToUser(req.user.id, req.body);
    if (data?.status == 200) {
        res.json(data);
    }
    else {
        res.status(data?.status as number).json(data);
    }
}

export async function getCategoriesCtrl(req: any, res: Response) {

    res.json({
        msg: 'success',
        data: await category.getCategory(),
        status: 200
    })
        ;
}
export async function addCategoryCtrl(req: Request, res: Response) {
    let data = await category.save(req.body);
    if (data?.status == 200) {
        res.json(data);
    }
    else {
        res.status(data?.status as number).json(data);
    }
}

export async function getCategoryProductsCtrl(req: any, res: Response) {

    res.json({
        msg: 'success',
        data: await category.getAllProductsInCategory(req.query.categoryId),
        status: 200
    })
        ;
}