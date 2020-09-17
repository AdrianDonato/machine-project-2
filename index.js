const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express()
const {User} = require("./models/user.js")
const {Website} = require("./models/website.js")
const urlencoder = bodyparser.urlencoded({
    extended:false
})

mongoose.connect("mongodb://127.0.0.1:27017/apdev-mp2-3-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

User.find({}).then((docs)=>{
        for(let i = 0; i < docs.length; i++){
            console.log(JSON.stringify(docs[i]) + "\n")
        }
},(err)=>{
    console.log("Error: " + err)
})

let s = 6


app.use(session({
    secret:"very secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60,
        httpOnly: true
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
    Website.find({}).then((docs)=>{
        if (req.session.username){
            res.render("index.hbs",{
                rightoption1: "ACCOUNT",
                url1: "userprofile",
                rightoption2: "LOG OUT",
                url2: "signout",
                websites: docs            
            })
        }   
        else{
            res.render("index.hbs",{
                rightoption1: "SIGN UP",
                url1: "register",
                rightoption2: "LOG IN",
                url2: "loginpage",
                websites: docs
            })
        }
    },(err)=>{
        console.log(err)
    })
   
})


app.get("/moderator", function(req,res)
{
    if (req.session.username){
    res.render("moderator.hbs",{
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

app.get("/websitepage", function(req,res)
{

    if (req.session.username){
        res.render("websitepage.hbs",{
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout",
        })
    }
    else{
        res.render("websitepage.hbs",{
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage",
           
        })
    }
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

app.get("/reviewdetails", function(req,res){
    res.render("reviewinfo.hbs",{
        rightoption1: "ACCOUNT",
        url1: "userprofile",
        rightoption2: "LOG OUT",
        url2: "signout",
        websitename : "Sample Website",
            websitecategory : "Informational",
            websitelink : "sample url",
            rating : "4.7",
        design : "4.5",
        usability : "5",
        creativity : "4.5",
        content : "4.5",
        trust : "5",
        review : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    })
})
app.post("/review", function(req,res){
   res.redirect("/")
})

function siteSaved(sitename, weburl){
    Website.find({}).then((docs)=>{
        for(let i = 0; i < docs.length; i++){
            if(docs[i].websitename == sitename || docs[i].websiteurl == weburl){
                console.log("website already saved")
                return true
            }
        }
    }, (err)=>{
        console.log(err)
    })

    return false
}
app.post("/submitsite", urlencoder,function(req,res){
    sitename = req.body.site
    weburl = req.body.link

    if(siteSaved(sitename, weburl)){
        console.log("site already saved")
            
        res.render("submitsite.hbs",{
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout",
            error: "Website already in database"
        })
    }else{
        let website = new Website({
            websitename: sitename,
            websiteurl: weburl,
            creator: req.body.creator,
            category: req.body.category,
            website_desc: req.body.desc,
        })

        website.save().then((doc)=>{
            console.log("Successfully added: " + doc)
        },(err)=>{
            console.log(err)
        })
        res.redirect("/")
    }
})

app.get("/userprofile", function(req,res){
    User.findOne({username: req.session.username}).then((doc)=>{
        res.render("userprofile.hbs",{
            rightoption1: "EDIT PROFILE",
            url1: "editprofile",
            rightoption2: "LOG OUT",
            url2: "signout",
            username: req.session.username,
            email: doc.email,
            fname: doc.firstname,
            lname: doc.lastname
        })
        console.log(JSON.stringify(doc))
    },(err)=>{
        console.log(err)
    })
  
})
app.get("/viewreviews", function(req,res){
    res.render("listreviews.hbs",{
        rightoption1: "ACCOUNT",
        url1: "userprofile",
        rightoption2: "LOG OUT",
        url2: "signout"
    })
})

function isAvailable(username){
    User.find({}).then((docs)=>{
        for(let i = 0; i < docs.length; i++){
            if(docs[i].username = username){
                console.log("Duplicate username detected ")
                return false
                }
            }
        },(err)=>{
            console.log(err)
        })

        return true
}
app.post("/register", urlencoder, function (req,res){
    let username = req.body.un
    let password = req.body.pw
    let verifiedpw = req.body.vpw
    let email = req.body.em
    let fname = req.body.fname
    let lname = req.body.lname

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
        
        if(!isAvailable(username)){
            res.render("register.hbs",{
                error:"Username is already taken",
                rightoption1: "SIGN UP",
                url1: "register",
                rightoption2: "LOG IN",
                url2: "loginpage"
            })
        }else{
        let user = new User({
            username: username,
            password: password,
            email: email,
            role: "user",
            firstname: fname,
            lastname:lname,
            profilepic: req.body.userImg
        })

           user.save().then((doc)=>{
                console.log("Successfully added: " + doc)   
            },(err)=>{
                console.log("Error in adding: " + err)
            })
            
            req.session.username = req.body.un
            res.redirect("/")
        }
    }
})

app.post("/login", urlencoder, function (req, res){
    let lusername = req.body.un
    let lpassword = req.body.pw
    
    if (lusername.trim()=="" || lpassword.trim()==""){
        res.render("login.hbs",{
            error:"Please input the empty field/s.",
            rightoption1: "SIGN UP",
            url1: "register",
            rightoption2: "LOG IN",
            url2: "loginpage"
        })
    }else{
        User.find({}).then((docs)=>{
            for(let i = 0; i < docs.length; i++){
                if(docs[i].username == lusername && docs[i].password == lpassword){
                    req.session.username = docs[i].username
                    res.redirect("/")
                }else{
                    res.render("login.hbs",{
                        error:"Username and password do not match",
                        rightoption1: "SIGN UP",
                        url1: "register",
                        rightoption2: "LOG IN",
                        url2: "loginpage"
                    })
                }
            }
        })
    }
})

app.get("/editprofile", function(req,res){
    User.findOne({username: req.session.username}).then((doc)=>{
        res.render("editprofile.hbs", {
            rightoption1: "ACCOUNT",
            url1: "userprofile",
            rightoption2: "LOG OUT",
            url2: "signout",
            email: doc.email,
            firstname: doc.firstname,
            lastname: doc.lastname
        })
    })
})

app.post("/updateprofile", urlencoder,function (req,res){
    let lemail = req.body.em
    let fname = req.body.fname
    let lname = req.body.lname

    User.findOneAndUpdate({username: req.session.username},
        {
            email: lemail,
            firstname: fname,
            lastname: lname
        },{
            new: true
        }).then((doc)=>{
        console.log("Updated Doc: "+ JSON.stringify(doc))
    })
    res.redirect("/")
})
app.get("/social", function(req,res){
    if (req.session.username){
        res.render("categories.hbs",{
            Category: "Social Media",
            rightoption1: "ACCOUNT",
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
            rightoption1: "ACCOUNT",
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
            rightoption1: "ACCOUNT",
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
            rightoption1: "ACCOUNT",
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
            rightoption1: "ACCOUNT",
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
            rightoption1: "ACCOUNT",
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

