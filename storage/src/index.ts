import express, { Express } from "express";
import dotenv from "dotenv";
import fileUpload, { UploadedFile } from "express-fileupload";
import { CONFIG } from "./config";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { rootRouter } from "./routes/root";

dotenv.config();

const app: Express = express();
const port = CONFIG.port;

app.use(express.static("public"));
app.use(fileUpload());
app.use("/", rootRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
