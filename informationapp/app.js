const express 	= require ('express')
const fs 		= require ('fs')
const app		= express ()
const bodyParser= require ('body-parser')

//enabeling the bodyparser
app.use(bodyParser.urlencoded({
	extended: true
}));

//setting the view engine
app.set ('view engine', 'pug')
app.set ('views', __dirname + '/views')

//listing all the users in the database on the rendered page
app.get('/users', (request, response)=>{
	fs.readFile (__dirname + '/users.json', (error,data)=>{
		if (error) throw error
			let parsedData = JSON.parse(data)
		response.render ('index', {user: parsedData})
	})
})

//rendering the search page
app.get ('/search', (request, response)=>{
	response.render ('search')
})

// the search data is coming in and it is compared with the existing names in the json file
app.post ('/searchData', (request, response)=>{
	let autoNames = [] 
	fs.readFile (__dirname + '/users.json', (error,data)=>{
		if (error) throw error
		let parsedData = JSON.parse(data)
		for (let i = parsedData.length - 1; i>=0; i--) {
			if (parsedData[i].firstname.indexOf(request.body.input) >= 0){
				autoNames.push(parsedData[i].firstname)
			}
		}
		response.send (autoNames)
	})
})	

// the names and emails are stored in an object and written to the existing file
app.post ('/forms', function (request, response){
	let newObject = {
		firstname: 	request.body.firstname,
		lastname: 	request.body.lastname,
		email: 		request.body.email
	}
	fs.readFile (__dirname + '/users.json', (error,data)=>{
		if (error) throw error

			let parsedData = JSON.parse(data)
		parsedData.push (newObject)
		let stringifiedData = JSON.stringify (parsedData)

		fs.writeFile('users.json', stringifiedData, (error)=>{
			if (error) throw error
		})
		response.redirect ('/users')
	})	
})


//seeting up the server
app.listen(8000, ()=>{
	console.log ('server running')
})


