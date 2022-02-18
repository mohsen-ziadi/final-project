var express = require("express");
var router = express.Router();
const path = require("path");
const Post = require("../model/post")

router.post("/add", (req, res) => {
        const NewPost = new Post({
            title: req.body.title,
            intro: req.body.intro,
            author: req.session.user.fristname +" "+ req.session.user.lastname,
        })

        NewPost.save((err, post) => {
            if (err) {
                console.log("err>>>>>>>>>>>>>" + err);
                console.log("user>>>>>>>>>>>>" + post);
                return res.redirect("/auth/profile")
            }

            res.redirect("/auth/profile")

        })

})

router.get("/", (req, res) => {
    Post.find({},(err , result)=>{
        res.render("post" ,{post:result});
    })
})

router.get("/:_id", (req, res) => {
    console.log(req.params._id);
    Post.find({_id:req.params._id},(err , result)=>{
        res.render("singlepost" ,{post:result});
    })
})

module.exports = router;
