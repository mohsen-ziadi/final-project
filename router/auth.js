var express = require("express");
var router = express.Router();
const path = require("path");
const user = require("../model/user");
const User = require("../model/user");



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



router.get("/", (req, res) => {
res.render("main");
})

router.post("/login", (req, res) => {
    User.findOne({ username: req.body.username.toLowerCase().trim() }, (err, result) => {

        if (err) {
            console.log(err);
            return res.redirect("/auth")
            // return alert("eror")
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

    })
})


router.post("/update", (req, res) => {
    User.findOneAndUpdate({ username: req.body.username.toLowerCase().trim() }, {
        fristname: req.body.fristname,
        lastname: req.body.lastname,
        email: req.body.email,
        userename: req.body.username.toLowerCase().trim(),
        callnumber: req.body.callnumber,
        sex: req.body.sex,
        role: req.body.role
    }, { new: true }, function (err) {
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

router.get("/deletuser/:username", (req, res) => {
    User.deleteOne({ username: req.params.username }, (err) => {
        if (err) {
            return res.send("eror!!!!!!!!!!!!!!!!!!!!!!!!")
        }
    });
    res.redirect("/auth/profile")
    // res.redirect("/auth/profile")
})

router.get("/updateUser/:username", (req, res) => {
    console.log("sss>>>", req.params.username );
    User.findOne({ username: req.params.username }, (err, result) => {
        console.log(result);
        res.render("update", { result:result })
    })
   
})




module.exports = router;
