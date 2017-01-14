//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var additems = require('./services/additems');
var callproductpage = require('./services/callproductpage');
var cardvalidation = require('./services/cardvalidation');
var checklogin = require('./services/checklogin');
var displayinindex = require('./services/displayinindex');
var listshoppingcart = require('./services/listshoppingcart');
var ppfunctionality = require('./services/ppfunctionality');
var registeruser = require('./services/registeruser');

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('additem_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			additems.additems(req,message, function(req,res){
				console.log("add items ");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue



	cnn.queue('callproductpage_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			callproductpage.callproductpage(req,message, function(req,res){
				console.log("call product page");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue


	cnn.queue('cardvalidate_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			cardvalidation.cardvalid(req,message, function(req,res){
				console.log("card validate");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue


	cnn.queue('checklogin_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			checklogin.checklogin(req,message, function(req,res){
				console.log("check login");
				console.log("message:"+message.user);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue


	cnn.queue('displayinindex_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			displayinindex.displayinindex(req,message, function(req,res){
				console.log("display in index");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue


	cnn.queue('listcart_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			listshoppingcart.listshoppingcart(req,message, function(req,res){
				console.log("list cart");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue


	cnn.queue('deletecart_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			listshoppingcart.deletecart(req,message, function(req,res){
				console.log("delete cart");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue

	cnn.queue('registeruser_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			registeruser.registeruser(req,message, function(req,res){
				console.log("delete cart");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue

	cnn.queue('checkout_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			checklogin.signout(req,message, function(req,res){
				console.log("delete cart");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue

	cnn.queue('addtocart_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			ppfunctionality.addtocart(req,message, function(req,res){
				console.log("add to cart");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue

	cnn.queue('addtobid_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			ppfunctionality.addtobid(req,message, function(req,res){
				console.log("addtobid cart");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue

	cnn.queue('getcart_queue', function(req,res){
		req.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			ppfunctionality.getcart(req,message, function(req,res){
				console.log("get cart");
				console.log("message:"+message);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	}); //cnn.queue



}); //cnn.on