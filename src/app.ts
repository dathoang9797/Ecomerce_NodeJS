import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { ErrorController } from '@Controllers/ErrorController';
import { CategoryRouter } from '@Routers/CategoryRouter';
import { OrderRouter } from '@Routers/OrderRouter';
import { ProductRouter } from '@Routers/ProductRouter';
import { UserRouter } from '@Routers/UserRouter';
import { MessageLog } from '@Utils/MessageLog';
import { authJwt } from '@Utils/Token';

const { errorRequestManyTime } = MessageLog;
const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: errorRequestManyTime
});

//Allow CORS
app.use(cors());
app.options('*', cors());

//Set Security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use('/api', limiter);
}

app.use(authJwt());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use('/static', express.static('public'));
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(hpp({ whitelist: [] }));

app.use(`/api/v1/categories`, CategoryRouter);
app.use(`/api/v1/products`, ProductRouter);
app.use(`/api/v1/users`, UserRouter);
app.use(`/api/v1/orders`, OrderRouter);
app.use(ErrorController);

app.all('*', (req, res, next) => {
  res.status(404).json('Error 404');
});
export default app;
