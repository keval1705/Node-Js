const fs = require("fs");
const path = require("path");
const http=require("http");
const chalk=require("chalk");

const {sub ,sum ,multi} =require('./modual.js');
const { log } = require("console");
// fs.mkdirSync("keval");

// fs.writeFileSync("keval/read.text","welcome to earth");

// const data= fs.readFileSync("keavl/read.text");

// console.log(data);

// fs.renameSync("keval/rnead.text","keval/bio.text")

// fs.rmdirSync("keval");

// fs.writeFile("read.text" ,"Who are you ?",(err) =>{
    // console.log(111);

// })

// fs.unlink("keval/bio.text" ,(err)=>{
//     console.log(11);
// })

// fs.appendFile("read.text" ,"i am iron men",(err)=>{
    // console.log(11);    

// });

// fs.readFile("read.text","utf-8",(err,data)=>{
    // console.log(err);
    // console.log(data.toString());
// })

// fs.mkdir("abc",(err)=>{
// console.log(err);
// })

// fs.rmdir("abc",(err)=>{

// })

// fs.writeFile("keval/bio.js" ,"hiii",(err)=>{

// })

var pathDir= path.dirname("keval/bio.js");
var pathparse= path.parse("keval/bio.js");
// console.log(pathparse.ext,pathparse.name);


// fs.writeFileSync("modual.js","hii");

console.log(sub(20,10));

console.log(sum(20,10));

// console.log(multi(3492868982320789986239783789,9967827605025602583578));



var serverCreate = http.createServer(function (req,res) {
  
    var url= req.url;

    if (url =="/home") {
        res.end("welcome to earth");
     }
    else if(url=="/about"){
        res.end("<h1> welcome to mars</h1>");
    }
    else if(url=="/service"){
        res.end("<h1> avengers save the earth</h1>");
    }

});

serverCreate.listen(3000);
console.log('serveCreat');