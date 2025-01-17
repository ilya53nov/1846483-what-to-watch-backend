import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';
import mime from 'mime';

import {MiddlewareInterface} from '../../types/middleware.interface.js';
import { ImageValidation } from '../../types/image-validation.enum.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);

        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({
      storage: storage,
      fileFilter: (_req, file, cb) => {
        const extension = mime.extension(file.mimetype);

        cb(null, extension === ImageValidation.PNG || extension === ImageValidation.JPEG);
      }
    })
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
