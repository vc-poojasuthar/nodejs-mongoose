import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { messages } from '../_helper/messages';

export async function login(req: Request, res: Response) {
  try {
    if (!req.body.email) {
      return res.status(400).send({ message: messages.EMAIL_REQUIRED });
    }
    if (!req.body.password) {
      return res.status(400).send({ message: messages.PASSWORD_REQUIRED });
    }
    const users = await userService.login(req.body);
    return res.status(200).send({ data: users });
  }
  catch (err) {
    return res.status(500).send({ message: messages.COMMON_ERR });
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    if (!req.body.email) {
      return res.status(400).send({ message: messages.EMAIL_REQUIRED });
    }
    const data = await userService.registration(req.body);
    return res.status(200).send(data);
  }
  catch (err) {
    return res.status(500).send({ message: messages.COMMON_ERR });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const searchTerm = req.query.search as string;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 2;
    const sortField = req.query.sortBy as string ?? 'createdAt';
    const sortOrder = req.query.sortOrder ? parseInt(req.query.sortOrder as string, 10) : -1;

    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { email: new RegExp(searchTerm, 'i') },
          { firstName: new RegExp(searchTerm, 'i') },
          { lastName: new RegExp(searchTerm, 'i') }
        ]
      };
    }
    const users = await userService.getUsers(query, page, limit, sortField, sortOrder);
    return res.status(200).send({ data: users });
  }
  catch (err) {
    return res.status(500).send({ message: messages.COMMON_ERR });
  }
}

export async function getUserById(req: Request, res: Response): Promise<any> {
  try {    
    const user = await userService.getUserById(req.params.id);
    res.send(JSON.stringify(user));
  }
  catch (err) {
    res.status(500).send({ message: messages.USER_FETCH_ERR });
  }
}
export async function updateUser(req: Request, res: Response): Promise<any> {
  try {
    const data = {
      email: req.body.email,
      name: req.body.name,
      type: req.body.type,
      gender: req.body.gender,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    };
    const user = await userService.updateUser(req.params.id, data);
    res.send(JSON.stringify(user));
  }
  catch (err) {
    res.status(500).send({ message: messages.USER_UPDATE_ERR });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<any> {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.send(JSON.stringify(user));
  }
  catch (err) {
    res.status(500).send({ message: messages.USER_DELETE_ERR });
  }
}