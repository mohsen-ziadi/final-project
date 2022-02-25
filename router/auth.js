var express = require("express");
const req = require("express/lib/request");
const { redirect } = require("express/lib/response");
const res = require("express/lib/response");
var router = express.Router();
const path = require("path");
const user = require("../model/user");
const User = require("../model/user");



function sessionChecker(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect("/auth/profile");
    }
}

function validRegister(info) {
    console.log("req>>>>>>>>>>>>>func>>>>>>>", info);
}

router.get("/register", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect("/auth/profile");
    }
    res.render("register", { status: "", msg: "" });
})


router.post("/register", (req, res) => {

    if (!req.body.fristname || !req.body.lastname || !req.body.username || !req.body.password || !req.body.email || !req.body.callnumber || !req.body.repeatPass) {
        return res.render("register", { msg: "لطفا تمامی فیلد ها را پر کنید." })
    }

    User.find({}, (err, user) => {
        if (req.body.username === user.usernaem) {
            return res.render("register", { msg: "این نام کاربری قبلا ثبت شده است." })
        }
    })

    if (req.body.password.length < 8) {
        return res.render("register", { msg: "رمز عبور نباید کمتر از 8 رقم باشد" })
    }

    if (req.body.password !== req.body.repeatPass) {
        return res.render("register", { msg: "تکرار رمز عبور با رمز اولیه اشتباه یکسان نیست." })
    }


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
            return res.render("register", { msg: "خطا در ثبت نام" })
        }

        res.redirect("/auth/login")

    })
})



router.get("/login", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect("/auth/profile");
    }
    res.render("login", { status: "", msg: "" });
})

router.post("/login", (req, res) => {
    User.findOne({ username: req.body.username.toLowerCase().trim() }, (err, result) => {

        if (err) {
            console.log(err);

            return res.render("login", { msg: "خطا در ورود" })
            // return alert("eror")
        }
        
        if (!result || (result.password != req.body.password)) {
            return res.render("login", { msg: "نام کاربری یا رمزعبور اشتباه است." })

        }
        req.session.user = result;

        res.redirect("/auth/profile")
    });
})

router.get("/profile", (req, res) => {
    if (!req.session.user || !req.cookies.user_sid) {
        return res.redirect("/auth/login")
    }
    // console.log(resultUser);
    console.log(req.session.user.role);
    if (req.session.user.role === "blogger") {
        return res.render("profile", { result: req.session.user, resultUser: [] });
    }
    User.find({}, (err, resultUser) => {
        return res.render("profile", { result: req.session.user, resultUser });
    })
})

// router.post("/createAdmin",(req,res)=>{
//     User.find({username:req})
// })


router.post("/update", (req, res) => {

    User.findOneAndUpdate({ username: req.body.username.toLowerCase().trim() }, {
        fristname: req.body.fristname,
        lastname: req.body.lastname,
        email: req.body.email,
        userename: req.body.username.toLowerCase().trim(),
        callnumber: req.body.callnumber,
        sex: req.body.sex,
        role: req.body.role
    }, { new: true }, function (err, result) {
        if (err) {
            return console.log("err>>>>>>>>>" + err);
        }
        req.session.user = result;

        res.redirect("/auth/login")

    })
})

router.get("/logOut", (req, res) => {
    req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/auth/login")
})

router.get("/delete-account",(req,res)=>{
    User.deleteOne({ username: req.session.user.username }, (err) => {
        if (err) {
            return res.send("eror!!!!!!!!!!!!!!!!!!!!!!!!")
        }
    });
    req.session.destroy();
    res.clearCookie("user_sid");
    res.redirect("/auth/profile")
})

router.get("/deletuser/:username", (req, res) => {
    User.find({username:req.params.username},(err,result)=>{
     if(result.role==="admin"){
         return res.redirect("/profile");
     }
    })

    User.deleteOne({ username: req.params.username }, (err) => {
        if (err) {
            return res.send("eror!!!!!!!!!!!!!!!!!!!!!!!!")
        }
    });
    
    res.redirect("/auth/profile")
    // res.redirect("/auth/profile")
})

router.get("/updateUser/:username", (req, res) => {
    console.log("sss>>>", req.params.username);
    User.findOne({ username: req.params.username }, (err, result) => {
        console.log(result);
        res.render("update", { result: result })
    })

})




module.exports = router;
