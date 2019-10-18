const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

 const userRouter = require('./routes/user');
 const itemRouter = require('./routes/item')

 app.use('/', userRouter);
 app.use('/', itemRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});