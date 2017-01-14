var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');

exports.addtocart=function(req,res){

    console.log("inside the function to add to cart database");

    var user=req.session.user;
    var title = req.param("title");
    var itemdesc = req.param("itemdesc");
    var id=req.param("id");
    var rate = req.param("rate");
    var quantity = req.param("qty");
    var total = req.param("total");

    console.log(id);
    console.log(quantity);
    console.log(rate);
    console.log(total);
    console.log(user);

    var msg_payload={
        "user":user,
        "title":title,
        "itemdesc":itemdesc,
        "id":id,
        "rate":rate,
        "quantity":quantity
    };

    if(req.session.user!="guest")
    {

        mq_client.make_request('addtocart_queue', msg_payload, function (err, results) {
            console.log(results);

            if (err) {
                throw err;

            }
            else {
                if (results.success) {
                    //rediret to login page
                    console.log("success reroute to index");
                    var result = {
                        success: true
                    };
                    res.send(result);
                }
                else {
                    console.log("some error when rendering");
                    res.end(err);
                }
            }
            console.log("user added");

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

exports.addtobid=function(req,res){  // to add to bidding cart

    console.log("inside cal total fuccntion");
    var n=Date();

    var user=req.session.user;
    //var title = req.param("title");
    //var itemdesc = req.param("itemdesc");
    var id=req.param("pid");
    //var rate = req.param("rate");
    var quantity = req.param("qty");
    var bidamt = req.param("bidamt");
    var title=req.param("title");

    console.log(id);
    console.log(quantity);
    console.log(bidamt);
    console.log(user);
    //console.log(user);

    var msg_payload={
        "user":user,
        "title":title,
        "id":id,
        "quantity":quantity,
        "bidamt":bidamt,
        "timestamp":n
    };


    if (req.session.user != "guest") {
        mq_client.make_request('addtobid_queue', msg_payload, function (err, results) {
            console.log(results);
            if (err) {
                throw err;
            }
            else {
                if (results.success) {
                    //rediret to login page

                    console.log("success reroute to index");
                    var result = {
                        success: true
                    };
                    res.send(result);
                }
                else {
                    console.log("some error when rendering");
                    res.end(err);
                }
            }
            console.log("user bid added");

        });
    }
    else {
        var result = {
            success: false
        };
        res.send(result);
    }



};


exports.getcart=function(req,res){

    var p_id=(req.session.pid);
    console.log("pid "+p_id);
    var msg_payload={
        "pid":p_id
    };

    mq_client.make_request('getcart_queue', msg_payload, function (err, product) {
        console.log(product);

        console.log(product);
        var date = new Date();
        var day=date.getDate();

        if(err)
        {
            throw err;

        }
        else {

            if (product.success) {
                console.log("valid pid");

                var data = {
                    result: product.result,
                    success: true,
                    day: day
                };

                console.log(data);
                res.send(data);
                console.log(data);
            }
            else {
                //invalid login
                var success = '';
                var result = {
                    success: false
                };
                console.log(result);
                res.send(result);

                //res.render("index");    //render the file
                console.log("item doesnt exists");
            }
        }

    });
};


