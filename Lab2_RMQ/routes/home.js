var ejs=require("ejs");
var http=require("http");
var mq_client = require('../rpc/client');

exports.callsignin=function(req,res)
{

    console.log("signin");

    ejs.renderFile('./views/signin.ejs',function (err,result){

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

    });

};

exports.signout=function(req,res)
{

    console.log("signout");
    var username=req.session.user;
    var start=req.session.sessionstart;
    var end=Date();

   var  msg_payload={
        "user":username,
        "start":start,
        "end":end
    };

    mq_client.make_request('checkout_queue', msg_payload, function (err, results) {
            if(err)
            {
                throw err;
            }
            else{
                if(results.status==200) {
                    console.log("userlogs updated");
                    req.session.destroy();
                    console.log("session destroyed");
                    res.render("index");

                }
            }
 });

};

exports.homepage=function(req,res)
{

    console.log("should redircect to homepage");

    ejs.renderFile('./views/index.ejs',function (err,result){

        if (!err)
        {
            console.log("no error");
            res.end(result);
        }
        // render or error
        else
        {
            console.log(err);
            res.end('An error occurred');

        }

    });

};



exports.sellcall=function (req,res) {

    console.log("sellcall");

    ejs.renderFile('./views/selling_one.ejs',function(err,result){

        if(!err)
        {
            res.end(result);
        }
        else{
            res.end('error occured');
            console.log(err);
        }
    });


};



exports.shoppingcart=function(req,res)
{

    console.log("inside shoppingcart");

    ejs.renderFile('./views/shoppingcart.ejs',function(err,result){

        if(!err)
        {
            res.send(result);
        }
        else
        {
            console.log("some error while rendering");
            res.end(err);
        }
    });

};


exports.jmpcart=function(req,res){

    console.log("jmpcart");

    ejs.renderFile('./views/shoppingcart.ejs',function (err,result){

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

    });

};

exports.checkout=function(req,res) {

    console.log("checkout");


    ejs.renderFile('./views/cardvalidation.ejs',function (err,result){

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

    });

};


exports.checkjump=function(req,res){

    console.log("checkjump");
    //simply check if there is a user session
    //fetch the username and password from the file-npt req i guess
    var user="user";
    //call the db
    if(req.session.user) //compare and if true //check if the session exists
    {
        //assign username to session
        ejs.renderFile('./views/selling_two.ejs',function(err,result){

            if(!err){
                res.end(result);
            }
            else
            {
                res.end("error occured");
                console.log(err);

            }
        });
    }
    else {
        res.render("index");
    }

};

exports.myprofile=function(req,res)
{

    console.log("myprofile");

    ejs.renderFile('./views/userprofile.ejs',function (err,result){

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

    });

};

