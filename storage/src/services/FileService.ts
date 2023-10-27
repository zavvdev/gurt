import fs from 'fs';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { ApiResponseMessage, UserId } from '../types';
import { CONFIG } from '../config';
import { generateFileName, getFileExtension, mbToBytes } from '../utilities';

class FileService {
  public async upload(file: UploadedFile, userId: UserId) {
    const name = generateFileName(getFileExtension(file.name));
    const fullPath = path.join('public', String(userId), name);

    if (file.size > mbToBytes(CONFIG.fileSizeLimitMb)) {
      throw new Error(ApiResponseMessage.FileTooBig);
    }

    await file.mv(fullPath);

    return {
      name,
    };
  }

  public delete(fileName: string, userId: UserId) {
    const dir = `/${path.join('public', String(userId), fileName)}`;
    fs.unlinkSync(dir);
  }

  public deleteDir(userId: UserId) {
    const dir = `/${path.join('public', String(userId))}`;
    fs.rmdirSync(dir, { recursive: true });
  }
}

export const fileService = new FileService();
