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

app.use(express.static('public'))

app.get("/loginpage", function(req,res)
{
    if (req.session.username){
        res.render("index.hbs",{
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }else{
        res.render("login.hbs",{
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})

app.get("/search", function(req,res){
    if (req.session.username){
        res.render("search.hbs",{
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("search.hbs",{
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})

app.get("/submitsite", function(req,res){
    if (req.session.username){
        res.render("submitsite.hbs",{
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "loginpage"
        })
    }else{
        res.render("login.hbs",{
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
    
})

app.get("/register", function(req,res)
{
    res.render("register.hbs",{
        rightoption1: "SIGN UP",
        url1: "registerpage",
        rightoption2: "LOG IN",
        url2: "loginpage"
    })
})

app.get("/", function(req,res)
{
    if (req.session.username){
    res.render("index.hbs",{
        rightoption1: "ACCOUNT",
        url1: "userprofile",
        rightoption2: "LOG OUT",
        url2: "signout"
    })
}
else{
    res.render("index.hbs",{
        rightoption1: "SIGN UP",
        url1: "register",
        rightoption2: "LOG IN",
        url2: "loginpage"
    })
}
})

app.get("/websitepage", function(req,res)
{
    if (req.session.username){
        res.render("websitepage.hbs",{
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("websitepage.hbs",{
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})
app.get("/userprofile", function(req,res){
    res.render("userprofile.hbs", {
        rightoption1: "ACCOUNT",
        url1: "userprofile",
        rightoption2: "LOG OUT",
        url2: "signout"
    })
})

app.get("/review", function(req,res){
    if (req.session.username){
        res.render("review.hbs",{
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("login.hbs",{
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})
        
app.post("/register", urlencoder, function (req,res){
    let username = req.body.un
    let password = req.body.pw
    let verifiedpw = req.body.vpw
    let email = req.body.em

    
    if (username.trim()=="" || password.trim()=="" || email.trim()==""){
        res.render("register.hbs",{
            error:"Please input the empty field/s.",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }else if(password != verifiedpw){
        res.render("register.hbs",{
            error:"Password verification is incorrect.",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
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
            error:"Please input the empty field/s.",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }else{
        req.session.username = req.body.un
        res.redirect("/")
    }
})

app.get("/social", function(req,res){
    if (req.session.username){
        res.render("categories.hbs",{
            Category: "Social Media",
            rightoption1: "",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("categories.hbs",{
            Category: "Social Media",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})

app.get("/ecommerce", function(req,res){
    if (req.session.username){
        res.render("categories.hbs",{
            Category: "E-Commerce",
            rightoption1: "",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("categories.hbs",{
            Category: "E-Commerce",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})


app.get("/news", function(req,res){
    if (req.session.username){
        res.render("categories.hbs",{
            Category: "News Sites",
            rightoption1: "",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("categories.hbs",{
            Category: "News Sites",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})


app.get("/blogs", function(req,res){
    if (req.session.username){
        res.render("categories.hbs",{
            Category: "Blogs",
            rightoption1: "ACCPUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("categories.hbs",{
            Category: "Blogs",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})

app.get("/info", function(req,res){
    if (req.session.username){
        res.render("categories.hbs",{
            Category: "Informational",
            rightoption1: "",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("categories.hbs",{
            Category: "Informational",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }
})


app.get("/entertainment", function(req,res){
    if (req.session.username){
        res.render("categories.hbs",{
            Category: "Entertainment",
            rightoption1: "",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout"
        })
    }
    else{
        res.render("categories.hbs",{
            Category: "Entertainment",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
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

