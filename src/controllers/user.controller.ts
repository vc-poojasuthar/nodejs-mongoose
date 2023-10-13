import { NextFunction, Request, Response } from 'express';
import { messages } from '../config/api-messages';
import { HttpStatus } from '../config/http-status';
import * as userService from '../services/user.service';
import mailService from '../services/mail.service';
import { verifyToken } from '../middleware/jwt.validation';
import { Defaults } from '../config/default.config';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.login(req.body);
    return res.status(HttpStatus.SUCCESS).send({ data: users });
  }
  catch (err) {
    next(err);
  }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.registration(req.body);
    const invitationData = {
      activationLink: `${Defaults.ACTIVATE_LINK}${user.token}`
    };
    await mailService.sendActivationEmail(
      user.email,
      messages.ACTIVATE_ACCOUNT_TITLE,
      Defaults.INVITE_USER_KEY, invitationData
    );
    return res.status(HttpStatus.SUCCESS).send({ message: messages.USER_REGISTER_SUCCESS, user });
  }
  catch (err) {
    next(err);
  }
}

export async function activateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.params;
    const decodedToken = verifyToken(token);

    await userService.activateUser(decodedToken.userId);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.USER_ACTIVATED });
  }
  catch (err) {
    next(err);
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const user = await userService.forgotPassword(email);
    const link = {
      activationLink: `${Defaults.RESET_PASSWORD_LINK}${user.token}`
    };
    await mailService.sendActivationEmail(
      user.email,
      messages.RESET_PASSWORD_TITLE,
      Defaults.FORGOT_PASSWORD_KEY, 
      link
    );
    return res.status(HttpStatus.SUCCESS).send({ message: messages.RESET_PASSWORD_SUCCESS, user });
  }
  catch (err) {
    next(err);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.params;
    const password = req.body.password;
    const decodedToken = verifyToken(token);
    const user = await userService.resetPassword(decodedToken.userId, password);
    return res.status(HttpStatus.SUCCESS).send({ message: messages.RESET_PASSWORD_SUCCESS, user });
  }
  catch (err) {
    next(err);
  }
}


export async function getUsers(req: Request, res: Response, next: NextFunction) {
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
          { email: new RegExp(searchTerm, 'i') },
          { firstName: new RegExp(searchTerm, 'i') },
          { lastName: new RegExp(searchTerm, 'i') }
        ]
      };
    }
    const users = await userService.getUsers(query, page, limit, sortField, sortOrder);
    return res.status(HttpStatus.SUCCESS).send({ data: users });
  }
  catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const user = await userService.getUserById(req.params.id);
    res.send(JSON.stringify(user));
  }
  catch (err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
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
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.send(JSON.stringify(user));
  }
  catch (err) {
    next(err);
  }
}