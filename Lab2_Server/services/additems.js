var ejs=require("ejs");
var http=require("http");

var mongo=require("./mongo");
var mongoURL="mongodb://localhost:27017/ebay";

var saleitems;


mongo.connect(mongoURL,function(){
  console.log("connected to mongo at URL:" +mongoURL);
    saleitems=mongo.collection('saleitems');
});


exports.additems=function(req,msg,callback){   //write a export for item sell form

    var res={};


    var user=msg.username;
    var title=msg.title;
    var desc=msg.desc;
    var sellerdetails=msg.sellerdetails;
    var price=msg.price;
    var avail=msg.avail;
    var check=msg.check;
    var day=msg.day;
    var id=msg.pid;


    console.log(user);
    console.log(check);
    console.log(avail);
    console.log(price);
    console.log(desc);
    console.log(day);
    console.log(id);


    var additems={
     user:user,
     title:title,
        desc:desc,
        sellerdetails:sellerdetails,
        price:price,
        avail:avail,
        check:check,
        day:day,
        pid:id
    };

    saleitems.save(additems,function(err,doc)
    {
       console.log(doc);
        if(doc)
        {
                   console.log("item success reroute to index");

                    res.code="200";
                    res.value="success";
                    callback(req,res);

            console.log("item added");
        }
        else
        {
            console.log("failed");
            res.code="401";
            res.value="success";
            callback(req,res);
        }
    });

};