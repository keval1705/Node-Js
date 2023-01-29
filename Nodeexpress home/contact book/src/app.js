const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./conn");
const contact_data = require("./db/schema");
const bcrypt =require("bcryptjs");
const cookieparser = require("cookie-parser");
const jwt=require("jsonwebtoken");
const Contact = require("./db/add_contact");

//image upload//
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, files, cb) {
      cb(null, '../public/uploads')
    },
    filename: function (req, files, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+".jpg"
      cb(null, files.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({storage:storage })
const app = express();
// const type= upload.single("image")
const multi = upload.array("image",2)


hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 1; i <=n; ++i)
        accum += block.fn(i);
    return accum;np
});

app.use(express.urlencoded({extended:false}));
// app.use(cookies);

const public= path.join(__dirname,"../public");
const templet= path.join(__dirname,"../templet/views");
const partials = path.join(__dirname,"../templet/partiles");

app.set("view engine","hbs");
app.set("views", templet);
hbs.registerPartials(partials);

app.use(express.static(public));
app.use(express.json());
app.use(cookieparser());

app.get("/register",(req,res)=>{
    res.render("register")
});

app.post("/register/",multi,async(req,res)=>{
    // console.log(req.body.user_name);
    // res.send(req.body.user_name);

    //singal image for use
    // var image_name= req.file.filename;

    var image_name= req.files
    // console.log(multi_image.filename);

    console.log(image_name);
    var req =req.body;
    
    const new_data= new contact_data({
        user_name: req.user_name,
        email:req.email,    
        password:req.password,
        image:image_name,
    })

    
    const new_data_result = await new_data.save();
    
    res.render("index");

})


app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/",async(req,res)=>{
    try {
        
        const email = req.body.email
        const password = req.body.password
        
        //data base//
        const useremail= await contact_data.findOne({email});
        
        const passwordmatch = await bcrypt.compare(password , useremail.password);
        
        // const token = await useremail.tokens();
         const user_id= await res.cookie("user_id",useremail.email);
        
        if (passwordmatch) {
            res.render("dashbord")
        } else {
            res.send("Email OR  Password Dose Not Match");
        }


        
    } catch (error) {
        res.send("User Data Not Found");
    }
});



app.get("/dashbord",(req,res)=>{
    if (!req.cookies.user_id) {
        res.render("index");
    }
    res.render("dashbord");
});


app.get("/add_contact",(req,res)=>{
    if (!req.cookies.user_id) {
        res.render("index");
    }

    res.render("add_contact")
});

app.post("/add_contact",async(req,res) =>{
    
    try {
         
            console.log(req.cookies.user_id);
            user_id= req.cookies.user_id;

            const contact_data= new Contact({
            name:req.body.name,
            mo_no:req.body.mo_no,
            user_id:user_id,
        });
        
        const contact_data_result= await contact_data.save();
        res.redirect("view_contact");
        
    } catch (error) {
        res.send(error);
    }
    
})


app.get("/view_contact",async(req,res)=>{
    if (!req.cookies.user_id) {
        res.render("index");
    }
        const page_no = req.query.page_no;
        // console.log(page_no);
        const limi= 3;
        const user = await Contact.find({'user_id':req.cookies.user_id}).limit(limi).skip((page_no*limi)-limi);
        const user_count = await Contact.find({'user_id':req.cookies.user_id}).count();
        console.log(user_count);
        const total_page= Math.ceil(user_count/limi);
        // console.log(total_page);
        res.render("view_contact",{
        "user":user,
         total_page,

    });
    
})



app.get("/logout",async(req,res)=>{
    
    try {
        res.clearCookie("user_id");
        
        res.render("index")
    } catch (error) {
        console.log(error);
    }
    
});

app.get("/edit_contact", async(req,res)=>{
    if (!req.cookies.user_id) {
        res.render("index");
    }

    var uid= req.query.uid;
    // console.log(uid);
    const users= await Contact.findOne({_id:uid});

    // console.log(users);
    // console.log(update);
    res.render("edit_contact",{
        "users":users
})
});

app.post("/updatecontact" ,async(req,res)=>{
    if (!req.cookies.user_id) {
        res.render("index");
    }

    //edit_contact_page to get id//
    const _id= req.body.uid;
    console.log(_id);

    const update= await Contact.updateOne({_id},req.body);
    console.log(update);
    res.redirect("view_contact");
})




app.get("/delete_contact",async(req,res)=>{
    if (!req.cookies.user_id) {
        res.render("index");
    }

    var did= req.query.did;
    const delete_user= await Contact.deleteOne({_id:did});
    // console.log(delete_user);
    res.redirect("view_contact")

})














app.get("/*",(req,res)=>{
    res.send("404 Page Not Found");
})
app.listen(3000);
console.log(app.listen);