import { Request, Response } from "express";
import { Cloudinary } from "../helphers/cloudinary";
import { Imedia, Isize, Product } from "../helphers/product";
import { Category } from "../helphers/category";
const cloudinary = require('cloudinary').v2;

export const addProductCtrl = async (req: any, res: Response) => {
    const body = req.body;
    body.author = req["user"].id;
    const product = new Product(body);
    let prod: any = await product.save();
    let category = new Category();
    let id = prod.resp[0];
    body.categories.forEach((_e: any, _i: any) => {
        body.categories[_i].product_id = id;
    });
    const cate = await category.save(body.categories);
    if (prod.status == 'success') return res.json({ prod, cate });
    res.status(503).json(prod);
}

export const getAllProductsCtrl = async (req: Request, res: Response) => {
    let { page, limit, searchQuery } = req.query;
    const product = new Product({});
    res.json(await product.retrieveProducts(page as unknown as number,
        limit as unknown as number,
        searchQuery as unknown as string));
}

export const getAllProductVariants = async (req: Request, res: Response) => {

    const product = new Product({});
    res.json(await product.retrieveVariants(req.query.product_id as unknown as number));
}


export const addVariationCtrl = async (req: any, res: Response) => {
    const body = req.body;
    const product = new Product({});
    let prod = await product.addVariation(req.query.id, body);
    if (prod.status == 'success') return res.json(prod);
    res.status(503).json(prod);
}

export const addSizeCtrl = async (req: any, res: Response) => {
    const body = req.body;
    const product = new Product({});
    let prod = await product.addSize(req.query.id, body);
    if (prod.status == 'success') return res.json(prod);
    res.status(503).json(prod);
}

export const uploadCtrl = async (req: any, res: Response) => {
    try {
        const { type, height, width } = req.fields;

        console.log('files', req.files.media.path);
        const cloud = new Cloudinary();

        // Configuration 
        cloudinary.config({
            cloud_name: "tjconnect",
            api_key: "556459332373436",
            api_secret: "-vfzmuQdlkLrB1rdqR5hTAf5wJg"
        });

        const red = await cloudinary.uploader.upload(req.files.media.path);

      //  let image = await cloud.uploadContent(req.files.media.path);
        let body: Imedia = {
            url: red.secure_url,
            type,
            height,
            width
        };
        const product = new Product({});
        console.log('the body', body);
        let prod = await product.addMedia(req.query.id, body);
        if (prod.status == 'success') return res.json(prod);
        res.status(503).json(prod);

        res.json({});
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}



