const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended:false
})

app.use(session({
    secret:"very secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60
    }
}))

app.get("/", function(req, res){
    if (req.session.username){
    }
    else{
    }
})

app.get("/signout", function(req, res){
    req.session.destroy()
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("listening to port 3000")
})

