var Transform = require('stream').Transform
  , csv = require('csv-streamify')
  , JSONStream = require('JSONStream');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:admin@ds033015.mlab.com:33015/pvideo", function(error, db){

//mongoose.connect("mongodb://localhost:27017/test", function(error, db){
	if(!error){
		console.log("we are connected to mongo");
		//GetMessages();
	} else {
		console.log("error in connection to mongo");
	}
});

var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('../../data/hub.com-db.csv');

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

lr.on('error', function (err) {
	// 'err' contains error object
});

// NOTE line.replace(/;/g, "|")

lr.on('line', (line) => {
	line = line.split("|");

	var iframe = line[0];
	var firstThumbnail = line[1];
	var thumbnailList = line[2].split(';');
	var title = line[3];
	var tags = line[4].split(';');
	var categories = line[5].split(';');
	var pornstar = line[6].split(';');
	var duration = line[7];
	var views = line[8];
	var like = line[9];
	var dislike = line[10];

	//console.log(line);
	var video = new Video({
		iframe,
		firstThumbnail,
		thumbnailList,
		title,
		tags,
		categories,
		pornstar,
		duration,
		views,
		like,
		dislike
	});

	video.save(function(err){
		if(err){
			console.log(err);
		}
	});


	//console.log("\n\n");
});

lr.on('end', function () {
	console.log("finished parsing file");
	// All lines are read, file is closed now.
});
