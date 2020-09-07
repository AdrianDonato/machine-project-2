const mongoose = require("mongoose")

let Review  = mongoose.model("review", {
   date: Date,
   username: String,
   websitename: String,
   designscore: Number,
   usabilityscore: Number,
   contentscore: Number,
   creativityscore: Number,
   trustscore: Number,
   review: String
})

module.exports = {
   Review
}
