var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');


exports.checklogin=function(req,res){

    var username=req.param('user');
    var password=req.param('password');
    console.log(username);

    var n=Date();

    var msg_payload = {
        "user": username,
        "password":password
    };

    mq_client.make_request('checklogin_queue', msg_payload, function (err, results) {

        console.log(results);
        if(err)
        {
            throw err;
        }
        else if(results.code==200) {
            req.session.user=username;   //session needs to be created
            req.session.sessionstart = n;  //prefer updating this in db
            console.log(req.session.user);
            console.log("valid user");
            json_responses = {"statusCode": 200};
            console.log("Response is:" + JSON.stringify(json_responses));
            res.send(json_responses);
        }
        else
        {
            console.log("invalid user");
            json_responses= {"statusCode":401};
            console.log("Response is"+JSON.stringify(json_responses));
            res.send(json_responses);
        }
    });
};