import { User } from './models'; 

declare module 'express' {
  interface Request {
    user?: User; 
    userId?: string;
  }
}