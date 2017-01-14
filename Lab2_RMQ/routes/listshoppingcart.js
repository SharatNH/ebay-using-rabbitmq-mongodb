var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');

exports.listshoppingcart=function(req,res) {
    console.log("inside shoppingcart");

    if (req.session.user) {

        var msg_payload={"user":req.session.user};

        mq_client.make_request('listcart_queue', msg_payload, function (err, results) {
            console.log(results);
            if (err) {
                throw err;
            }
            else if(results.success)
            {
                var data = {
                    result: results.result,
                    success: true,
                    user: req.session.user
                };
                console.log(data);
                res.send(data);
            }
            else
            {
                console.log("nothing to show");
                var data = {
                    result: " ",
                    success: false,
                    user: req.session.user
                };

                console.log(data);
                res.send(data);
            }
        });
    }
    else {
        var data = {
            failed: true
        };

        console.log(data);
        res.send(data);

    }
};


exports.deletecart=function(req,res) {

    var id = req.param("id");
    console.log("inside the delete card function");
    console.log(id);

    var msg_payload={
        "id":id,
        "username":req.session.user
    };

    mq_client.make_request('deletecart_queue', msg_payload, function (err, results) {
        console.log("results"+results);
        if(err){
         throw err;
     }
     else{
         if(results.success) {
             var data = {
                 success: true
             };
             console.log(data);
             res.send(data);
         }
         else
         {
             console.log("somethning went wrong when delete cart");
         }
     }

    });

};