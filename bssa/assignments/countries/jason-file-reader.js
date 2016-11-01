var fs = require ('fs')

var theReader = function (file, cb){ // this function reads a jason file and lets u use the object in another function
	fs.readFile (__dirname + file, 'utf-8', function (err, data){ // read the file 
		if (err) { // 
			throw err;
		}
		var object = JSON.parse (data) 
		cb(object) // the callback function
	})
}

module.exports = theReader
