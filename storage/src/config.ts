export const CONFIG = {
  port: process.env.PORT || 8000,
  fileSizeLimitMb: Number(process.env.FILE_SIZE_LIMIT_MB) || 5,
};
