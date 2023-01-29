const express= require(express);

const app= express();

const port= 4000


app.get('/home',(req,res)=>{

    res.send("welcome to first page");
})

app.listen(4000);
c