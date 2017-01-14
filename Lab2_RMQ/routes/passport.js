var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/ebay";
var users;

mongo.connect(mongoURL,function(){
    users=mongo.collection('users');
});

module.exports = function(passport) {
    passport.use('checklogin', new LocalStrategy(function(username, password, done) {
        console.log("passport js");
        console.log(username + " "+ password);


        users.findOne({user:username}, function(error, rows) {
            console.log("retrieved the foll rows:" + JSON.stringify(rows));
            if(error) {
                return done(err);
            }

            else if(!rows.length) {
                return done(null, false);
            }

            else if(!(rows[0].pass==password))
            {
                return done(null,false);
            }

            else
            {
                connection.close();
                console.log("passport"+rows.username);
                console.log(rows[0]);
                done(null, rows[0]);
            }


        });
    }));
};




