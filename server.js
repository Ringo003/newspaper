var express = require('express')
var app = express()
var PORT = process.env.PORT || 3000 

//Routes
app.get('/', function(req, res){
    res.send('hello world')
})

app.listen(PORT,function(){
	console.log('listening on PORT: '+ PORT)
})