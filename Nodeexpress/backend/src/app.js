const { urlencoded } = require("express");
const express=require("express");

const hbs= require("hbs");

const path= require("path");

require("./conn");

const usercreate= require("./model");

const app = express();

// app.use(express.json());
app.use(express.urlencoded({extended:false}));

const templet=path.join(__dirname,"../templet/views");
// console.log(templet);

app.set("view engine","hbs");
app.set("views",templet);



app.get("/",(req,res)=>{
    res.render("index");
});

app.post("/",async(req,res)=>{

    try {
        
        var req= req.body;

        // console.log(req.body.firstname);
        // req.send(req.body.firstname);
        const newregister=new usercreate({
            firstname:req.firstname,
            lastname:req.lastname,
            email:req.email,
            mo_no:req.mo_no,

        })
        const register_result= await newregister.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(3000);