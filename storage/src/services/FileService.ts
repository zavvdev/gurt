import fs from 'fs';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { ApiResponseMessage, UserId } from '../types';
import { CONFIG } from '../config';
import { generateFileName, getFileExtension, mbToBytes } from '../utilities';

class FileService {
  public async upload(file: UploadedFile, userId: UserId) {
    const name = generateFileName(getFileExtension(file.name));
    const folderPath = path.join('public', String(userId));
    const fullPath = path.join(folderPath, name);

    if (file.size > mbToBytes(CONFIG.fileSizeLimitMb)) {
      throw new Error(ApiResponseMessage.FileTooBig);
    }

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    await file.mv(fullPath);

    return {
      name,
    };
  }

  public delete(fileName: string, userId: UserId) {
    const dir = `${path.join('public', String(userId), fileName)}`;
    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  }

  public deleteDir(userId: UserId) {
    const dir = `${path.join('public', String(userId))}`;
    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
    }
  }
}

export const fileService = new FileService();
