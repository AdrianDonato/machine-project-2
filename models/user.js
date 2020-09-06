const mongoose = require("mongoose")

let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    reviews: {
        websitename: String,
        designscore: Number,
        usabilityscore: Number,
        contentscore: Number,
        creativityscore: Number,
        trustscore: Number
        review: String
    }
})

module.exports = {
    User
}
