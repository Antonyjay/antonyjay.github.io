const express 	= require ('express')
const app		= express ()

console.log ('Starting app')

app.use ( express.static ('static'))

app.get ('/', (req,res)=>{
	console.log ('Someone opened the main page')
})

app.listen(3000, ()=> {
	console.log ('Express listening')
})

