import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import userRouter from './routes/user.route'
import restaurantRouter from './routes/restaurant.route';
import itemRouter from './routes/item.route';
import orderRouter from './routes/order.route';
import mongoose from 'mongoose'
const app = express();

const uri = 'mongodb+srv://root:root123@cluster0-bareu.mongodb.net/sampleTest1?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

require('./config/passport');

app.use(passport.initialize());

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', userRouter);
app.use('/', restaurantRouter);
app.use('/', itemRouter);
app.use('/', orderRouter);

app.listen(5000);
console.log("Grubhub Server listening on port 5000");

module.exports = app;
