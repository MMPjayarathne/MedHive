const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan =  require('morgan');
const mongoose = require('mongoose')
const cors = require('cors');
const authJwt = require('./helpers/jwt')
require('dotenv/config');
const api = process.env.API_URL;
app.use(express.json());
app.use(cors());
app.options('*',cors());
app.use(authJwt);


const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
/*const ordersRouter = require('./routers/orders');
const orderItemsRouter = require('./routers/orderItems');
 */



//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`,productsRouter)
app.use(`${api}/category`,categoriesRouter)
app.use(`${api}/user`,usersRouter)





mongoose.connect(process.env.CONNECTION_STRING,{
    dbName : 'Medhive'
}).then(()=>{
    console.log("Database connection successful!");
}).catch((err)=>{
    console.log(err);
})

app.listen(8080,()=>{
   
    console.log('Server is runnig http://localhost:8080');
})