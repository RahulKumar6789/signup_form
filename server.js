var express    = require("express");
var path = require('path');
var ejs=require("ejs");
var login = require('./login');
var connectionjs = require('./mysql/connection');
var sessions = require('express-session');
var registration=require('./registration');
var bodyParser = require('body-parser');
var authenticator = require('authenticator');
var speakeasy = require("speakeasy");
var QRCode = require('qrcode');
var qr = require('qr-image');
var app = express();
var imageData;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var sec;
var secret;

//var qrcode = new QRCode("qrcode");
var router = express.Router();

// test route
app.get('/', function(req, res) {
  //  res.json({ message: 'welcome to our upload module apis' });
    res.render('index');
});
//route to handle user registration
app.post('/registration',function(req, res){

//  'use strict';

//   formattedKey = authenticator.generateKey();
  // "acqo ua72 d3yf a4e5 uorx ztkh j2xl 3wiz"

//  var formattedToken = authenticator.generateToken(formattedKey);
  // "957 124"

//    authenticator.verifyToken(formattedKey, formattedToken);
  // { delta: 0 }

//  authenticator.verifyToken(formattedKey, '000 000');
  // null
//
//  ram = authenticator.generateTotpUri(formattedKey, req.body.to, "ACME Co", 'SHA1', 6, 30);
//   console.log(formattedKey);
//
// QRCode.toDataURL(ram, function(err, image_data) {
//     console.log(image_data); // A data URI for the QR code image
//   });
var qr_svg
  secret = speakeasy.generateSecret({length: 20});
  console.log(secret);
  sec = secret.base32;
  QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
                      if (err) {
                          res.json({ success: false, message: "error", err })

                      } else {
                        debugger

                      console.log(data_url);
                     
                        }
                      });

                      // res.type('png');
                      //  qr_svg.pipe(res);




  app.get('/verifyOTP',function(req, res){
    res.render('otp',);
  })

  app.post('/verify',function(req,res){
    var email = req.body.email;
    var otp = req.body.otp;



    connectionjs.connection.query('update registration set isVerified = ?, secretKey = ? where emailsignup = ? AND OTP = ?',[1,sec,email,otp], function (error, rows, fields) {
      if (error) {
        // console.log("error ocurred",error);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
//res.json({ success: true, data: data_url, secretKey: sec })
//console.log("hello",data_url);
            res.send({
              "data":qr_svg,
              "secretKey":sec
                });
          }
          // res.json (rows)

    });


  })


 registration.register(req, res);


  return null;
});

//router.post('/login',login.login)
//app.use('/api', router);
app.post('/login',function(req, res) {
  login.login(req, res);
  return null;
});
app.listen(3010);
// module.exports = ram;
// module.exports = imageData;
