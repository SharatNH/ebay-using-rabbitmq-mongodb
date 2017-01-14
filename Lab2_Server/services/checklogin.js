var ejs=require("ejs");
var http=require("http");

var mongo=require("./mongo");
var mongoURL="mongodb://localhost:27017/ebay";

var users;

mongo.connect(mongoURL,function() {
    console.log("connnected to mongoURL:" + mongoURL);
    users = mongo.collection('users');
});



exports.checklogin=function(req,msg,callback){

    var res={};
    var username=msg.user;
    var password=msg.password;
    console.log(username);

    //var n=Date();

    users.findOne({user:username,pass:password},function (err,validate) {

        console.log(validate);
        if(err)
        {
            //throw err;
            console.log("some error");
            res.code="401";
            callback(req,res);
        }
        else if(validate) {
            //req.session.user=username;   //session needs to be created
            //req.session.sessionstart = n;  //prefer updating this in db
            //console.log(req.session.user);
            console.log("valid user");
            res.code="200";
            callback(req,res);
        }
        else
        {
            console.log("invalid user");
            res.code="401";
            callback(req,res);
        }
    });
};

exports.signout=function(req,res)
{

    res={};
    console.log("signout");
    var username=msg.user;
    var starttime=msg.start;
    var endtime=msg.end;


    users.update(
        {user:username},
        {$push:
        {userlogs:{$each:[{starttime:start,endtime:end}]}}},function(err,doc){
            console.log(doc);

            if(err)
            {
                throw err;

            }
            else{
                console.log("userlogs updated");
                res.status=200;
                callback(req,res);
            }


        });

    req.session.destroy();
    console.log("session destroyed");
    res.render("index");

};