import express, { Response, Request, NextFunction } from 'express';
import { AppErrorHandling } from '@Utils/AppErrorHanding';
import { catchError } from '@Utils';
import { CategoryModel, ICategory } from '@Models/CategoryModel';
export const CategoryRouter = express.Router();

CategoryRouter.get('/', catchError(async (req: Request, res: Response, next: NextFunction) => {
    const listCategory = await CategoryModel.find();
    if (!listCategory)
        return next(new AppErrorHandling('Not Found Category', 500));
    res.status(200).send(listCategory);
}))

CategoryRouter.get('/:id', catchError(async (req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction) => {
    const category = await CategoryModel.findById(req.params.id);
    if (!category)
        return next(new AppErrorHandling('The category with the given ID was not found.', 500));
    res.status(200).send(category);
}))

CategoryRouter.post('/', catchError(async (req: Request<{}, {}, ICategory>, res: Response, next: NextFunction) => {
    const category = new CategoryModel({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        image: req.body.image
    })

    if (!category)
        return next(new AppErrorHandling('The category cannot be created', 500));

    await category.save();
    return res.status(200).json({ status: 'success', data: category });
}))

CategoryRouter.put('/:id', catchError(async (req: Request<{ id: string }, {}, ICategory>, res: Response, next: NextFunction) => {
    const categoryUpdate = await CategoryModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }, { new: true })

    if (!categoryUpdate)
        return next(new AppErrorHandling('The category cannot be updated', 500));

    return res.status(200).json({ status: 'success', data: categoryUpdate });
})
)

CategoryRouter.delete('/:id',  catchError(async (req: Request<{ id: string }, {}, ICategory>, res: Response, next: NextFunction) => {
    const category = await CategoryModel.findByIdAndRemove(req.params.id);
    if (!category)
        return next(new AppErrorHandling('Category not found', 500));

    return res.status(200).json({ status: 'success', message: 'the category is deleted!' });
}))