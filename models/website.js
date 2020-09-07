const mongoose = require("mongoose")

let Website = mongoose.model("website", {
    websitename: String,
    category: String,
    avg_designscore: Number,
    avg_usabilityscore: Number,
    avg_contentscore: Number,
    avg_creativityscore: Number,
    avg_trustscore: Number,
    tags: [
        {
            tag: String
        }
    ]
})

model.exports = {
    Website
}
