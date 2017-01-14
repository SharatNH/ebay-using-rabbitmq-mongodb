var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');

exports.displayinindex=function(req,res){     //to display advt

    console.log("inside displayinindex");

    var msg_payload={};


    mq_client.make_request('displayinindex_queue', msg_payload, function (err, results) {

        console.log("fetch items"+results);
        if(err)
        {
            throw err;

        }
        else
        {
            if(results.success)
            {
                var data={
                    result:results.data,
                    success:true,
                    user:req.session.user
                };
                console.log(data);
                res.send(data);
            }
            else{
                var success ='';
                var data={

                    success:false,
                    user:req.session.user
                };
                console.log(data);
                res.send(data);

                //res.render("index");    //render the file
                console.log("no items to display");
            }
        }
    });

};