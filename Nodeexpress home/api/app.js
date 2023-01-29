const express = require("express");
require("./conn.js");
const Api_save= require("./db/Schema");
const app = express();
app.use(express.json());

// app.get("/",async(req,res)=>{
//     res.send("welcome")
// });

app.post("/",async(req,res)=>{
    try {
        
        console.log(req.body);
        const create_data= new Api_save(req.body);
        const create_data_result= await create_data.save();
        // res.status(200).send(create_data_result);

    } catch (error) {
        // res.status(400).send(error);
    }
    });

app.get("/Get_data",async(req,res)=>{
    const get_data= await Api_save.find();
    res.send(get_data);
});

app.patch("/update/:id",async(req,res)=>{

    const _id= req.params.id;
    const updata_data=await Api_save.findByIdAndUpdate(_id,req.body);

    res.send(updata_data)

});

app.delete("/delete/:id",async(req,res)=>{
    
    const delete_data= await Api_save.findByIdAndDelete(req.params.id);
    res.send(delete_data);
})




app.listen(3000)
