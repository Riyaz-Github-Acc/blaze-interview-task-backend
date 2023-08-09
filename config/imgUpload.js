import multer from "multer";
import cloudinaryPackage from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();
const cloudinary = cloudinaryPackage.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpge", "jpg", "png"],
  params: {
    folder: "test",
  },
});

const imgUpload = multer({
  storage,
});

export default imgUpload;
