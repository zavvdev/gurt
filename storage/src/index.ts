import express, { Express, static as static_ } from 'express';
import { config as configureDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { CONFIG } from './config';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { rootRouter } from './routes/root';

configureDotenv({
  path: `.env.${process.env.NODE_ENV}`,
});

const app: Express = express();
const port = CONFIG.port;

app.use(static_('public'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', rootRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
