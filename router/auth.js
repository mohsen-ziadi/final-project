var express = require("express");
var router = express.Router();
const path = require("path");
const user = require("../model/user");
const User = require("../model/user")

function sessionChecker(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect("/auth/profile");
    }
}



router.get("/", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect("/auth/profile");
    }
    res.render("signUp", { status: "", msg: "" });
})

router.post("/register", (req, res) => {

    const NewUser = new User({
        fristname: req.body.fristname,
        lastname: req.body.lastname,
        username: req.body.username.toLowerCase().trim(),
        password: req.body.password,
        email: req.body.email,
        callnumber: req.body.callnumber,
        sex: req.body.sex
    })

    NewUser.save((err, user) => {
        if (err) {
            console.log("err>>>>>>>>>>>>>" + err);
            console.log("user>>>>>>>>>>>>" + user);
            return res.redirect("/auth")
        }

        res.redirect("/auth")

    })
})


router.post("/login", (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username.toLowerCase().trim() }, (err, result) => {
        // console.log(result);
        if (err) {
            console.log(err);
            return res.redirect("/auth")
        }
        if (result.password != req.body.password) {
            return res.redirect("/auth")
        }
        req.session.user = result;

        res.redirect("/auth/profile")
    });
})

router.get("/profile", (req, res) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect("/auth")
    }
    // console.log(resultUser);
    
    User.find({}, (err, resultUser) => {
        res.render("profile", { result: req.session.user, resultUser });
        console.log(resultUser);
    })
})


router.post("/update", (req, res) => {
    User.findOneAndUpdate({ username: req.body.username.toLowerCase().trim() }, { fristname: req.body.fristname, lastname: req.body.lastname, email: req.body.email, userename: req.body.username.toLowerCase().trim() }, { new: true }, function (err) {
        if (err) {
            return console.log("err>>>>>>>>>" + err);
        }
        res.redirect("/auth")

    })
})

router.get("/logOut", (req, res) => {
    res.clearCookie("user_sid");
    res.redirect("/auth")
})

router.get("/deletuser/:username",(req,res)=>{
    console.log(req.params.username);
    User.deleteOne({username:req.params.username},(err)=>{
        if(err){
            return res.send("eror!!!!!!!!!!!!!!!!!!!!!!!!")
        }
    });
    res.redirect("/auth/profile")
    // res.redirect("/auth/profile")
})



module.exports = router;
