const Sequelize = 	require ('sequelize')
const express 	=	require ('express')
const bodyParser=	require ('body-parser')
const session 	=	require ('express-session')
const router 	= express.Router()
const db = require ('../modules/database')

// rendering the post table
router.get ('/allposts', bodyParser.urlencoded({extended: true}), function (request,response) {
	let user = request.session.user
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please Log in to view all posts"))
	} else {
		db.Post.findAll ( {
			attributes: [ 'id', 'title', 'message']
		}).then( posts => {
			ppost = []
			for (var i = 0; i < posts.length; i++) {
				ppost.push( posts[i].dataValues)
			}
			response.render ( 'allposts', {posts:ppost})
		} )
	}
})

//rendering the message page
router.get ('/message', function (request, response) { 
	db.Post.findAll ({
		where: {
			id: request.query.id
		}
	}).then ( posts => {
		response.render ('message', {posts:posts})
	})
})

//rendering the ownpost by including the necessary info from the database
router.get ('/ownposts', function (request, response) {
	let user = request.session.user
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please Log in to view your own posts"))
	} else {
		db.Post.findAll({
			where: {
				userId: request.session.user.id
			}
		}).then( posts => { 
			ppost = []
			for (var i = 0; i < posts.length; i++) {
				ppost.push( posts[i].dataValues)
			}
			response.render ( 'ownposts', {posts:ppost})
		} )
	}
})

//filling the comments page and linking it to a user and message
router.post ('/comments',  bodyParser.urlencoded({extended: true}), function (request,response){
	db.User.findOne({
		where: {
			id : request.session.user.id
		}
	}).then( user => {
		user.createComment({
			postId: request.body.post_id,
			message: request.body.comment
		})
	} )
	response.send (request.body.comment)
})

//filling the post table
router.post ('/fillPostTable',  bodyParser.urlencoded({extended: true}), function (request,response){
	db.Post.create({
		title: request.body.title,
		message: request.body.message,
		userId: request.session.user.id
	})
	response.redirect('/profile')
})

module.exports = router
