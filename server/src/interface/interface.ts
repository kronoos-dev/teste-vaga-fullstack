export interface UploadedFile extends Express.Multer.File {
  buffer: Buffer;
}
