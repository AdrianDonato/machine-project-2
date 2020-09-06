const mongoose = require("mongoose")

let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    reviews: {
        websitename: String,
        rating: Number,
        review: String
    }
})

module.exports = {
    User
}
