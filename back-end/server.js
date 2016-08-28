var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId; 
var Message = mongoose.model('Message', {
	msg: String
});

const DEFAULT_SIZE = 10;
var Video = mongoose.model('Video', {
	iframe: String,
	firstThumbnail: String,
	thumbnailList: [String],
	title: String,
	tags: [String],
	categories: [String],
	pornstar: [String],
	duration: Number,
	views: Number,
	like: Number,
	dislike: Number,
});

app.use(bodyParser.json());

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Autorization");
	next();
})

// TODO: figure out why with any random tag results are coming

function GetVideosBasedOnTag(req, res) {
	var tag = req.param('tag') || "straight";
	var page = req.param('page') || 0;
	page = page || 0;
	console.log(tag);
	Video.find({tags: tag}).skip(page*DEFAULT_SIZE).limit(DEFAULT_SIZE).exec(function(err, results){
		
		results = results.map((result)=>{
					console.log(result);
			const {_id, iframe, firstThumbnail} = result;
			return {_id, iframe, firstThumbnail};
		})
		res.send(results);
	});
}

function GetVideoBasedOnId(req, res) {
	var id = req.param('id');
	var oId = new ObjectId(id);
	Video.find({_id: oId}).exec(function(err, results){
		console.log(results);
		res.send(results[0]);
	});
}


function GetVideosBasedOnSearch(req, res) {
	var tag = req.param('tag') || "straight";
	var page = req.param('page') || 0;
	console.log(tag);
	Video.find({tags: {$regex: tag}}).skip(page*DEFAULT_SIZE).limit(DEFAULT_SIZE).exec(function(err, results){
		
		console.log(results);
		results = results.map((result)=>{
			const {_id, iframe, firstThumbnail} = result;
			return {_id, iframe, firstThumbnail};
		})
		res.send(results);
	});
}

app.get('/api/videos', GetVideosBasedOnTag);

app.get('/api/videos/search', GetVideosBasedOnSearch);

app.get('/api/video/id', GetVideoBasedOnId);

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