const express = require("express");
require("dotenv").config();
const auth = require('./routes/auth');
const userRoutes = require('./routes/user_routes');
const categoryRoutes = require('./routes/category_routes');
const productRoutes = require('./routes/product_routes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const app = express();

//DB
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( () => console.log("Db Connected"));


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


//routes middlewares
app.use('/api', auth);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


const port  = process.env.PORT || 8000;

app.listen(port, () => {''
    console.log(`Server is running on port ${port}`);
});

