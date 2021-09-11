import  crypto  from 'crypto';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + 
        ' - ' +
        crypto.randomBytes(6).toString('hex') + 
        path.extname(file.originalname))
    }
});

export default multer({storage});
