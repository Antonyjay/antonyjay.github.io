// Require external modules
const express 	= require('express')
const router 	= express.Router()
const bcrypt 	= require('bcrypt')


// Require our modules
const db 		= require(__dirname + '/../modules/database')

// Route for registration
router.route('/register')
	.get( (req, res) => {
		// render registration page
		res.render('register')
	})
	.post( (req, res) => {
		console.log(req.body)
		// Check if required fields are not empty
		if (req.body.username.length === 0 || req.body.password.length === 0 || 
			req.body.confirm_password.length === 0 || req.body.email.length === 0 ||
			req.body.firstname.length === 0 || req.body.lastname.length === 0) {
			res.render('register', {error: 'Please fill out all fields.'})
			return
		}

		// Check username for any weird characters
		let regex = /^\w+$/ // Allow only letters, numbers and underscores
		if (!regex.test(req.body.username)) {
			res.render('register', {error: 'Username may only contain letters, numbers and underscores.'})
			return
		}

		// Check first and last name for any weird characters
		let regex2 = /^[A-z]+$/ // Allow only letters
		if (!regex.test(req.body.firstname) || !regex.test(req.body.lastname)) {
			res.render('register', {error: 'First and last name may only contain letters.'})
			return
		}

		// Check if passwords match
		if (req.body.password !== req.body.confirm_password) {
			res.render('register', {error: 'Passwords do not match. Please enter the same password twice.'})
			return
		}

		//Check if password is minimun of 8 characters
		if (req.body.password.length < 8) {
			res.render('register', {error: 'Password need to be at least 8 characters.'})
			return
		}

		// Encrypt password
		bcrypt.hash(req.body.password, 8, (err, hash) => {
			if (err) {
				res.render('register', {error: 'Something went wrong. Please try again.'})
				return
			}
			// Store user in db
			db.User.create({
				username: 	req.body.username,
				password: 	hash,
				email: 		req.body.email,
				firstName: 	req.body.firstname,
				lastName: 	req.body.lastname
			}).then( user => {
				// Create user login session
				req.session.user = {
					id: 		user.id,
					username: 	user.username,
					email: 		user.email,
					firstName: 	user.firstName,
					lastName: 	user.lastName
				}
				// Redirect to home page
				res.redirect('/user/?id='+user.id)
			}).catch( error => {
				// DB Error; Likely username or email already taken
				console.log(error)
				res.render('register', {error: 'Username or email already taken.'})
			})
		})
	})

module.exports = router
