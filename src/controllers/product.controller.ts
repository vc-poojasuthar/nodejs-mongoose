import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";
import { HttpStatus } from "../config/http-status";
import { messages } from "../config/api-messages";
import { IProductModel } from "../models/product.model";
import { Defaults } from "../config/default.config";


export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const searchTerm = req.query.search as string;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : Defaults.START_PAGE;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : Defaults.PAGE_LIMIT;
    const sortField = req.query.sortBy as string ?? Defaults.SORT_FIELD;
    const sortOrder = req.query.sortOrder ? parseInt(req.query.sortOrder as string, 10) : Defaults.SORT_ORDER;

    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { name: new RegExp(searchTerm, 'i') }
        ]
      };
    }
    const products = await productService.getProducts(query, page, limit, sortField, sortOrder);
    return res.status(HttpStatus.SUCCESS).send({ data: products });
  }
  catch (err) {
    next(err);
  }
}

export async function getProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.GET_PRODUCT, product });
  }
  catch (err) {
    next(err);
  }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const data: IProductModel = req.body;
    const product = await productService.createProduct(data);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.CREATE_PRODUCT, product });
  }
  catch (err) {
    next(err);
  }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.UPDATE_PRODUCT, product });
  }
  catch (err) {
    next(err);
  }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productService.deleteProduct(req.params.id);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.DELETE_PRODUCT, product });
  }
  catch (err) {
    next(err);
  }
}

export async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await productService.getCategories();
    return res.status(HttpStatus.SUCCESS).send({ message: messages.GET_CATEGORIES, categories });
  }
  catch (err) {
    next(err);
  }
}