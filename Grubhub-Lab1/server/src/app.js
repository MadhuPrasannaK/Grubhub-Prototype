//import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import routeUser from '../routes/user';
import routeRestaurant from '../routes/restaurant';
import routeItem from '../routes/item';
import routeOrder from '../routes/order';
var express = require("express");
const app = express();

//load configurations for passport
require('../config/passport');

app.use(passport.initialize());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routeUser);
app.use('/', routeRestaurant);
app.use('/', routeItem)
app.use('/', routeOrder)

app.listen(3001);
console.log("Server listening on port 3001");
module.exports = app;