import { Router } from "express";
import { addProductCtrl, addSizeCtrl, addVariationCtrl, getAllProductsCtrl } from "../controllers/productCtrl";
import { Admin } from "../helphers/admin";

export const  productRouter = Router();

productRouter.post('/addProduct', Admin.authMiddleware, addProductCtrl);
productRouter.get('/allProduct', getAllProductsCtrl);
productRouter.post('/addVariant',Admin.authMiddleware, addVariationCtrl);

productRouter.post('/addSize',Admin.authMiddleware, addSizeCtrl);