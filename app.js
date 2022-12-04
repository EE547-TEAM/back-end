const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const normalRoute = require('./routes/index');
const { initMongoDB } = require('./libs/mongo');
const testMongoose = require('./examples/mongoose');
const { isDev } = require('./libs/env');
const { rate: rateRouter, address: addressRouter, chat: chatRouter } = require('./routes/api/v1');

async function startApp() {
  // init prerequested tasks
  const initTasks = [
    initMongoDB(),
    getGrqphqlSchema(),
  ];
  const initRes = await Promise.all(initTasks);

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
  app.use('/v1', rateRouter, addressRouter, chatRouter);

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
