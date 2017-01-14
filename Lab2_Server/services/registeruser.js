var ejs=require("ejs");
var http=require("http");

var mongo=require("./mongo");
var mongoURL="mongodb://localhost:27017/ebay";

var users;

mongo.connect(mongoURL,function() {
    console.log("connnected to mongoURL:" + mongoURL);
    users = mongo.collection('users');
});

exports.registeruser=function(req,msg,callback){

    var res={};
    console.log(msg);
      var user=msg.user;
       var password=msg.password;
       var lastname=msg.lastname;
        var firstname=msg.firstname;

   users.findOne({user:user},function(err,exists)
   {
      console.log(exists);
       if(err)
      {
          throw err;

      }
      else if(exists)
      {
        res.code=401;
          callback(req,res);
      }
      else
      {
          var document={
             user:user,
              pass:password,
              firstname:firstname,
              lasttname:lastname
          };
            console.log(document);
          users.save(document,function (err,doc) {
              console.log(doc);
              if(err)
             {
                 throw err;
             }
             else
             {
                 res.code=200;
                 callback(req,res);
             }
          });
      }
   });
};