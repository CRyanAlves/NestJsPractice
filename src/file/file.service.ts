import { Injectable } from '@nestjs/common';
import { writeFile, unlink } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    return writeFile(path, file.buffer);
  }

  async deleteUpload(path: string) {
    return unlink(path);
  }
}
