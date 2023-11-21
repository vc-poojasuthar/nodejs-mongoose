import express from "express";
import * as cartController from '../controllers/cart.controller';
import { authMiddleware } from "../middleware/jwt.validation";

export const cartRouter = express.Router();

cartRouter.post('/', authMiddleware, cartController.addItemToCart);
cartRouter.put('/:id', authMiddleware, cartController.updateCartItemQty);
cartRouter.delete('/:id', authMiddleware, cartController.deleteItemFromCart);
cartRouter.get('/:id', authMiddleware, cartController.getCartDetailByUserId);
