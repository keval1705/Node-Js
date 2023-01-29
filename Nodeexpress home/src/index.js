
const express = require("express");


const path=require('path');

const app= express();
// console.log(app);

// API 
// get-read
// post-create
// put-update
// delete-delete


// reletive absolute//
console.log(path.join(__dirname,"../public"));

const staticpath= path.join(__dirname,"../public");

//link to html file//
app.use(express.static(staticpath ));

app.get('/' ,(req,res)=>{

    res.send("welcome to earth avengers");
})

app.get('/about',(req,res)=>{
    res.send("i am iron man");
})

app.get('/service',(req,res) =>{
    res.send("service");
})

app.listen(3001);
console.log(111);



