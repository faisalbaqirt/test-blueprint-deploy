const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
exports.uploadCloudinary = async (gambar, folderName) => {
    try {
        const result = await cloudinary.uploader.upload(gambar, {
            folder: folderName, // Folder di Cloudinary
            use_filename: true, // Menggunakan nama file asli
            unique_filename: false // Hindari penamaan unik
        });

        return result.url;
      } catch (error) {
        // Tangani kesalahan jika ada
        throw error;
      }
  };
