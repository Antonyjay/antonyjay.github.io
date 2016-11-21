const Sequelize = 	require ('sequelize')
const express =		require ('express')
const bodyParser =	require ('body-parser')
const session =		require ('express-session')
const bcrypt= 		require ('bcrypt')

let app = express ()

// link to database
let sequelize = new Sequelize('blog', process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD , {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
})

//stating the route for the static folders
app.use( '/src', express.static (__dirname	+ '/static'))

//creating the table user
let User = sequelize.define ('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
})

//creating the table post
let Post = sequelize.define ('post', {
	title: Sequelize.STRING,
	message: Sequelize.STRING
})

// creating the commets table

let Comment = sequelize.define ('comment', {
	message: Sequelize.STRING
})

// Linking tables
User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

User.hasMany(Comment)
Comment.belongsTo(User)

//starting the session
app.use (session ({
	secret:'make it secret',
	resave: true, 
	saveUninitialized: false
}))

//setting the views
app.set ('views', __dirname + '/views')
app.set ('view engine', 'pug')


//rendering the / route
app.get ('/', function (request, response) {
	response.render ('index', {
		message: request.query.message,
		user: request.session.user
	})
})

// rendering the register page
app.get ('/register', function (request,response) {
	response.render ('register')
})


// rendering the post table
app.get ('/allposts', bodyParser.urlencoded({extended: true}), function (request,response) {
	let user = request.session.user
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please Log in to view all posts"))
	} else {
		Post.findAll ( {
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


app.get ('/message', function (request, response) { 
	Post.findAll ({
		where: {
			id: request.query.id
		}
	}).then ( posts => {
		console.log ('this is wha u want to see now'+ posts)
		response.render ('message', {posts:posts})
	})
})





// setting the profile page, if there is a user in the session, show profile otherwise the message
app.get ('/profile', function (request, response) {
	let user = request.session.user
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please Log in to view your profile"))
	} else {
		response.render('profile', {
			user: user
		})
	}
})

app.get ('/ownposts', function (request, response) {
	let user = request.session.user
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please Log in to view your own posts"))
	} else {
		Post.findAll({
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

app.post ('/comments',  bodyParser.urlencoded({extended: true}), function (request,response){
	User.findOne({
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



// the post registration to fill the table with the info from the form
app.post ('/registration',  bodyParser.urlencoded({extended: true}), function (request,response){
	bcrypt.hash (request.body.password, 9, function (err,hash ) {
		User.create({
			name: request.body.firstname,
			email: request.body.email,
			password: hash
		})
		response.redirect('/profile')
	})
})





app.post ('/fillPostTable',  bodyParser.urlencoded({extended: true}), function (request,response){
	Post.create({
		title: request.body.title,
		message: request.body.message,
		userId: request.session.user.id
	})
	response.redirect('/profile')
})

//What happens after trng to fill in your credentials at /
app.post('/login', bodyParser.urlencoded({extended: true}), function (request, response) {
	if(request.body.email.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
		return;
	}

	if(request.body.password.length === 0) {
		response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
		return;
	}
	User.findOne({
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

//end the session
app.get('/logout', function (request, response) {
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("You Logged out"));
	})
});

//create a user and destroy it
sequelize.sync({force: true}).then(function () {
	Post.create({
		title: "Een verhaal",
		message: " Er was eens een klein prinsje "
	})
	Post.create({
		title: "Liefdesbriefje",
		message: " Hoi, wil jij met me mee achterop de fiets? "
	})
	User.create({
		name: "Antony",
		email: "ant@ony",
		password: "wachtwoord"
	}).then(function (antony) {
		antony.createPost({
			title: "I am linked",
			message: "POTATO"
		}).then(function(post) {
			post.createComment({
				comment: "That is absolute non-sense!"
			})
		} )
	});
}, function (error) {
	console.log('sync failed: ');
	console.log(error);
});


var server = app.listen(8000, function () {
	console.log('server up and running')
});




















