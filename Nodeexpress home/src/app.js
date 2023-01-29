const express=require('express');
const path=require('path');
const hbs=require('hbs');
const app=express();

const templetpath=path.join(__dirname,"../templet/views");
const parseials=path.join(__dirname,"../templet/parse");

console.log(parseials);


app.set("view engine","hbs");
app.set("views",templetpath);
hbs.registerPartials(parseials);

app.get('/',(req,res)=>{
    res.render("index",{
        title:'home',
    })
})

app.get('/about',(req,res)=>{
    res.render("about")
})




app.listen(3001);