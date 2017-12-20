var express = require('express')
var mongoose = require("mongoose")
var expressHandlebars = require("express-handlebars")
var bodyParser = require('body-parser')

var axios = require('axios')
var PORT = process.env.PORT || 3000 
var cheerio = require('cheerio')

var router = express.Router()
require("./config/routes")(router)

app.engine("handlebars",expressHandlebars({
	defaultLayout: "main"
}))
//Starts our express app
var app = express()
//desiginate our public folder  as a static directory
app.use(express.static(_dirname + "/public"))
//BODY PARSER 
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 
	extended: false 
}))


app.use(router)
// parse application/json

var db = process .env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error) {
	if (error) {
		console.log(error)
	}
	else {
		console.log("mongoose connection is sucessful")
	}
})

app.use(bodyParser.json())
app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })



//Routes
app.get('/', function(req, res){
    res.send('Cheese')
})



app.get('/scrape', function( req, res){

//SCRAPE
	axios.get('http://www.NYTimes.com')
	.then(function(response){
		console.log(response.data)
		var $ = cheerio.load(response.data)
		var title = $('.story-heading').children('a').text()
		console.log(title)
		var summary = $('.story-heading').children('a').text()
		console.log(summary)
	})
})




app.listen(PORT,function(){
	console.log('listening on PORT: '+ PORT)
})
