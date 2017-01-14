var ejs=require("ejs");
var http=require("http");

var mongo=require("./mongo");
var mongoURL="mongodb://localhost:27017/ebay";

var users;

mongo.connect(mongoURL,function(){
   users=mongo.collection('users');
});

exports.listshoppingcart=function(req,msg,callback) {
    console.log("inside shoppingcart");

    var res={};
    var username=msg.user;

        users.find({user: username}, {cart: 1}).toArray(function (err, doc) {
           console.log(doc);
            if (err) {
                throw err;
            }
            else if (doc) {

                    res = {
                    result: doc,
                    success: true

                };
                console.log(res);
                callback(req,res);
            }
            else {
                console.log("nothing to show");
                    res = {
                    result: " ",
                    success: false

                };

                console.log(res);
                callback(req,res);

            }
        });



};


exports.deletecart=function(req,msg,callback) {

    var res={};
    var pid = msg.id;
    var username=msg.username;
    console.log("inside delete cart");
    console.log(pid);


   /* users.find({user:username}).forEach(function(doc) {

       // console.log("delete cart find:"+err);
        console.log("delete cart find:"+doc);

            var cart = doc.cart;
            for (var i = 0; i < cart.length; ++i) {
                var x = cart[i];
                console.log(x);
                var tempid = cart[i].id;
                console.log(tempid);
                if (tempid == id) {
                    delete (doc.cart[i]);
                    console.log("inside if"+x);
                    users.save(doc);
                }
            }


            var res={
                success:true
            };
            callback(req,res);



    });
*/




    users.update(   //initial code
        {user:username},
        {$pull:{cart:{id:pid}}},function(err,doc){
            console.log(doc);
     if(err){
         throw err;
     }
     else{
         var res = {

             success: true
         };
         console.log(doc);
         callback(req,res);
     }

    });

};