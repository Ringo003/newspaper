var mongoose = require("mongoose")

var Schema = mongoose.Schema

var headlineSchema = new Schema({
	headline: {
		type: String,
		required: true,
		unique: true
	},
	date: String,
	saved: {
		type: Boolean,
		default: false
	}
})

var Headlines = mongoose.model("Headline", headlineSchema)

module.export = Headline;