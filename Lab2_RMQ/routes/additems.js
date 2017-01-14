var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');

exports.additems=function(req,res) {   //write a export for item sell form

    var user = req.session.user;
    var title = req.param("title");
    var desc = req.param("desc");
    var sellerdetails = req.param("sellerdetails");
    var price = req.param("price");
    var avail = req.param("avail");
    var check = req.param("check");

    var date = new Date();
    var day = date.getDate();

    var id = Math.floor((Math.random() * 10000) + 1);   //random numbers

    console.log(user);
    console.log(check);
    console.log(avail);
    console.log(price);
    console.log(desc);
    console.log(day);
    console.log(id);


    var additems = {
        user: user,
        title: title,
        desc: desc,
        sellerdetails: sellerdetails,
        price: price,
        avail: avail,
        check: check,
        day: day,
        pid: id
    };

    var msg_payload = {
        "type": "additems",
        "username": user,
        "title": title,
        "desc": desc,
        "sellerdetails": sellerdetails,
        "price": price,
        "avail": avail,
        "check": check,
        "day": day,
        "pid": id
    };

    mq_client.make_request('additem_queue', msg_payload, function (err, results) {
        console.log(results);
        if (err) {
            throw err;
        }
        else {
            console.log("item success reroute to index");
            if (results.code == 200) {
                var result = {
                    success: true
                };
                res.send(result);
            }
            else {
                var result = {
                    success: false
               };
                res.send(result);
            }


            res.send(result);
            console.log("item added");


        }

    });
};