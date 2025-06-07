import multer from "multer";
import streamifier from "streamifier";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only .jpg, .jpeg and .png formats are allowed"));
  },
});

export const uploadToCloudinary = (folder = "Melodify") => {
  return async (req, res, next) => {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    try {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) return res.status(500).json({ message: "Upload failed", error });

          req.file = {
            path: result.secure_url,
            filename: result.public_id,
          };
          next();
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      res.status(500).json({ message: "Upload error" });
    }
  };
};

export default upload;
