import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const pastaTemp = path.resolve(__dirname, '..', '..', 'temp');

export default {
  diretorio: pastaTemp,

  storage: multer.diskStorage({
    destination: pastaTemp,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
