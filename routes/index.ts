import { Router } from 'express';
import { userRouter } from './user.route';
import { authRouter } from './auth.route';

export default function () {
  const router = Router();
  
  router.use('/auth', authRouter);
  router.use('/user', userRouter);

  return router;
}