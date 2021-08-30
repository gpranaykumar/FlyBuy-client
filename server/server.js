const express   = require('express');
const mongoose  = require('mongoose');
const config    = require('config')

const authRoutes    = require('./routes/auth');
const itemRoutes    = require('./routes/item');
const cartRoutes    = require('./routes/cart');
//const orderRoutes    = require('./routes/order');

const app = express();
app.use(express.json());

const cors = require("cors")
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', itemRoutes);
app.use('/api', cartRoutes);
//app.use('/api', orderRoutes);

const dbURI = config.get('dbURI');
const port  = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        app.listen(port);
        console.log(`server running on port ${port}`);
    })
    .catch(err => console.log(err));