var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
var cors = require('cors')

const dashboardRouter = require('./app/dashboard/router');
const departemenRouter = require('./app/departemen/router');
const spesialisRouter = require('./app/spesialis/router');
const dokterRouter = require('./app/dokter/router');
const perawatRouter = require('./app/perawat/router');
const pasienRouter = require('./app/pasien/router');
const rekam_medisRouter = require('./app/rekam_medis/router');
const userRouter = require('./app/users/router');
const sensorRouter = require('./app/sensor/router');

var app = express();
const URL = `/api/v1`;
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  }
}))
app.use(flash());

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stisla', express.static(path.join(__dirname, './node_modules/stisla/')));


app.use('/', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/departemen', departemenRouter);
app.use('/spesialis', spesialisRouter);
app.use('/dokter', dokterRouter);
app.use('/perawat', perawatRouter);
app.use('/pasien', pasienRouter);
app.use('/rekam-medis', rekam_medisRouter);

// API
app.use(`${URL}/auth`, sensorRouter);

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
