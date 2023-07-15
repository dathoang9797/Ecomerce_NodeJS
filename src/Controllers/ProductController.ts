import { Request, Response, NextFunction } from 'express';
import { catchError, AppErrorHandling } from '@Utils';
import { ProductModel } from '@Models/ProductModel';
import { IProduct } from '@Core/Models';


export const getAllProducts = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const productList = await ProductModel.find();
    if (!productList)
        return next(new AppErrorHandling('Not Found ProductList', 500));
    res.send(productList);
})

export const createProduct = catchError(async (req: Request<{}, {}, IProduct>, res: Response, next: NextFunction) => {
    const product = new ProductModel({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    if (!product)
        return next(new AppErrorHandling('errorCreateProduct', 500));

    await product.save();
    return res.status(200).json({ status: 'success', data: product });
})