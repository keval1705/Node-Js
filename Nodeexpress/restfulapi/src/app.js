const express= require("express");

require("./conn")

const student=require("./student");

const app= express();

app.use(express.json());
// create new students 
app.post("/student" ,(req,res) =>{
    console.log(req.body);
    const user=new student(req.body)

// useing promis//
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


//create //
app.post("/student",async(req,res)=>{
    try {
        const user=new student(req.body);
    
        //using async//
    
        const result =await user.save();
        res.status(201).send(result);
        
    } catch (error) {
        res.status(400).send(error);
    }
})




//Read//

app.get("/student",async (req,res)=>{
    try {
       const std =await student.find();
       res.send(std);
    } catch (error) {
        res.send(error);
    }
})


// Update //

app.patch("/student/:id",async (req,res)=>{
    try {
        const _id =req.params.id;
        const update_std =await student.findByIdAndUpdate(_id, req.body);
        res.send(update_std);
    } catch (error) {
        res.status(400).send(error);
    }
})

// delete//

app.delete("/student/:id",async(req,res)=>{
    try {
        
        const _id=req.params.id;
        const delete_std = await student.findByIdAndDelete(_id,req.body);
        res.send(delete_std);
    } catch (error) {
        res.status(400).send(error);
    }
})
app.listen(3001);