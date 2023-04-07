import { Request, Response } from "express";
import { Product } from "../helphers/product";

export const addProductCtrl =async (req: any, res: Response)=>{
    const body = req.body;
    body.author = req["user"].id;
    const product = new Product(body);
    let prod = await product.save();
    if(prod.status == 'success') return res.json(prod);
    res.status(503).json(prod);
}

export const getAllProductsCtrl = async (req: Request, res: Response)=>{

    const product = new Product({});
    let prod = await product.retrieveProducts();
    if(prod.status == 'success') return res.json(prod);
    res.status(503).json(prod);
}


export const addVariationCtrl =async (req: any, res: Response)=>{
    const body = req.body;
    const product = new Product({});
    let prod = await product.addVariation(req.query.id, body);
    if(prod.status == 'success') return res.json(prod);
    res.status(503).json(prod);
}

export const addSizeCtrl =async (req: any, res: Response)=>{
    const body = req.body;
    const product = new Product({});
    let prod = await product.addSize(req.query.id, body);
    if(prod.status == 'success') return res.json(prod);
    res.status(503).json(prod);
}