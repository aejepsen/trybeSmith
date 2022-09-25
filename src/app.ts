import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import routers from './router/routers';

const app = express();

app.use(express.json());

app.use(routers);
app.use(errorMiddleware);

export default app;
