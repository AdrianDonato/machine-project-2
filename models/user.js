const mongoose = require("mongoose")

let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    role: String,
    firstname: String,
    lastname: String,
    userImg: String
})

module.exports = {
    User
}
