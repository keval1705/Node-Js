const express= require("express");
const path= require("path");
const hbs= require("hbs");
require("./connect");
const Student_data = require("./db/student_schema");
const app = express();



const public= path.join(__dirname,"../public");
console.log(public);
const templet = path.join(__dirname,"../public/views");

app.use(express.static(public));


app.set("view engine","hbs");
app.set("views", templet);

app.get("/",async(req,res)=>{
    res.render("index")
})

app.post("/",async(req,res)=>{
    try {
        
        
        // var req= req.body;
        
        const Student_data_Insert= new Student_data({
            first_name:req.body.first_name,
        })
        const Student_data_Insert_result= await Student_data_Insert.save();

        res.render("index")
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000)