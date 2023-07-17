import express, { Response, Request, NextFunction } from 'express';
import { AppErrorHandling } from '@Utils/AppErrorHanding';
import { catchError, } from '@Utils';
import { UserModel, IUser } from '@Models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const UserRouter = express.Router();

UserRouter.get('/', catchError(async (req: Request, res: Response, next: NextFunction) => {
    const userList = await UserModel.find().select('-passwordHash');
    if (!userList)
        return next(new AppErrorHandling('Not Found userList', 500));
    res.status(200).send(userList);
}))

UserRouter.get('/:id', catchError(async (req: Request<{ id: string }, {}, IUser>, res: Response, next: NextFunction) => {
    const userList = await UserModel.findById(req.params.id).select('-passwordHash');
    if (!userList)
        return next(new AppErrorHandling('Not Found userList', 500));
    res.status(200).send(userList);
}))

UserRouter.post('/', catchError(async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    const {
        name, email, apartment, city, country, isAdmin,
        passwordHash, phone, street, zip
    } = req.body;

    const hashPasswrod = bcrypt.hashSync(passwordHash, 10);
    const user = new UserModel({
        name, email, apartment, city, country, isAdmin,
        passwordHash: hashPasswrod, phone, street, zip
    })

    if (!user)
        return next(new AppErrorHandling('The prodcut cannot be created', 500));

    await user.save();
    return res.status(200).json({ status: 'success', data: user });
}))

UserRouter.post('/login', catchError(async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    const { email, passwordHash, id, isAdmin } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user)
        return next(new AppErrorHandling('The User not found', 400));

    if (user && passwordHash && bcrypt.compareSync(passwordHash, user.passwordHash)) {
        const token = jwt.sign({
            userID: id,
            isAdmin
        }, process.env.SECRET, { expiresIn: '1d' })
        return res.status(200).send({ user: email, token });
    } else {
        return res.status(200).send('Password is wrong');
    }
}))