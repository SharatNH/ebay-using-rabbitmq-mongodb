var ejs = require("ejs");
var http = require("http");
var mq_client = require('../rpc/client');

exports.cardvalid = function (req, res) {   //do the card autentication and update the cart and available items and user profile

    console.log("inside the cardvalid ");


    var card = req.param('card');
    var cvv = req.param('cvv');
    var year = req.param('year');
    var month = req.param('month');


    console.log("cvv " + cvv);
    console.log("card " + card);

    var clength = card.toString().length;
    var cvvl = cvv.toString().length;

    console.log(clength);
    console.log(cvvl);
    if (clength == 16 && cvvl == 3) {

        console.log("valid card");


        var msg_payload = {
            "user": req.session.user
        };

        mq_client.make_request('cardvalidate_queue', msg_payload, function (err, results) {

            if (results.code == 200) {
                console.log("operation done");
                var data = {
                    success: true
                };
                res.send(data);
            }
            else {
                console.log("operation couldnt be done");
                var data = {
                    success: false
                };
                res.send(data);
            }
        });
    }
    else
    {
        console.log("invalid card");
        var data = {
            success: false
        };
        res.send(data);
    }



};

