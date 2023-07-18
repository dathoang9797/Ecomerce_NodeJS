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

UserRouter.get('/counts', catchError(async (req: Request<{ id: string }, {}, IUser>, res: Response, next: NextFunction) => {
    const userCount = await UserModel.countDocuments();
    console.log({ userCount })
    if (!userCount)
        return next(new AppErrorHandling('Not Found User Count', 500));
    res.status(200).send({ userCount });
}))

UserRouter.get('/:id', catchError(async (req: Request<{ id: string }, {}, IUser>, res: Response, next: NextFunction) => {
    const userList = await UserModel.findById(req.params.id).select('-passwordHash');
    if (!userList)
        return next(new AppErrorHandling('Not Found userList', 500));
    res.status(200).send(userList);
}))


UserRouter.post('/register', catchError(async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
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
        console.log(process.env.SECRET, { id, isAdmin })
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
        }, process.env.SECRET, { expiresIn: '1d' })
        return res.status(200).send({ user: email, token });
    } else {
        return res.status(200).send('Password is wrong');
    }
}))

UserRouter.delete('/:id', catchError(async (req: Request<{ id: string }, {}, IUser>, res: Response, next: NextFunction) => {
    const user = await UserModel.findByIdAndRemove(req.params.id);
    if (!user)
        return next(new AppErrorHandling('User not found', 500));

    return res.status(200).json({ status: 'success', message: 'The user is deleted!' });
}))