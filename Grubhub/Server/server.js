const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.raw());
app.use(bodyParser.text());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, poolSize: 4});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

 const userRouter = require('./routes/user.route');
 const itemRouter = require('./routes/item.route');

 app.use('/', userRouter);
 app.use('/', itemRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});