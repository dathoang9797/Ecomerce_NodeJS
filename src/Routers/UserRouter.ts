import express, { Response, Request, NextFunction } from 'express';
import { AppErrorHandling } from '@Utils/AppErrorHanding';
import { catchError, } from '@Utils';
import { ProductModel } from '@Models/ProductModel';

export const UserRouter = express.Router();

UserRouter.get('/', catchError(async (req: Request, res: Response, next: NextFunction) => {
    const productList = await ProductModel.find();
    if (!productList)
        return next(new AppErrorHandling('Not Found ProductList', 500));
    res.send(productList);
}))

UserRouter.post('/', catchError(async (req: Request<{}, {}, any>, res: Response, next: NextFunction) => {
    const product = new ProductModel({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    if (!product)
        return next(new AppErrorHandling('errorCreateProduct', 500));

    await product.save();
    return res.status(200).json({ status: 'success', data: product });
}))