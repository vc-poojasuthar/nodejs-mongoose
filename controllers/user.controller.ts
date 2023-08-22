import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export async function registerUser(req: Request, res: Response) {
  try {
    if (!req.body.email) {
      return res.status(400).send('Email is required!');
    }
    const data = await userService.registration(req.body);    
    return res.status(200).send(data);
  }
  catch (err) {
    return res.status(500).send(err || 'Something went wrong!');
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const search = req.query.search;
    // const condition = search ?
    //     {
    //          name: search 
    //         // $or: [
    //         //     { name: search },
    //         //     { email: search }
    //         // ]
    //     } : null;
    //       const condition = search ? {
    //           [Op.or]: [
    //               {
    //                   name: { [Op.like]: `%${search}%` }
    //               },
    //               {
    //                   email: { [Op.like]: `%${search}%` }
    //               }
    //           ]
    //       } : null

    //         const query = {};
    // if (search) {
    //   query.$text = { $search: search, $language: "en" };
    // }



    const condition = null;
    console.log("condition", condition);

    const users = await userService.getUsers(condition);
    return res.send({data: users});
  }
  catch (err) {
    return res.status(500).send({ 
      message: 'Something went wrong!' 
    });
  }
}

export async function getUserById(req: Request, res: Response): Promise<any> {
  try {
    const user = await userService.getUserById(req.params.id);
    res.send(JSON.stringify(user));
  }
  catch (err) {
    res.status(500).send({
      message: "Some error occurred while finding the user."
    });
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
    res.status(500).send({
      message: "Some error occurred while updating the user."
    });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<any> {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.send(JSON.stringify(user));
  }
  catch (err) {
    res.status(500).send({
      message: "Some error occurred while deleting the user."
    });
  }
}