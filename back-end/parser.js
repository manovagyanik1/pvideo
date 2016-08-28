var Transform = require('stream').Transform
  , csv = require('csv-streamify')
  , JSONStream = require('JSONStream');
var fs = require('fs');
var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('../../data/hub.com-db.csv');


lr.on('error', function (err) {
	// 'err' contains error object
});


lr.on('line', (line) => {
	line = line.replace(/;/g, "|")
			.split("|");

	console.log(line);

	console.log("\n\n");
});

lr.on('end', function () {
	// All lines are read, file is closed now.
});
