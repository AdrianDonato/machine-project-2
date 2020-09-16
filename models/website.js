const mongoose = require("mongoose")

let Website = mongoose.model("website", {
    websitename: String,
    websiteurl: String,
    creator: String,
    category: String,
    intro_text: String,
    website_desc: String,
    feature_list: [String],
    overall_score: String,
    avg_designscore: Number,
    avg_usabilityscore: Number,
    avg_contentscore: Number,
    avg_creativityscore: Number,
    avg_trustscore: Number,
    date_added: Date,
    tags: [String]
})

model.exports = {
    Website
}
