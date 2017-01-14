var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var http=require('http');
var path=require('path');

var passport = require('passport');
require('./routes/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var home=require('./routes/home');
var additems=require('./routes/additems');
var callproductpage=require('./routes/callproductpage');
var cardvalidation=require('./routes/cardvalidation');
var checklogin=require('./routes/checklogin');
var displayinindex=require('./routes/displayinindex');
var listshoppingcart=require('./routes/listshoppingcart');
var ppfunctionality=require('./routes/ppfunctionality');
var registeruser=require('./routes/registeruser');
var myebay=require('./routes/myebay');

var mongoSessionConnectURL = "mongodb://localhost:27017/ebay";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");


var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

console.log("inside app.js");
/*app.use(session({
  cookieName : 'session',
  secret : 'session_ass_test',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
*/
app.use(expressSession({
  cookieName:'session',
  secret: 'cmpe273_teststring',
  resave: false,  //don't save session if unmodified
  saveUninitialized: false,	// don't create session until something stored
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  expires: new Date(Date.now() + 3600000),
  cookie: {maxAge: 10 * 60 * 1000},
  store: new mongoStore({
    url: mongoSessionConnectURL
  })
}));


console.log("h0");
app.get('/index',function(req,res){
  home.homepage(req,res);
});

console.log("h1");
app.get('/displayinindex',function (req,res) {
  displayinindex.displayinindex(req,res);
});

console.log("h2");
app.get('/jmpcart',function(req,res){
  home.jmpcart(req,res);
});


console.log("h3");
app.get('/signin',function(req,res){
  home.callsignin(req,res);
});


console.log("h4");
app.get('/signout',function(req,res){
  home.signout(req,res);
});

console.log("h5");
app.get('/selling',function(req,res){
  home.sellcall(req,res);
});

//user profile
//console.log("h6");

console.log("h7");
app.get('/callproductpage/:id',function(req,res){
  console.log("calling product page");
  callproductpage.callproductpage(req,res);
});

console.log("h8");
app.get('/displayinindex',function(req,res){
  displayinindex.displayinindex(req,res);
});

console.log("h9");
app.get('/checkjump',function(req,res){
  home.checkjump(req,res);
});

console.log("h10");
app.post('/additems',function(req,res){
  additems.additems(req,res);
});


console.log("h11");     //earlier one
app.post('/checklogin',function(req,res){
  checklogin.checklogin(req,res);
});


console.log("h12");
app.post('/registeruser',function (req,res) {
  registeruser.registeruser(req,res);
});

console.log("h13");
app.get('/listshoppingcart',function(req,res){
  listshoppingcart.listshoppingcart(req,res);
});

console.log("h14");
app.get('/checkout',function (req,res) {
  home.checkout(req,res);
});

console.log("h15");
app.post('/deletecart',function(req,res){
  listshoppingcart.deletecart(req,res);
});

console.log("h16");
app.post('/cardvalid',function(req,res){
  cardvalidation.cardvalid(req,res);
});

console.log("h17");
app.get('/getcart',function(req,res){
  ppfunctionality.getcart(req,res);
});

console.log("h18");
app.get('/addtocart',function(req,res){
  ppfunctionality.addtocart(req,res);
});

console.log("h19");
app.get('/addtobid',function(req,res){
  ppfunctionality.addtobid(req,res);
});

console.log("h20");
app.get('/userprofile',function(req,res){
   home.myprofile(req,res);
});

console.log("h21");
app.get('/myebay',function(req,res){
  console.log("inside app.js myebay");
   myebay.myebay(req,res);
});



console.log("h22");
app.post('/checklogin', function(req, res, next) {
  console.log("inside the passport checklogin");
  console.log(req.body);
  var user=req.body;

  passport.authenticate('checklogin', function(err, user, info)
  {
    console.log("called checklogin");
    if(err) {
      return next(err);
    }
    console.log(user);
    if(!user) {
      //copy code for no user found
      console.log("invalid user");
      json_responses= {"statusCode":401};
      console.log("Response is"+JSON.stringify(json_responses));
      res.send(json_responses);
    }

    req.logIn(user, {session:false}, function(err) {
      if(err) {
        return next(err);
      }
      var n=Date();
      //copy code when user is authenticated
      req.session.user=user.user;   //session needs to be created
      req.session.sessionstart = n;  //prefer updating this in db
      console.log(req.session.user);
      console.log("valid user");
      json_responses = {"statusCode": 200};
      console.log("Response is:" + JSON.stringify(json_responses));
      res.send(json_responses);
    })
  })(req, res, next);
});

app.get('/checklogin', isAuthenticated, function (req, res) {
  console.log("Success login");
  //res.render('successLogin', {user:{username: req.session.user}});
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    console.log("in app.js"+req.session.user);
    return next();
  }
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
