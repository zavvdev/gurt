import { Request, Response, Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ApiResponseMessage, ReqBody } from '../types';
import { responseService } from '../services/ResponseService';
import { fileService } from '../services/FileService';
import { _ } from '../routes/_';

const rootRouter = Router();

rootRouter.post(
  '/upload',
  _((req: Request, res: Response) => {
    const file = req.files?.file as UploadedFile;

    if (!file) {
      return res
        .status(400)
        .send(responseService.error(ApiResponseMessage.InvalidRequest));
    }

    const { name } = fileService.upload(file);

    return res.send(
      responseService.success({
        name,
      }),
    );
  }),
);

rootRouter.post(
  '/user/folder',
  _((req: ReqBody<{ userId: number | string }>, res: Response) => {
    fileService.createUserDirectory(req.body.userId);
    return res.send(responseService.success());
  }),
);

export { rootRouter };
