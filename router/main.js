var express = require("express");
var router = express.Router();
const path = require("path");

router.get("/",(req,res)=>{
    res.render("main");
})

router.get("/about",(req,res)=>{
    res.render("about");
})

router.get("/contact",(req,res)=>{
    res.render("contact");
})

module.exports = router;
