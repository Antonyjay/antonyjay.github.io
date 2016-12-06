// Require modules
const express 		= require('express')
const Sequelize = 	require ('sequelize')
const bodyParser	= require('body-parser')
const session 		= require('express-session')
const dotenv 		= require('dotenv').load()
const app = express()

// Set view engine to pug
app.set('view engine', 'pug')
app.set('views', __dirname+'/views')

// Set static views
app.use(express.static(__dirname+'/static'))

// Set body parser for incoming form data
app.use( bodyParser.urlencoded( {extended: true} ) )

app.use(session({
	secret: 'make it secret',
	resave: false,
	saveUninitialized: true
}))

// // Require routes
// app.use('/', require( __dirname + '/routes/login'))
app.use('/', require(__dirname + '/routes/register'))
app.use('/', require(__dirname + '/routes/maps'))

app.get('/', (req, res) => {
	res.render('index', {user:req.session.user})
})

// Listen on localhost:8000
app.listen(8000, () => {
	console.log('Server listening...')
})