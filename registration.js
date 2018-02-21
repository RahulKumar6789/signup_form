 var mysql = require('mysql');
 var nodemailer=require('nodemailer');
 var QRCode = require('qrcode');
 var connectionjs=require('./mysql/connection');
 var rama = require('./server');

 // var canvas = document.getElementById('canvas');
 // var context = canvas.getContext('2d');
 // var img = new Image();
 //
 // img.onsubmit = myFunction() {
 //   context.drawImage(this, 0, 0, canvas.width, canvas.height);
 // }
 //
 // img.src = ram;

 // var imageData = QRCode.toDataURL(rama.ram, function(err, image_data) {
 //   imageData=image_data;
 //     console.log(imageData); // A data URI for the QR code image
 //   });
exports.register = function(req,res){
  var OTP=Math.floor(Math.random() * (99999 - 10000)) + 10000;
  console.log(OTP);
  var today = new Date();
  var users={
    "usernamesignup":req.body.usernamesignup,
    "emailsignup":req.body.emailsignup,
    "passwordsignup":req.body.passwordsignup,
    "OTP":OTP,
    "isVerified":0,
    "secretKey": 0
  }



  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rahul.kumar@sofocle.com",
        pass: "sofocle@1234"
    }
});
//console.log("===============================in registration=================================================="+rama.imageData);
// setup e-mail data with unicode symbols
var mailOptions = {
    from: '" VALIDNAME" <rahul.kumar@sofocle.com>', // sender address
    to: req.body.emailsignup, // list of receivers
    subject: 'Verify OTP ✔', // Subject line
    text: 'WELCOME TO RAHUL\'S WORLD ?', // plaintext body
    html: 'CLICK HERE TO VERIFY YOUR EMAIL <a json:"{\'emailsignup\':{'+req.body.emailsignup+'}}" href = "http://localhost:3010/verifyOTP">CLICK ME TO VERIFY</a> or enter OTP : '+OTP
    // ' <img src='+ rama.imageData+' > </img>'
};
//console.log(rama.ram);
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

  connectionjs.connection.query('INSERT INTO registration SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    // res.send({
    //   "code":200,
    //   "success":"user registered sucessfully"
    //     });
    res.render('index');
  }
  });
}
