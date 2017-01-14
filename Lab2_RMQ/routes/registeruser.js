var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');

exports.registeruser=function(req,res){

    var user=req.param("newuser");
    var password=req.param("password");
    var lastname=req.param("lastname");
    var firstname=req.param("firstname");

    var msg_payload={
        "user":user,
        "password":password,
        "lastname":lastname,
        "firstname":firstname
    };
       mq_client.make_request('registeruser_queue', msg_payload, function (err, results) {
      console.log(results);
       if(err)
      {
          throw err;

      }
      else
       {
           if(results.code==200)
           {
               json_response={"statusCode":200};
               res.send(json_response);
           }
           else
           {
               json_response={"statusCode":400};
               console.log("json statuscode"+JSON.stringify(json_response));
               res.send(json_response);
           }
       }
   });
};