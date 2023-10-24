import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { ApiResponseMessage } from '../types';
import { CONFIG } from '../config';
import { generateFileName, getFileExtension, mbToBytes } from '../utilities';

class FileService {
  public upload(file: UploadedFile) {
    const name = generateFileName(getFileExtension(file.name));
    const fullPath = path.join('public', name);

    if (file.size > mbToBytes(CONFIG.fileSizeLimitMb)) {
      throw new Error(ApiResponseMessage.FileTooBig);
    }

    file.mv(fullPath, (err) => {
      if (err) {
        throw err;
      }
    });

    return {
      name,
    };
  }
}

export const fileService = new FileService();
