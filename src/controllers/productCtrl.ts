import { Request, Response } from "express";
import { Cloudinary } from "../helphers/cloudinary";
import { Imedia, Isize, Product } from "../helphers/product";

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
    res.json(await product.retrieveProducts());
}

export const getAllProductVariants = async (req: Request, res: Response)=>{

    const product = new Product({});
    res.json(await product.retrieveVariants(req.query.product_id as unknown as number));
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

export const uploadCtrl =async (req: any, res: Response)=>{
 try {
    const  {type, height, width} = req.fields;

    console.log('files', req.files.media.path);
    const cloud = new Cloudinary();
    let image = await cloud.uploadContent(req.files.media.path);
    let body: Imedia = {
        url: image.secure_url,
        type,
        height,
        width
    };
    const product = new Product({});
    console.log('the body', body);
    let prod = await product.addMedia(req.query.id, body);
    if(prod.status == 'success') return res.json(prod);
    res.status(503).json(prod);

    res.json({});
 } catch (error) {
    console.log(error);
    res.status(503).json(error);
 }
}



