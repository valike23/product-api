import { Router } from "express";
import { addProductCtrl, getAllProductsCtrl } from "../controllers/productCtrl";
import { Admin } from "../helphers/admin";

export const  productRouter = Router();

productRouter.post('/addProduct', Admin.authMiddleware, addProductCtrl);
productRouter.get('/allProduct', getAllProductsCtrl);