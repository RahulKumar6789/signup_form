var mysql = require('mysql');
var connectionjs = require('./mysql/connection');
exports.login = function(req, res) {
  var username= req.body.username;
  var password = req.body.password;
  connectionjs.connection.query('SELECT * FROM registration WHERE usernamesignup = ? AND isVerified = ?',[username,1], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  } else {
    // console.log('The solution is: ', results);
    if(results.length > 0){
      if(results[0].passwordsignup == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else {
        res.send({
          "code":204,
          "success":"username and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"username does not exits or email verified through email id"
          });
    }
  }
  });
}
