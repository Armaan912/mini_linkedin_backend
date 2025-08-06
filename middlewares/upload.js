import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isProfileUpload = req.originalUrl.includes('register');
    const folder = isProfileUpload ? 'uploads/profile' : 'uploads/posts';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const isValid = allowed.test(file.mimetype);
  cb(null, isValid);
};

const upload = multer({ storage, fileFilter });

export default upload;
