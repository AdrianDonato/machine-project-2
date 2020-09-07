const mongoose = require("mongoose")

let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    role: String,
    firstname: String,
    lastname: String,
    reviews: [
        {
            date: Date,
            websitename: String,
            designscore: Number,
            usabilityscore: Number,
            contentscore: Number,
            creativityscore: Number,
            trustscore: Number,
            review: String
        }
    ]
})

module.exports = {
    User
}
