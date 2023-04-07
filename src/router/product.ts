import { Router } from "express";
import { addProductCtrl, addSizeCtrl, addVariationCtrl, getAllProductsCtrl, uploadCtrl } from "../controllers/productCtrl";
import { Admin } from "../helphers/admin";
import formidableMiddleware from "express-formidable";

export const  productRouter = Router();

productRouter.post('/addProduct', Admin.authMiddleware, addProductCtrl);
productRouter.get('/allProduct', getAllProductsCtrl);
productRouter.post('/addVariant',Admin.authMiddleware, addVariationCtrl);

productRouter.post('/addSize',Admin.authMiddleware, addSizeCtrl);
productRouter.post('/uploadMedia',[formidableMiddleware(), Admin.authMiddleware], uploadCtrl);