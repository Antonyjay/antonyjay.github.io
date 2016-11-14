const express 	= require ('express')
const app 		= express ()
const bodyParser= require ('body-parser')
const pg 		= require ('pg')

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use( '/src', express.static (__dirname	+ '/static'))

app.set ('view engine', 'pug')
app.set ('views', __dirname + '/views')

app.get ('/forms', (request,response)=> {
	response.render ('forms')
})

console.log(process.env.POSTGRES_USERNAME)
console.log(process.env.POSTGRES_PASSWORD)

app.get ('/results', (request,response) =>{
	pg.connect('postgres://'+ process.env.POSTGRES_USERNAME +':' + POSTGRES_PASSWORD + '@localhost/bulletinboard', function(err, client, done){
		if (err) {
			console.log (err)
		}
		client.query("select * from messages", function (err,result) {
			if (err) {
				console.log (err)
			}
			done ()
			pg.end ()
			response.render ('results', {posts: result.rows} )
		})
	})
})

app.post ('/forms', function (request, response){
	pg.connect('postgres://Antony:postgres@localhost/bssa', function(err, client, done){
		if (err) {
			console.log(err)
		}
		client.query("insert into messages (title, body) values (' "+ request.body.title +" ',' "+ request.body.message +"' )", function(err, result) {
				if (err){
					console.log (err)
				}
				 done()
				 pg.end()
				 response.redirect ('/results')
			})
	})
})
















app.listen(8000, ()=>{
	console.log ('server running')
})