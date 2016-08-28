var Transform = require('stream').Transform
  , csv = require('csv-streamify')
  , JSONStream = require('JSONStream');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", function(error, db){
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
	thumbnails: [String],
	tags: [String]
})

lr.on('error', function (err) {
	// 'err' contains error object
});


lr.on('line', (line) => {
	line = line.replace(/;/g, "|")
			.split("|");

	line = line.reduce((obj, value, index) => {
		if(index === 1){
			var ifr = {"iframe": value};
			obj = Object.assign({}, ifr);
		} else if(value.includes(".jpg")){
			var thumbnails = obj.thumbnails || [];
			thumbnails.push(value);
			obj = Object.assign(obj, {"thumbnails": thumbnails});
		} else {
			var tags = obj.tags || [];
			tags.push(value);
			obj = Object.assign(obj, {"tags": tags});
		}
		return obj;
	});

	var video = new Video(line);
	video.save(function(err){
		if(err){
			console.log(err);
		}
	});
	//console.log(line);

	//console.log("\n\n");
});

lr.on('end', function () {
	console.log("finished parsing file");
	// All lines are read, file is closed now.
});
