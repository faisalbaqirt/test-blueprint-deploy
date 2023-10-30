const express = require('express');
const router = express.Router();
const multer = require('multer')
const ProductController = require('../controllers/productController');


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage})

router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', upload.single('gambar'), ProductController.createProducts);
router.put('/:id', upload.single('gambar'), ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router;