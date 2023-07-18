import express, { Response, Request, NextFunction } from 'express';
import { AppErrorHandling } from '@Utils/AppErrorHanding';
import { catchError, } from '@Utils';
import { IProduct, ProductModel } from '@Models/ProductModel';
import { CategoryModel } from '@Models/CategoryModel';
import mongoose from 'mongoose';
export const ProductRouter = express.Router();

ProductRouter.get('/', catchError(async (req: Request<{ id: string }, {}, IProduct, { categories: string }>, res: Response, next: NextFunction) => {
    // const productList = await ProductModel.find().select('name image -_id');
    let filter = {};
    if (req.query.categories)
        filter = { category: req.query.categories.split(',') }

    let productList = await ProductModel.find(filter).populate('category');
    if (!productList)
        return next(new AppErrorHandling('Not Found ProductList', 500));

    res.status(200).send(productList);
}))

ProductRouter.get('/counts', catchError(async (req: Request<{ id: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    const productCount = await ProductModel.countDocuments();
    if (!productCount)
        return next(new AppErrorHandling('Not Found Product Count', 500));
    res.status(200).send({ productCount });
}))

ProductRouter.get('/featured', catchError(async (req: Request<{ id: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    const product = await ProductModel.find({ isFeatured: true });
    if (!product)
        return next(new AppErrorHandling('Not Found Product isFeatured', 500));
    res.status(200).send({ product });
}))

ProductRouter.get('/featured/:count', catchError(async (req: Request<{ count: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    const count = Number(req.params.count) ?? 0;
    const product = await ProductModel.find({ isFeatured: true }).limit(count);
    if (!product)
        return next(new AppErrorHandling('Not Found Product isFeatured', 500));
    res.status(200).send({ product });
}))

ProductRouter.get('/:id', catchError(async (req: Request<{ id: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    let productList = await ProductModel.findById(req.params.id);
    if (!productList)
        return next(new AppErrorHandling('Not Found ProductList', 500));

    productList = await productList.populate('category');
    res.status(200).send(productList);
}))

ProductRouter.post('/', catchError(async (req: Request<{}, {}, IProduct>, res: Response, next: NextFunction) => {
    const category = await CategoryModel.findById(req.body.category);
    if (!category)
        return next(new AppErrorHandling('Invalid Category', 400));

    const product = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    await product.save();
    if (!product)
        return next(new AppErrorHandling('The prodcut cannot be created', 500));

    return res.status(200).json({ status: 'success', data: product });
}))

ProductRouter.put('/:id', catchError(async (req: Request<{ id: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return next(new AppErrorHandling('Invalid Product Id', 400));

    const category = await CategoryModel.findById(req.body.category);
    if (!category)
        return next(new AppErrorHandling('Invalid Category', 400));

    const productUpdate = await ProductModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    }, { new: true })

    if (!productUpdate)
        return next(new AppErrorHandling('The Product cannot be updated', 500));

    return res.status(200).json({ status: 'success', data: productUpdate });
}))

ProductRouter.delete('/:id', catchError(async (req: Request<{ id: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    const product = await ProductModel.findByIdAndRemove(req.params.id);
    if (!product)
        return next(new AppErrorHandling('Product not found', 500));

    return res.status(200).json({ status: 'success', message: 'The product is deleted!' });
}))