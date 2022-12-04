const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const normalRoute = require('./routes/index');
const { initMongoDB } = require('./libs/db');
const testMongoose = require('./examples/mongoose');
const { isDev } = require('./libs/env');
<<<<<<< HEAD
<<<<<<< HEAD
const { rate: rateRouter, order: orderRouter } = require('./routes/api/v1');
=======
const { rate: rateRouter, address: addressRouter } = require('./routes/api/v1');
>>>>>>> 8c56554 (address update)
=======
const { rate: rateRouter, address: addressRouter } = require('./routes/api/v1');
>>>>>>> 1c5e8b674962facf6cba64777e6570ee3619a070

async function startApp() {
  // init prerequested tasks
  const initTasks = [
    initMongoDB(),
  ];
  await Promise.all(initTasks);

  // development env test
  console.log('db connnected');
  // see examples, how to use mongoose.
  if (isDev) testMongoose();

  // init server
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // register router
  app.use('/', normalRoute);
  app.use('/v1', rateRouter, orderRouter, addressRouter);

  // catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res) => { // _next
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
}

module.exports = startApp;
