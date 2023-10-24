import express, { Express, static as static_ } from 'express';
import { config as configureDotenv } from 'dotenv';
import fileUpload from 'express-fileupload';
import { CONFIG } from './config';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { rootRouter } from './routes/root';

configureDotenv();

const app: Express = express();
const port = CONFIG.port;

app.use(static_('public'));
app.use(fileUpload());
app.use('/', rootRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
