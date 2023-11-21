import Category from '../models/category.model';
import Product, { IProductModel } from '../models/product.model';

export function createProduct(body: IProductModel) {
  return Product.create(body);
}

export async function getProducts(query: any, page: number, limit: number, sortField: string, sortOrder: number) {
  const sortOptions: any = {};
  sortOptions[sortField] = sortOrder;

  const data = await Product.find(query)
  .populate('categoryId')
    .select('-createdAt -updatedAt')
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return data;
}

export function getProductById(id: string) {
  return Product.findById(id).populate('categoryId');
}

export function updateProduct(productId: string, body: any) {
  return Product.findByIdAndUpdate({ _id: productId }, body, { new: true, strict: false });
}

export function deleteProduct(productId: string) {
  return Product.deleteOne({ _id: productId });
}

export function getCategories() {
  return Category.find();
}