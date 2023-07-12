import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

import { ErrorController } from '@Controllers/ErrorController';
import { rootRouter } from '@Routers/RootRouter';
import { MessageLog } from '@Utils/MessageLog';

const { errorRequestManyTime } = MessageLog;
const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: errorRequestManyTime
});

//Set Security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use('/api', limiter);
}

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

app.use('/api/v1', rootRouter);
app.all('*', (req, res, next) => {
  res.status(404).json('Error 404');
});
app.use(ErrorController);
export default app;
