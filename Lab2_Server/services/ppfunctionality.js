var ejs=require("ejs");
var http=require("http");

var mongo=require("./mongo");
var mongoURL="mongodb://localhost:27017/ebay";

var users;
var saleitems;

mongo.connect(mongoURL,function () {
   users=mongo.collection('users');
    saleitems=mongo.collection('saleitems');

});

exports.addtocart=function(req,msg,callback){

    console.log("inside the function to add to cart database");
    console.log(msg);
    var res={};

    var user=msg.user;
    var title = msg.title;
    var itemdesc =msg.itemdesc;
    var id=msg.id;
    var rate =msg.rate;
    var quantity =msg.quantity;
    //var total = req.param("total");

    console.log(id);
    console.log(quantity);
    console.log(rate);
    //console.log(total);
    console.log(user);

    users.update(
        {user:user},
        {$push:
            {cart:{$each :[{title:title,itemdesc:itemdesc,id:id,rate:rate,quantity:quantity}]}}
        },function(err,doc) {
            console.log(doc);


            if (err) {
                throw err;

            }
            else {
                if (doc) {
                    //rediret to login page

                    console.log("success reroute to index");
                    res = {
                        success: true
                    };
                    callback(req, res);
                }
                else {
                    console.log("some error when rendering");
                    res = {
                        success: false
                    };
                    callback(req, res);
                }
            }
            console.log("user added");


        });
};

exports.addtobid=function(req,msg,callback){  // to add to bidding cart


    console.log("inside cal total fuccntion");
    console.log(msg);

    //var n=Date();

    var user=msg.user;
    var id=msg.id;
    var title=msg.title;
    var bidamt=msg.bidamt;
    var quantity=msg.quantity;
    var n=msg.timestamp;

    console.log(id);
    console.log(user);
    console.log(bidamt);
    console.log(quantity);
    console.log(n);

    users.update(
        {user:user},
        {$push:
            {bid:{$each :[{title:title,id:id,bidamt:bidamt,quantity:quantity,timestamp:n}]}}
            },function(err,doc) {
            console.log(doc);


                if (err) {
                    throw err;

                }
                else {
                    if (doc) {
                        //rediret to login page

                        console.log("success reroute to index");
                        res = {
                            success: true
                        };
                        callback(req,res);
                    }
                    else {
                        console.log("some error when rendering");
                        res={
                          success: false
                        };
                        callback(req,res);
                    }
                }
                console.log("user added");



        });
};


exports.getcart=function(req,msg,callback){

    console.log(msg);
    var p_id=msg.pid;
   console.log("pid "+p_id);
    saleitems.findOne({pid:parseInt(p_id)},function(err,product)
    {
        console.log(product);
        //var date = new Date();
        //var day=date.getDate();

        if(err)
        {
            throw err;

        }
        else {

            if (product) {
                console.log("valid pid");

                res = {
                    result: product,
                    success: true
                   // day: day
                };

                console.log(res);
                callback(req,res);

            }
            else {
                //invalid login
                var success = '';
                 res = {
                    success: false
                };
                console.log(res);
                callback(req,res);

                //res.render("index");    //render the file
                console.log("item doesnt exists");
            }
        }

    });
};


