// Require external modules
const express 	= require('express')
const router 	= express.Router()
const bodyParser = require('body-parser')


// Require our modules
const db 		= require(__dirname + '/../modules/database')

router.route('/maps')
	.get( (req, res) => {
		res.render('maps')
	})
	



module.exports = router