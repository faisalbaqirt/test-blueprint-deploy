const fs = require('fs')
const cloudinaryService = require("../services/cloudinaryService");
const ProductModel = require("../models/productModel");

class ProductController {
  async getAllProducts(req, res) {
    try {
      const data = await ProductModel.getAllProducts();
      res.json({ status: 200, data });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const data = await ProductModel.getProductById(req.params.id);
      if (!data) {
        res.json({ status: 404, message: "Produk tidak ditemukan!" });
      }
      res.json({ status: 200, data });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  async createProducts(req, res) {
    try {
        const { name, description, price } = req.body;
        const gambar = req.file.path; // Menggunakan buffer gambar
  
        // Mengunggah gambar ke Cloudinary ke dalam folder 'produk'
        const folderName = 'products';
        const imageURL = await cloudinaryService.uploadCloudinary(gambar, folderName);

        fs.unlinkSync(gambar);
      // Menyimpan data produk ke database
      await ProductModel.createProduct({
        name,
        description,
        price,
        gambar: imageURL,
      });

      res
        .status(201)
        .json({ message: "Produk berhasil ditambahkan", imageURL });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambahkan produk" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { name, description, price } = req.body;
      const gambar = req.file.path;

      // Mengunggah gambar ke Cloudinary ke dalam folder 'produk'
      const folderName = "products";
      const imageURL = await cloudinaryService.uploadCloudinary(
        gambar,
        folderName
      );
      fs.unlinkSync(gambar);

      await ProductModel.updateProduct(
        req.params.id,
        name,
        description,
        price,
        imageURL
      );
      res
        .status(201)
        .json({ status: 201, message: "Produk berhasil diperbarui!" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = await ProductModel.deleteProduct(req.params.id);
      res
        .status(201)
        .json({ status: 201, message: "Produk berhasil dihapus!" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }
}

module.exports = new ProductController();
