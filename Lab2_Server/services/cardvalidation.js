var ejs = require("ejs");
var http = require("http");

var mongo=require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";

var carddetails; //user card details
var saleitems;
var users;

mongo.connect(mongoURL, function () {
    console.log("connected to mongodb:" + mongoURL);
    saleitems = mongo.collection('saleitems');
    users = mongo.collection('users');
});

exports.cardvalid = function (req, msg,callback) {   //do the card autentication and update the cart and available items and user profile

    console.log("inside the cardvalid ");

    var res={};
    var username=msg.user;

        users.findOne(
            {user: username},{cart: 1}, function (err, result) {
                if (err) {
                   // throw err;
                    console.log("error occ at user find update");
                    res.code="401";
                    callback(req,res);
                }
                else {
                    console.log(result);
                   // console.log(result.length);
                    console.log(result.cart.length);
                    console.log(result.cart[0].id);
                    //console.log(result.cart[1].rate);
                    for (i = 0; i < result.cart.length; i++) {
                        var pid = result.cart[i].id;
                        var qty = result.cart[i].quantity;
                        console.log("here" + pid + " " + qty);

                        saleitems.update(
                            {pid: parseInt(pid)},
                            {$inc: {avail: -qty}}, function (err, doc) {
                                console.log("saleitems update"+doc);
                                if (err) {
                                    //throw err;
                                    console.log("error occ at avail in sales update");
                                    res.code="401";
                                    callback(req,res);
                                }
                                else {
                                    console.log("saleitems successful");
                                   // console.log(doc);
                                }
                            });

                        users.update(                                  //update the user purchases
                            {user: username},
                            {$push:
                                {userbuy:{$each: [{id:pid, quantity:qty}]}}
                            },function (err, doc) {
                                console.log("userbuy update"+doc);
                                if (err) {
                                    //throw err;
                                    console.log("error occ at userbuy update");
                                    res.code="401";
                                    callback(req,res);
                                }
                                else {
                                    console.log("user update success1");
                                   // console.log(doc);
                                }
                            });

                      }

                }
            });
        users.update(
            {user: username},
            {$unset: {"cart": " "}}, function(err, doc) {
                console.log("user cart update"+doc);
                if (err) {
                   // throw err;
                    console.log("error occ at cart update");
                    res.code="401";
                    callback(req,res);
                }
                else {
                    console.log("success2");
                    //console.log(doc);
                }
            });
        console.log("all done");
    res.code="200";
    callback(req,res);


};

