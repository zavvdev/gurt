import { UploadedFile } from "express-fileupload";
import path from "path";
import { generateFileName, getFileExtension } from "../utilities";
import { CONFIG } from "../config";
import { ApiResponseMessage } from "../types";

class FileService {
  public upload(file: UploadedFile) {
    const name = generateFileName(getFileExtension(file.name));
    const fullPath = path.join("public", name);

    if (file.size > CONFIG.fileSizeLimitMb * 1024 * 1024) {
      throw new Error(ApiResponseMessage.FileTooBig);
    }

    file.mv(fullPath, (err) => {
      if (err) {
        throw err;
      }
    });

    return {
      name,
      fullPath,
    };
  }
}

export const fileService = new FileService();
