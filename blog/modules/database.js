// Container object
var db = { }

const bcrypt	= 	require ('bcrypt')
const Sequelize = 	require ('sequelize')

// link to database
db.conn = new Sequelize( 'blog', process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
	}
} )

//creating the table user
db.User = db.conn.define ('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING
})

//creating the table post
db.Post = db.conn.define ('post', {
	title: Sequelize.STRING,
	message: Sequelize.STRING
})

// creating the comments table

db.Comment = db.conn.define ('comment', {
	message: Sequelize.STRING
})

// Linking tables
db.User.hasMany(db.Post)
db.Post.belongsTo(db.User)

db.Post.hasMany(db.Comment)
db.Comment.belongsTo(db.Post)

db.User.hasMany(db.Comment)
db.Comment.belongsTo(db.User)

//create a user and destroy it
db.conn.sync({force: true}).then(function () {
	db.Post.create({
		title: "Een verhaal",
		message: " Er was eens een klein prinsje "
	})
	db.Post.create({
		title: "Liefdesbriefje",
		message: " Hoi, wil jij met me mee achterop de fiets? "
	})
	db.User.create({
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

module.exports = db