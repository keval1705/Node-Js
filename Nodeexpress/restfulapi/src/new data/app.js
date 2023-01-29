const express=require("express");

require("./conn");

const mens= require("./mens");

const app = express();

app.use(express.json());



app.post("/mens",async (req,res)=>{
    try {
        
        const insert= new mens(req.body)
        console.log(req.body);
        
        const insertdata= await insert.save();
        res.status(201).send(insertdata);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(3002);
