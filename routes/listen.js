
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
var amqp = require('amqplib/callback_api');

router.use(bodyParser.urlencoded({ extended: true }))
    router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
// look in urlencoded POST bodies and delete it
	  var method = req.body._method
	  delete req.body._method
	  return method
    }
}))

// After listen is loaded we're gonna try to connect API needed
router.post('/', function(req, res, next) {

    var keys = req.body["keys"];
    var message;

    amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
		var ex = 'hw3';
		var called = false;

		ch.assertExchange(ex, 'direct', {durable: false});

		ch.assertQueue('', {exclusive: true}, function(err, q) {
		    console.log(' [*] Waiting for logs. To exit press CTRL+C');

		    keys.forEach(function(severity) {
			  ch.bindQueue(q.queue, ex, severity);
			  console.log(severity);
		    });

		    ch.consume(q.queue, function(msg) {
			  if(called){
			  
				message = {"msg": msg.content.toString()};
				console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
				res.send(message); 
		        }
		    }, {noAck: true});
		});
	  });
    });



});



module.exports = router;
