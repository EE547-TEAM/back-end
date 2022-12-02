const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const normalRoute = require('./routes/index');
const { initMongoDB, getGraphqlSchemaFromFile } = require('./libs/db');
const testMongoose = require('./examples/mongoose');
const { isDev } = require('./libs/env');
const setRouter = require('./routes/graphql');

async function startApp() {
  // init db
  const initTasks = [
    initMongoDB(),
    // getGraphqlSchemaFromFile(path.join(__dirname, './schema.graphql')),
  ];
  // eslint-disable-next-line no-unused-vars
  const [_, graphqlSchema] = await Promise.all(initTasks);

  // development env test
  console.log('db connnected');
  // see examples, how to use mongoose.
  if (isDev) testMongoose();

  // init server
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // register router
  app.use('/', normalRoute);
  // app.use('/graphql', setRouter(graphqlSchema));

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
