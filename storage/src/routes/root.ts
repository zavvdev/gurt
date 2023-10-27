import { Request, Response, Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ApiResponseMessage, ReqBody } from '../types';
import { responseService } from '../services/ResponseService';
import { fileService } from '../services/FileService';
import { _ } from '../routes/_';

const rootRouter = Router();

rootRouter.post(
  '/file',
  _(async (req: ReqBody<{ userId: string | number }>, res: Response) => {
    const file = req.files?.file as UploadedFile;
    const id = req.body.userId;

    if (!file || !id) {
      return res
        .status(400)
        .send(responseService.error(ApiResponseMessage.InvalidRequest));
    }

    const { name } = await fileService.upload(file, id);

    return res.send(
      responseService.success({
        name,
      }),
    );
  }),
);

rootRouter.delete(
  '/file/:userId/:fileName',
  _((req: ReqBody<{ userId: string | number }>, res: Response) => {
    const id = req.params.userId;
    const fileName = req.params.fileName;

    if (!id || !fileName) {
      return res
        .status(400)
        .send(responseService.error(ApiResponseMessage.InvalidRequest));
    }

    fileService.delete(fileName, id);
    return res.send(responseService.success());
  }),
);

rootRouter.delete(
  '/folder/:userId',
  _((req: Request, res: Response) => {
    const id = req.params.userId;

    if (!id) {
      return res
        .status(400)
        .send(responseService.error(ApiResponseMessage.InvalidRequest));
    }

    fileService.deleteDir(id);
    return res.send(responseService.success());
  }),
);

export { rootRouter };
