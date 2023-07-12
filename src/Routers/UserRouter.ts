import { User } from '@Core/Models/User';
import { UserModel } from '@Models/UserModels';
import express, { Request, Response } from 'express';
import isEmpty from 'lodash/isEmpty';
import bcrypt from 'bcrypt';

export const routerUser = express.Router();

routerUser.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to xedike',
  });
});

routerUser.post('/register', async (req: Request<{}, {}, User>, res: Response) => {
  try {
    if(isEmpty(req.body)) return res.status(400).json('Body Should not empty'); 
    const { dateOfBird, fullName, email, password, phone, registerDay, userType } = req.body;
    const users = await UserModel.find({ $or: [{ email }, { phone }] });
    if (users?.length > 0) {
      const userLength = users.length;
      for (let index = 0; index < userLength; index++) {
        if ((users[index].email = email)) return res.status(400).json('Email already exist');
        if ((users[index].email = email)) return res.status(400).json('Phone already exist');
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({ dateOfBird, fullName, email, password:hashPassword, phone, registerDay, userType });
    await newUser.save();
    return res.status(200).json({ newUser });
  } catch (error) {
    const err = error as Error;
    console.log(err.stack);
  }
});
