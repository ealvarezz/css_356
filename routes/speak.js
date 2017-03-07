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


router.post('/', function(req, res, next){
    var key = req.body["key"];
    var msg = req.body["msg"];

    amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
		var ex = 'hw3';
		ch.assertExchange(ex, 'direct', {durable: false});
		ch.publish(ex, key, new Buffer(msg));
		console.log(" [x] Sent %s: '%s'", key, msg);
	  });
    });
})

module.exports = router;
