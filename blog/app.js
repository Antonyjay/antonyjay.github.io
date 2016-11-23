const Sequelize = 	require ('sequelize')
const express 	=	require ('express')
const bodyParser=	require ('body-parser')
const session 	=	require ('express-session')
const bcrypt	= 	require ('bcrypt')


let app = express ()

app.use ('/', require ( __dirname + '/routes/registration'))
app.use ('/', require ( __dirname + '/routes/messages'))



//stating the route for the static folders
app.use( '/src', express.static (__dirname	+ '/static'))

//starting the session
app.use (session ({
	secret:'make it secret',
	resave: true, 
	saveUninitialized: false
}))

//setting the views
app.set ('views', __dirname + '/views')
app.set ('view engine', 'pug')

//setting up the server
var server = app.listen(8000, function () {
	console.log('server up and running')
});




















