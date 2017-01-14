var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');


exports.callproductpage=function(req,res) {    //call the product page

   var pid = req.param("id");
    //pid1=req.query("id");
    console.log(pid);

    console.log("inside callproductpage");
    if (req.session.user == undefined) {
        req.session.user = "guest";
        req.session.pid = pid;
    }
    else {
        req.session.pid = pid;
    }

    var n = Date();

    var msg_payload = {
        "user": req.session.user,
        "pid": pid,
        "timestamp": n
    };

    mq_client.make_request('callproductpage_queue', msg_payload, function (err, results) {

        console.log(results);
        if (results.code==200) {
            console.log("entered");
            //res.render('productpage', { title: 'Express' });
           // res.send(doc);
            res.render('productpage', { title: 'Express' });
        }
        else {
            throw err;
        }
    });
};

    //res.render('productpage', { title: 'Express' });


    /*console.log("callproductpage");

     pid=req.param("productid");

     console.log(pid);

     ejs.renderFile('./views/productpage.ejs',function (err,result){

     if (!err)
     {

     res.end(result);
     }
     // render or error
     else
     {
     res.end('An error occurred');
     console.log(err);
     }

     });*/

