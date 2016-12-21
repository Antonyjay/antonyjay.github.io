const multer 	= require('multer')
const express 	= require('express')
const router 	= express.Router()
const bodyParser= require('body-parser')
const fs 		= require ('fs')
const upload 	= multer({ dest: __dirname + '/../static/uploads/' })
const db 		= require(__dirname + '/../modules/database')


router.route('/submitbulk')
.get( (req, res) => {
	res.render('submitbulk')
})
// Route for submitting bulk
.post( upload.single('picture'), (req, res) => {
	console.log(req.file)
	
	db.Bulk.create({
		latitude:   req.body.latitude,
		longitude:  req.body.longitude, 
		title: 		req.body.title,
		summary:    req.body.summary, 
		picture: 	req.file.filename
	})
	res.redirect('maps')
})

router.route('/getdots')
.get((req,res)=>{
//getting the information out of the library
	db.Bulk.findAll().then( bulk => { 
		bbulk = []
		for (var i = 0; i < bulk.length; i++) {
			bbulk.push( bulk[i].dataValues)
		}
		console.log (bbulk)
		res.send(bbulk)
	})
})

router.route('/wittebank')
.get((req,res)=> {
	res.render('wittebank')
})

module.exports = router