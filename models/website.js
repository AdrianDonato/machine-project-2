const mongoose = require("mongoose")

let Website = mongoose.model("website", {
    websitename: String,
    avg_designscore: Number,
    avg_usabilityscore: Number,
    avg_contentscore: Number,
    avg_creativityscore: Number,
    avg_trustscore: Number,
    reviews: {
        username: String,
        designscore: Number,
        usabilityscore: Number,
        contentscore: Number,
        creativityscore: Number,
        trustscore: Number,
        review: String
    },
    tags: {
        tag: String
    }
})

model.exports = {
    Website
}