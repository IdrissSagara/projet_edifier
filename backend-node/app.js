var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/**
 * How to add swagger to an existing node project
 * http://www.acuriousanimal.com/2018/10/20/express-swagger-doc.html
 */
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//User imports

//Routes controllers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRoutes = require('./routes/api/apiRoutes').router;
var authRoutes = require('./routes/auth/authRouter').router;
var clientRouter = require('./routes/client');

var app = express();

const swaggerOptions = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Edifier API',
      version: '1.0.0',
      description: 'Provides services for the Edifier app with json based authentication and authorization',
    },
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['routes/api/*/*.js'],
};
const specs = swaggerJsdoc(swaggerOptions);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(logger('combined'));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
//User use

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', apiRoutes);
app.use('/auth/', authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
