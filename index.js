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
            rightoption1: "ACCOUNT",
            url1: "views/userprofile.hbs",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("index.hbs",{
            rightoption1: "SIGN UP",
            url1: "registerpage",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})

app.get("/loginpage", function(req,res)
{
    res.render("login.hbs")
})

app.get("/submitsite", function(req,res){
    res.render("submitsite.hbs")
})

app.get("/registerpage", function(req,res)
{
    res.render("register.hbs")
})

app.post("/register", urlencoder, function (req,res){
    let username = req.body.un
    let password = req.body.pw
    let email = req.body.em

    
    if (username.trim()=="" || password.trim()=="" || email.trim()==""){
        res.render("register.hbs",{
            error:"Please input the empty field/s."
        })
    }else{
        req.session.username = req.body.un
        res.redirect("/")
    }
    
})

app.post("/login", urlencoder, function (req, res){
    let username = req.body.un
    let password = req.body.pw
    
    if (username.trim()=="" || password.trim()==""){
        res.render("login.hbs",{
            error:"Please input the empty field/s."
        })
    }else{
        req.session.username = req.body.un
        res.redirect("/")
    }
})

app.get("/signout", function(req, res){
    req.session.destroy()
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("listening to port 3000")
})

