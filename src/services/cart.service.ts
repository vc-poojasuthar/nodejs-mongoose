import CartDetail, { ICartDetailModel } from "../models/cart-detail.model";

export function addItemToCart(body: ICartDetailModel) {
  return CartDetail.create(body);
}

export function deleteItemFromCart(cartId: string) {
  return CartDetail.deleteOne({ _id: cartId });
}

export function updateCartItemQty(cartId: string, body: any) {
  return CartDetail.findByIdAndUpdate({ _id: cartId }, body, { new: true, strict: false });
}

export function getCartDetailByUserId(id: string) {
  return CartDetail.find({ userId: id });
}