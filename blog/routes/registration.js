const Sequelize = 	require ('sequelize')
const express 	=	require ('express')
const bodyParser=	require ('body-parser')
const session 	=	require ('express-session')
const bcrypt	= 	require ('bcrypt')

const router 	= express.Router()

const db = require ('../modules/database')

//creating a session
router.use (session ({
	secret:'make it secret',
	resave: true, 
	saveUninitialized: false
}))


//rendering the / route
router.get ('/', function (request, response) {
	response.render ('index', {
		message: request.query.message,
		user: request.session.user
	})
})

// the post registration to fill the table with the info from the form in the database
router.post ('/registration',  bodyParser.urlencoded({extended: true}), function (request,response){
	bcrypt.hash (request.body.password, 9, function (err,hash ) {
		db.User.create({
			name: request.body.firstname,
			email: request.body.email,
			password: hash
		})
		response.redirect('/profile')
	})
})

// rendering the register page
router.get ('/register', function (request,response) {
	response.render ('register')
})

//end the session
router.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("You Logged out"));
	})
});

// setting the profile page, if there is a user in the session, show profile otherwise the message
router.get ('/profile', function (request, response) {
	let user = request.session.user
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please Log in to view your profile"))
	} else {
		response.render('profile', {
			user: user
		})
	}
})

//Logging in
router.post('/login', bodyParser.urlencoded({extended: true}), function (request, response) {
	if(request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}
	db.User.findOne({
		where: {
			email: request.body.email
		}
	}).then(function (user) {
		bcrypt.compare(request.body.password, user.password, function(err,result){
			if (user !== null && result === true) {
				request.session.user = user;
				response.redirect('/profile');
			} else {
				response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
			}
		}, function (error) {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		});
	})
});

module.exports = router