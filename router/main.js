var express = require("express");
var router = express.Router();
const path = require("path");

router.get("/",(req,res)=>{
    res.render("main");
})

module.exports = router;
