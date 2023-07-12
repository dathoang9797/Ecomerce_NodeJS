import express from 'express';
export const rootRouter = express.Router();

/* #region Product */
rootRouter.get('/products', (req, res) => {
    console.log('debug')
})

rootRouter.post('/products', (req, res) => {
    console.log('debug')
})
/* #endregion */