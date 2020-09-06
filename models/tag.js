const mongoose = require("mongoose")

let Tag = mongoose.model("tag", {
    tag: String
})

model.exports = {
    Tag
}