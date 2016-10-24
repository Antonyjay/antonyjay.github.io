const express 	= require ('express')
const fs 		= require ('fs')
const app		= express ()
const bodyParser= require ('body-parser')

app.use(bodyParser.urlencoded({
	extended: true
}));

app.set ('view engine', 'pug')
app.set ('views', __dirname + '/views')

app.get('/users', (request, response)=>{
	fs.readFile (__dirname + '/users.json', (error,data)=>{
		if (error) throw error
			let parsedData = JSON.parse(data)
		response.render ('index', {user: parsedData})
	})
})

app.get ('/search', (request, response)=>{
	response.render ('search')
})

app.get ('/forms', (request,response)=> {
	response.render ('forms')
})


app.post ('/search', function (request,response){
	let searchResults = []
	fs.readFile (__dirname + '/users.json', (error,data)=>{
		if (error) throw error
			let parsedData = JSON.parse(data)
		for (let i = parsedData.length - 1; i>=0; i--) {
			if (parsedData[i].firstname == request.body.name){
				searchResults.push(parsedData[i])
			}
		}
		response.render ('result', {user: searchResults})
	})	
})

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



app.listen(8000, ()=>{
	console.log ('server running')
})







