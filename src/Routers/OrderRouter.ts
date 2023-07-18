import express, { Response, Request, NextFunction } from 'express';
import { AppErrorHandling } from '@Utils/AppErrorHanding';
import { catchError, } from '@Utils';
import { OrderModel, IOrder } from '@Models/OrderModel';
import { OrderItemModel } from '@Models/OrderItemModel';

export const OrderRouter = express.Router();

OrderRouter.get('/', catchError(async (req: Request, res: Response, next: NextFunction) => {
    let listOrder = await OrderModel.find().populate('user', 'name').sort({ 'dateOrdered': -1 });
    if (!listOrder)
        return next(new AppErrorHandling('Not Found listOrder', 500));
    res.send(listOrder);
}))

OrderRouter.get('/:id', catchError(async (req: Request<{ id: string }, {}, IOrder>, res: Response, next: NextFunction) => {
    let listOrder = await OrderModel.findById(req.params.id);
    listOrder = await listOrder.populate('user', 'name');
    listOrder = await listOrder.populate({
        path: 'orderItems', populate: {
            path: 'product', populate: 'category'
        }
    });

    if (!listOrder)
        return next(new AppErrorHandling('Not Found listOrder', 500));
    res.send(listOrder);
}))

OrderRouter.post('/', catchError(async (req: Request<{}, {}, IOrder>, res: Response, next: NextFunction) => {
    const {
        orderItems, shippingAddress1, shippingAddress2,
        city, country, zip, phone, status, totalPrice, user
    } = req.body;

    const orderItemsIds = await Promise.all(orderItems.map(async order => {
        const orderItemNew = new OrderItemModel({
            product: order.product,
            quantity: order.quantity
        })
        await orderItemNew.save();
        return orderItemNew._id;
    }))

    const order = new OrderModel({
        orderItems: orderItemsIds, shippingAddress1, shippingAddress2,
        city, country, zip, phone, status, totalPrice, user
    })

    await order.save();
    if (!order)
        return next(new AppErrorHandling('The order cannot be created', 500));

    return res.status(200).json({ status: 'success', data: order });
}))