var ejs=require("ejs");
var http=require("http");

var mongo=require("./mongo");
var mongoURL="mongodb://localhost:27017/ebay";

var users;

mongo.connect(mongoURL,function(){
   console.log("connected to mongoURL:"+mongoURL);
    users=mongo.collection('users');
});

exports.callproductpage=function(req,msg,callback) {    //call the product page

    var res={};
    var user=msg.user;
    var pid=msg.pid;
    var n=msg.timestamp;

   //var pid = req.param("id");
    //pid1=req.query("id");
    console.log(pid);

    console.log("inside callproductpage");


        users.update(
        {user:user},
        {$push:
            {userclicks:{$each :[{pid:pid,timestamp:n}]}}
            },function(err,doc){

        console.log(doc);
        if (doc) {
            console.log("entered");
            console.log("calling product page");

            res.code="200";
            res.value="success";
            callback(req,res);

        }
        else {
            console.log("entered");
            console.log("cannot call product page");

            res.code="401";
            res.value="failed";
            callback(req,res);
        }
    });
};

    //res.render('productpage', { title: 'Express' });


    /*console.log("callproductpage");

     pid=req.param("productid");

     console.log(pid);

     ejs.renderFile('./views/productpage.ejs',function (err,result){

     if (!err)
     {

     res.end(result);
     }
     // render or error
     else
     {
     res.end('An error occurred');
     console.log(err);
     }

     });*/

