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
        res.render("index.hbs",{
            rightoption1: "SIGN UP",
            rightoption2: "LOG IN"
        })
    }
    else{
        res.render("index.hbs",{
            rightoption1: "ACCOUNT",
            rightoption2: "LOG OUT"
        })
    }
})

app.get("/signout", function(req, res){
    req.session.destroy()
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("listening to port 3000")
})

