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
	latitude:       sequelize.FLOAT,
	longitude:      sequelize.FLOAT, 
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

	db.Bulk.create({
		latitude: 	'52.353337',
		longitude: 	'4.944006',
		title: 		'Tuinstoel',
		summary: 	'Deze stoel zag ik net staan op het Archimedesplantsoen. Zoals je ziet is hij nog een goede staat. Zonde om weg te gooien!',
		picture: 	'60274c843fdbce4fe13e4416fbbffeb2'
	})

	db.Bulk.create({
		latitude: 	'52.373801',
		longitude: 	'4.890935',
		title: 		'Whatsuppp',
		summary: 	'goeiemorguh',
		picture: 	'8aa8259065d812a3ef2a40baddce5478'
	})

	
}, (err) => {
	console.log('Database sync failed: '+err)
} )

module.exports = db
