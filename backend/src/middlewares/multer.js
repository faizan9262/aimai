import multer from "multer";
import streamifier from "streamifier";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

const memoryStorage = multer.memoryStorage();

class CloudinaryStorage {
  constructor(opts) {
    this.cloudinary = opts.cloudinary;
    this.folder = opts.folder || "";
    this.allowedFormats = opts.allowedFormats || ["jpg", "jpeg", "png"];
  }

  _handleFile(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"));
    }

    if (!file.buffer) {
      return cb(new Error("File buffer is missing"));
    }

    const uploadStream = this.cloudinary.uploader.upload_stream(
      {
        folder: this.folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return cb(error);
        cb(null, {
          path: result.secure_url,
          filename: result.public_id,
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  }

  _removeFile(req, file, cb) {
    cb(null);
  }
}

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  folder: "Melodify",
  allowedFormats: ["jpg", "jpeg", "png"],
});

const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
});

const originalSingle = upload.single.bind(upload);
upload.single = function (fieldName) {
  const multerMiddleware = originalSingle(fieldName);
  return (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err) return next(err);
      if (!req.file) return next(new Error("No file provided"));

      cloudinaryStorage._handleFile(req, req.file, (error, info) => {
        if (error) return next(error);
        req.file = { ...req.file, ...info };
        next();
      });
    });
  };
};

export default upload;
