import express from "express";
import * as productController from '../controllers/product.controller';
import { authMiddleware } from "../middleware/jwt.validation";

export const productRouter = express.Router();

productRouter.get('/', authMiddleware, productController.getProducts);
productRouter.get('/:id', authMiddleware, productController.getProductById);
productRouter.post('/', authMiddleware, productController.createProduct);
productRouter.put('/:id', authMiddleware, productController.updateProduct);
productRouter.delete('/:id', authMiddleware, productController.deleteProduct);

productRouter.get('/categories', authMiddleware, productController.getCategories);