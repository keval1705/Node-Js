const express= require('express');
const app= express();
const path=require('path');
const hbs=require('hbs');

const templetpath=path.join(__dirname,"../templet/views")
const partials=path.join(__dirname,"../templet/partials")
console.log(partials);
console.log(templetpath);

app.set("view engine","hbs");
app.set("views",templetpath);
hbs.registerPartials(partials);



// app.get('/',(req,res)=>{
//     res.send("<h1> welcome to home</h1>")
// })

// app.get('/about',(req,res)=>{
//     res.send("<h2> Welcome to about page </h2>")
// })

// app.get('/service',(req,res)=>{
//     res.send("<h3> welcome to service page </h3>")
// })

// app.get('*' , (req,res)=>{
//     res.send("<h1>404 page not found</h1>")
// })


app.get("/",(req,res)=>{
    res.render("index",{
        title:"home"
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:'about'
    })
})

app.get('/service',(req,res)=>{
    res.render("service",{
        title:'service'
    })
})

app.get('/*',(req,res)=>{
    res.render("error",{
        title:'error'
    })
})
app.listen(3000);