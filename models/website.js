const mongoose = require("mongoose")

let Website = mongoose.model("website", {
    websitename: String,
    websiteurl: String,
    creator: String,
    category: String,
    intro_text: String,
    website_desc: String,
    web_of_the_day: Boolean,
    feature_list: [String],
    overall_score: Number,
    avg_designscore: Number,
    avg_usabilityscore: Number,
    avg_contentscore: Number,
    avg_creativityscore: Number,
    avg_trustscore: Number,
    date_added: Date,
    tags: [String]
})

module.exports = {
    Website
}
