const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const normalRoute = require('./routes/index');
const { initMongoDB } = require('./libs/mongo');
const testMongoose = require('./examples/mongoose');
const { isDev } = require('./config/env');

const graphqlHTTP = require('./routes/graphql');
const { getGrqphqlSchema } = require('./libs/graphql');
const session = require('./libs/session');

async function startApp() {
  // init prerequested tasks
  const initTasks = [
    initMongoDB(),
    getGrqphqlSchema(),
  ];
  const initTaskResults = await Promise.all(initTasks);

  // development env test
  console.log('init tasks done');
  // see examples, how to use mongoose.
  if (isDev) testMongoose();

  // init server
  const app = express();
  // set session
  // app.set('trust proxy', 1);
  app.use(session);

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // register router
  app.use('/', normalRoute);
  app.use('/graphql', graphqlHTTP(initTaskResults[1]));

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
