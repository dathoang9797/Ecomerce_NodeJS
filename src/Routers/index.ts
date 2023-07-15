import express from 'express';
import { createProduct, getAllProducts } from '@Controllers/ProductController'
export const rootRouter = express.Router();

/* #region Product */
rootRouter.get('/products', getAllProducts)

rootRouter.post('/products', createProduct)
/* #endregion */