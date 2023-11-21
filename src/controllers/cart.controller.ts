import { NextFunction, Request, Response } from 'express';
import { messages } from "../config/api-messages";
import { HttpStatus } from "../config/http-status";
import * as cartService from '../services/cart.service';
import { ICartDetailModel } from "../models/cart-detail.model";

export async function addItemToCart(req: Request, res: Response, next: NextFunction) {
  try {
    const data: ICartDetailModel = req.body;
    const cartDetail = await cartService.addItemToCart(data);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.ADD_ITEM_CART, cartDetail });
  }
  catch (err) {
    next(err);
  }
}

export async function deleteItemFromCart(req: Request, res: Response, next: NextFunction) {
  try {
    await cartService.deleteItemFromCart(req.params.id);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.DELETE_ITEM_CART});
  }
  catch (err) {
    next(err);
  }
}

export async function updateCartItemQty(req: Request, res: Response, next: NextFunction) {
  try {
    const cartDetail = await cartService.updateCartItemQty(req.params.id, req.body);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.UPDATE_ITEM_QTY_CART, cartDetail });
  }
  catch (err) {
    next(err);
  }
}

export async function getCartDetailByUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await cartService.getCartDetailByUserId(req.params.id);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.GET_USER_CART_ITEM, product });
  }
  catch (err) {
    next(err);
  }
}