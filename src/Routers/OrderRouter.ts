import express, { Response, Request, NextFunction } from 'express';
import { AppErrorHandling } from '@Utils/AppErrorHanding';
import { catchError, } from '@Utils';
import { OrderModel, IOrder } from '@Models/OrderModel';
import { OrderItemModel, IOrderItem } from '@Models/OrderItemModel';
import { IProduct } from '@Models/ProductModel';

export const OrderRouter = express.Router();

OrderRouter.get('/', catchError(async (req: Request, res: Response, next: NextFunction) => {
    let listOrder = await OrderModel.find().populate('user', 'name').sort({ 'dateOrdered': -1 });
    if (!listOrder)
        return next(new AppErrorHandling('Not Found listOrder', 500));
    res.status(200).send(listOrder);
}))

OrderRouter.get('/totalsales', catchError(async (req: Request, res: Response, next: NextFunction) => {
    const totalSales = await OrderModel.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])

    if (!totalSales)
        return next(new AppErrorHandling('Not Found total sales', 500));

    res.status(200).send({ totalSales: totalSales.pop().totalsales });
}))

OrderRouter.get('/counts', catchError(async (req: Request<{ id: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    const orderCount = await OrderModel.countDocuments();
    if (!orderCount)
        return next(new AppErrorHandling('Not Found order count', 500));
    res.status(200).send({ orderCount });
}))

OrderRouter.get('/user_order/:userId', catchError(async (req: Request<{ userId: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    let userOrderList = await OrderModel.find({ user: req.params.userId }).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: 'category'
        }
    }).sort({ 'dateOrdered': -1 });

    if (!userOrderList)
        return next(new AppErrorHandling('Not Found order count', 500));

    const totalCount = userOrderList?.length ?? 0;
    res.status(200).send({ userOrderList, totalCount });
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
    res.status(200).send(listOrder);
}))

OrderRouter.post('/', catchError(async (req: Request<{}, {}, IOrder>, res: Response, next: NextFunction) => {
    const {
        orderItems, shippingAddress1, shippingAddress2,
        city, country, zip, phone, status, user
    } = req.body;

    const orderItemsIds: Array<IOrderItem['id']> = await Promise.all(orderItems.map(async order => {
        const orderItem = order as unknown as IOrderItem;
        const orderItemNew = new OrderItemModel({
            product: orderItem.product,
            quantity: orderItem.quantity
        })
        await orderItemNew.save();
        return orderItemNew._id;
    }))

    const listPriceOrderItem: Array<number> = await Promise.all(orderItemsIds.map(async id => {
        let orderItem = await OrderItemModel.findById(id);
        orderItem = await orderItem.populate('product', 'price');
        const product = orderItem.product as unknown as IProduct;
        const totalPrice = product.price * orderItem.quantity;
        return totalPrice;
    }));

    const totalPrice = listPriceOrderItem.reduce((a, b) => a + b, 0);

    const order = new OrderModel({
        orderItems: orderItemsIds, shippingAddress1, shippingAddress2,
        city, country, zip, phone, status, totalPrice, user
    })

    await order.save();
    if (!order)
        return next(new AppErrorHandling('The order cannot be created', 500));

    return res.status(200).json({ status: 'success', data: order });
}))

OrderRouter.put('/:id', catchError(async (req: Request<{ id: string }, {}, IOrder>, res: Response, next: NextFunction) => {
    const orderUpdate = await OrderModel.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true })

    if (!orderUpdate)
        return next(new AppErrorHandling('The status order cannot be updated', 500));

    return res.status(200).json({ status: 'success', data: orderUpdate });
}))

OrderRouter.delete('/:id', catchError(async (req: Request<{ id: string }, {}, IOrder>, res: Response, next: NextFunction) => {
    const order = await OrderModel.findByIdAndRemove(req.params.id);
    if (!order)
        return next(new AppErrorHandling('Order not found', 500));

    await Promise.all(order.orderItems.map(async orderItem => {
        console.log({ orderItem })
        await OrderItemModel.findByIdAndRemove(orderItem)
    }))

    return res.status(200).json({ status: 'success', message: 'the order is deleted!' });
}))