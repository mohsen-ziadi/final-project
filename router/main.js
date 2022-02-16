var express = require("express");
const { append } = require("express/lib/response");
var router = express.Router();
const path = require("path");

router.get("/",(req,res)=>{
    res.render("main");
})

module.exports = router;
