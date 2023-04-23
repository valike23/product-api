import { Router } from "express";
import { addProductCtrl, addSizeCtrl, addVariationCtrl, getAllProductsCtrl, getAllProductVariants, getProductMediaCtrl, removeProduct, uploadCtrl } from "../controllers/productCtrl";
import { Admin } from "../helphers/admin";
import formidableMiddleware from "express-formidable";
import { addCategoryCtrl, addUserOrder, getCategoriesCtrl, getCategoryProductsCtrl, getUserOrders, retrieveOrdersByStatusCtrl } from "../controllers/orderCtrl";
import { Auth } from "../helphers/users";

export const  productRouter = Router();

productRouter.post('/addProduct', Admin.authMiddleware, addProductCtrl);
productRouter.get('/allProduct', getAllProductsCtrl);
productRouter.post('/addVariant',Admin.authMiddleware, addVariationCtrl);
productRouter.get('/variants', getAllProductVariants);
productRouter.post('/addSize',Admin.authMiddleware, addSizeCtrl);
productRouter.post('/uploadMedia',[formidableMiddleware(), Admin.authMiddleware], uploadCtrl);
productRouter.get('/product_media',getProductMediaCtrl);
productRouter.delete('/product', Admin.authMiddleware, removeProduct);


productRouter.get('/user_orders',Auth.authMiddleware, getUserOrders);
productRouter.post('/user_orders',Auth.authMiddleware, addUserOrder);
productRouter.get('/get_all_orders',Admin.authMiddleware, retrieveOrdersByStatusCtrl);


productRouter.get('/category', getCategoriesCtrl);
productRouter.post('/category',Admin.authMiddleware, addCategoryCtrl);
productRouter.get('/category-products', getCategoryProductsCtrl);