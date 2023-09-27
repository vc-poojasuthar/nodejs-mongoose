import { Router } from 'express';
import { userRouter } from './user';

export default function () {
  const router = Router();
  router.use('/auth', userRouter);

  return router;
}