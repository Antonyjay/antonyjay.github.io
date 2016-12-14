/*
Module to set up the database
*/
// Require modules
const sequelize		= require('sequelize')

let db = {}

// Initialize db
db.conn = new sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	server: 	process.env.DB_SERVER,
	dialect: 	process.env.DB_DIALECT
})


// Models
db.User = db.conn.define ('user', {
	username: 		{type: sequelize.STRING, unique: true},
	password: 		sequelize.STRING,
	email: 			{type: sequelize.STRING, unique: true},
	firstName: 		sequelize.STRING,
	lastName: 		sequelize.STRING,
})

db.Bulk = db.conn.define ('bulk', {
	latitude:       sequelize.STRING,
	longitude:      sequelize.STRING , 
	title:   		sequelize.STRING,
	summary:     	sequelize.TEXT,
	picture: 		sequelize.STRING
})



// Synchronize database
db.conn.sync({force:true}).then( conn =>{

	console.log('Database sync successful')

	
	db.User.create({
		username: 		"Antony",
		password: 		"ww",
		firstName: 		"Antony",
		lastName: 		"Cuv",
		email: 			"g@gmail.com",
	})

	
}, (err) => {
	console.log('Database sync failed: '+err)
} )

module.exports = db
