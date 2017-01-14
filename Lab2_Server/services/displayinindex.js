var ejs=require("ejs");
var http=require("http");

var mongo=require("./mongo");
var mongoURL="mongodb://localhost:27017/ebay";

var saleitems;

mongo.connect(mongoURL,function () {
    saleitems=mongo.collection('saleitems');
});

exports.displayinindex=function(req,msg,callback){     //to display advt

    var res={};
    console.log("inside displayinindex");

    saleitems.find({}).toArray(function(err,doc){
        console.log("fetch items"+doc);
        if(err)
        {
            var res={

                success:false,

            };
            console.log(res);
            callback(req,res);

        }
        else
        {
            if(doc)
            {
                res={
                    data:doc,
                    success:true

                };
                console.log(res);
                callback(req,res);
            }
            else{
                var success ='';
                var res={

                    success:false,

                };
                console.log(res);
                callback(req,res);

                //res.render("index");    //render the file
                console.log("no items to display");
            }
        }
    });

};