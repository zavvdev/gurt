import express, { Request, Response } from "express";
import { _ } from "./_";
import { UploadedFile } from "express-fileupload";
import { ApiResponseMessage } from "../types";
import { responseService } from "../services/ResponseService";
import { fileService } from "../services/FileService";

const rootRouter = express.Router();

rootRouter.post(
  "/upload",
  _((req: Request, res: Response) => {
    const file = req.files?.file as UploadedFile;

    if (!file) {
      return res
        .status(400)
        .send(responseService.error(ApiResponseMessage.InvalidRequest));
    }

    const { name, fullPath } = fileService.upload(file);

    return res.send(
      responseService.success({
        name,
        fullPath,
      }),
    );
  }),
);

export { rootRouter };
