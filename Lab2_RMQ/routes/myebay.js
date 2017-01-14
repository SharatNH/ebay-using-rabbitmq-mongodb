var ejs=require("ejs");
var http=require("http");

var mongo=require('./mongo');
var mongoURL="mongodb://localhost:27017/ebay";

var users;
var saleitems;

mongo.connect(mongoURL,function(){
   users=mongo.collection('users');
    saleitems=mongo.collection('saleitems');
});

exports.myebay=function (req,res) {

    console.log(req.session.user);


    if(req.session.user!=undefined && req.session.user!="guest")
    {
        users.find({user: req.session.user},{firstname:1,lasttname:1,userbuy:1,userlogs:1,bid:1}).toArray(function (err, doc) {
            console.log(doc);
            console.log(doc);
            if(err)
            {
                throw err;
            }
            else if(doc)
            {
                saleitems.find({user:req.session.user}).toArray(function(err,sale)
                {
                    console.log("sales:"+sale);
                   if(err)
                   {
                       throw err;
                   }
                   else if(sale.length>0)
                   {
                       console.log("salespresent");
                       var data={
                           udetails:doc,
                           sdetails:sale,
                           success:true,
                           sal:true,
                           user:req.session.user
                       };
                       console.log(data);
                       res.send(data);
                   }
                   else
                   {
                       console.log("sales not present");
                       var data={
                           udetails:doc,
                           sales:sale,
                           success:true,
                           sal:false,
                           user:req.session.user
                       };
                       console.log(data);
                       res.send(data);
                   }

                });


            }
            else
            {
                console.log("nothing to show");
                var data={
                   result: " ",
                    success:false,
                    user:req.session.user
                };
                console.log(data);
                res.send(data);
            }

        });
    }
    else
    {
        var result={
            success:false
        };
        res.send(result);
    }


};