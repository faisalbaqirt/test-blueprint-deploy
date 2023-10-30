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
