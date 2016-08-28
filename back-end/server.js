var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
	msg: String
});

app.use(bodyParser.json());

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Autorization");
	next();
})

app.post('/api/message', function(req, res){
	console.log(req.body);
	var message = new Message(req.body);

	message.save();
	res.status(200);

});

function GetMessages(req, res) {
	Message.find({}).exec(function(err, result){
		res.send(result);
	});
}

app.get('/api/message', GetMessages);

mongoose.connect("mongodb://localhost:27017/test", function(error, db){
	if(!error){
		console.log("we are connected to mongo");
		//GetMessages();
	} else {
		console.log("error in connection to mongo");
	}
});

var server = app.listen(5000, function(){
	console.log("listening on port 5000");
})