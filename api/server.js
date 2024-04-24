// Requirements for api
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('./config/passport');

// Route
var apiRouter = require('./routes/index');
var userRouter = require('./routes/user.js');

// App initialization
var app = express();

// Connect to mongo via mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {})
.then( ()=> console.log('Connected to MongoDB!'))
.catch( err => console.error(err));

// MiddleWare
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', apiRouter);
app.use('/users', userRouter);

module.exports = app;