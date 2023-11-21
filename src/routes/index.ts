import { Router } from 'express';
import { userRouter } from './user.route';
import { authRouter } from './auth.route';
import { productRouter } from './product.route';
import { cartRouter } from './cart.route';

export default function () {
  const router = Router();

  router.use('/auth', authRouter);
  router.use('/user', userRouter);
  router.use('/product', productRouter);
  router.use('/cart', cartRouter);

  return router;
}