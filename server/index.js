const express = require('express');
const cors = require('cors')
const passport = require('./lib/passport')
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./openapi.json')

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const productRoute = require('./routes/productRoute')
app.use('/api/products', productRoute)

const orderRoute = require('./routes/orderRoute');
app.use('/api/orders', orderRoute)

const adminRoute = require('./routes/adminRoute')
app.use('/api/admin', adminRoute)

const authRoute = require('./routes/authRoute')
app.use('/api/auth', authRoute)

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`)
})


// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs')


// //atur cloudinary
// cloudinary.config({
//     cloud_name: 'cloud-name',
//     api_key: 'apikey',
//     api_secret: 'apisecret'
// });

// const uploadCloudinary = async (filePath) => {
//     let result;
//     try {
//         result = await cloudinary.uploader.upload(filePath, {
//             use_filename: true
//         })
//         //hapusfile yang sudah diupload
//         fs.unlinkSync(filePath);

//         return result.url;
//     } catch (err) {
//         //hapus file yang gagal upload 
//         fs.unlinkSync(filePath);

//         return null
//     }
// };

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname)
//     }
// });

// const upload = multer({ storage: storage})
