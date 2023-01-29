require("dotenv").config();
const express= require("express");
const path= require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookies=require("cookie-parser");
require("./conn");
const hbs =require("hbs");
const data_employe =require("./schema");
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//templet path//
const staticpath= path.join(__dirname,"../public")
const template= path.join(__dirname,"../templet/views")
const partiles = path.join(__dirname,"../templet/partiles")
// console.log(partiles);


// middlware
// app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
// app.use('/css',express.static(path.join(__dirname,"../node_modules/font-awesome/css")))
// app.use('/css',express.static(path.join(__dirname,"../node_modules/nprogress")))
// app.use('/css',express.static(path.join(__dirname,"../node_modules/animate.css")))
// app.use('/css',express.static(path.join(__dirname,"../node_modules/iCheck/skins/flat")))
// app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap-progressbar/css")))
// app.use('/css',express.static(path.join(__dirname,"../node_modules/jqvmap/dist")))
// app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap-daterangepicker")))

// app.use('/js',express.static(path.join(__dirname,"../node_modules/jquery/dist")))
// app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))


app.use(express.static(staticpath));

app.set("view engine","hbs");
app.set("views",template);
hbs.registerPartials(partiles);

// app.get("/",(req,res)=>{
//     res.send("hii");

// })

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register" ,async(req,res)=>{
    //  console.log(req.body.username);
    //  res.send(req.body.username);

    var req = req.body;
    

    const new_employe = new data_employe ({

        username:req.username,
        email:req.email,
        password:req.password
        
    });
    const token= await new_employe .tokens();
    
    const new_employe_result= await new_employe.save();


    //cookies//

    res.cookie("jwt",token,{
        expires:new Date(Date.now() +4000),
        httpOnly:true,
    });
    // console.log(cookie);


    res.render("index");
        
});


app.post("/",async(req,res)=>{

    const email = req.body.email
    const password = req.body.password

    //data base//
    const useremail= await data_employe.findOne({email});

    const passwordmatch = bcrypt.compare(password,  useremail.password);

    const token= await useremail.tokens();

    res.cookie("jwt",token,{
        expires:new Date(Date.now() +4000),
        httpOnly:true,
    });

    // console.log(`this is the cookie${req.cookies.jwt}`);
    

    if (passwordmatch) {
        res.render("abc");
    }
    else{
        res.send("password dose not match");
    }

    // if (useremail.password == password) {
    //     res.render("register")
    // } else {
    //     res.send("user data not found");
    // }
})



// const createtoken = async()=>{

//     const token= await jwt.sign({_id:"638f03c595ce25a5c79d34f0"},"kasjfiejfknjnvvnlnkdsbjJ?Ng.DJn");
//     console.log(token);

//     const verify= await jwt.verify(token,"kasjfiejfknjnvvnlnkdsbjJ?Ng.DJn");
//     console.log(verify);
// }
// createtoken();


app.get("/logout",async(req,res)=>{
    try {
        req.cookies.clear("jwt");
    } catch (error) {
        
    }
})
app.get("/*",(req,res)=>{
    res.send("404 page not found");
})
app.listen(3000)
console.log(app.listen);