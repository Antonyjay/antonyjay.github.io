var fs = require ('fs')
var jsonreader = require(__dirname + '/jason-file-reader')

jsonreader('/countries.json', function (object){ //call out the jsonreaderfunction
	for (var i = 0; i < object.length; i++) {//loop over the object
		if (object[i].name === process.argv [2]){// the object.name has to be the same as the [2]
			console.log ("Country: " + process.argv [2] +
				"\ntld: " + object[i].topLevelDomain)
		}
	}
})

// this is alternative solution

// function looper (x){
// 	for (var i = 0; i < x.length; i++) {
// 		if (x[i].name === process.argv [2]){
// 			console.log ("Country: " + process.argv [2] +
// 				"\ntld: " + x[i].topLevelDomain)
// 		}
// 	}
// }

jsonreader('/countries.json', looper)



