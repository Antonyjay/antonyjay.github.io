// write a function that takes in three parameters and returns the sum of those three parameters

function findSum (x, y, z){
	return x + y + z
}

console.log (findSum (2, 4, 6)) //12

// given a string, create a function that returns the last character in that string.
// examples:
// "cattywampus" --> s

function LastChar (stringname){
	return stringname.slice(-1);
}
console.log (LastChar ("cattywampus")) // s


// write a function that takes in one parameter and returns the cube of that parameter
// examples:
// 3 --> 27
// 4 --> 64

function cube (x) {
	return x * x * x
}

console.log (cube (4)) // 64


// define a function that takes in a string and reverses it. you are not allowed to
// call the "reverse" function (or any other string functions)

function reverse (x) {
	var filler = ""
	for (var i = x.length -1; i >= 0; i--) {
		filler += x[i] 
	}
	return filler
}

console.log (reverse ("hoipaul"))

// write a function that takes in two arrays of the same length as parameters. From those two arrays,
// create, then return an object which contains the elements of the first array as keys, and the
// elements of the second array as values.
// examples:
// ["exciting", "exotic"], ["markets", "britain"] --> { exciting: "markets", exotic: "britain" }
// ["a", "b", "c"], ["x", "y", "z"] --> { a: "x", b: "y", c: "z" }

var array1 = ["exciting", "exotic"]
var array2 = ["markets", "britain"]

function transformer (keyarray, valuearray){
	var empty = { }
	for (i = 0; i < keyarray.length; i++) {
		empty[ keyarray[i] ] = valuearray[i]
	}
	return empty 
}

console.log (transformer (array1, array2))


// Given an object with keys and values, create two arrays: one which contains the object's keys,
// and one which contains the object's values. Wrap this into a function which takes in one object
// that contains keys and values, and returns a different object that contains two keys. The first key
// should be named "keys" and will have the first array as a value. The second key should be named
// "values" and will have the second array as a value.
// examples:
// { exciting: "markets", exotic: "britain" } --> { keys: ["exciting", "exotic"], values: ["markets", "britain"] }
// { a: "x", b: "y", c: "z" } --> { keys: ["a", "b", "c"], values: ["x", "y", "z"] }

var object1 = {
	exciting: "markets", 
	exotic: "britain"
}

function keysandvalues (x){
	var firstarray = []
	var secondarray = []
	for (var property in x){
		firstarray.push(property)
		secondarray.push(x[property])
	}
	return {
		keys: firstarray,
		values: secondarray

	}
}

var newobject = keysandvalues (object1)





