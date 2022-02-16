//Add module
const express = require("express");
const app = express();
const path = require('path');
const port = 8080;
const cookieParser = require("cookie-parser");
const session = require("express-session")
const logger = require("morgan")

// Add routes
const router = require('./router/main.js');
const authRouter = require("./router/auth")

//Add database
const mongoose = require("mongoose");
const { cookie } = require("express/lib/response");
mongoose.connect("mongodb://localhost:27017/techmag");

//Add EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    session({
        key:"user_sid",
        secret: "mySecret",
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge:600000
        },
    })
)

app.use((req,res,next)=>{
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid')        
    }
    next();
})

app.use('/', router);
app.use('/auth', authRouter);


app.listen(port);
console.log(`server runing in port: ${port}`);

