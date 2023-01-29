const fs=require('fs');
const http =require('http');

var serverCreat= http.createServer(function (req,res){

    var rederstrem=fs.createReadStream('validtor.js');

    rederstrem.pipe(res);
})

serverCreat.listen(3000);
console.log(11);


var serverCreat = http.createServer(function (res,res){
    var a=fs.createReadStream('strem.js');
    a.pipe(res);
})
serverCreat.listen(9999)

var newserver=http.createServer(function (req, res){
    var data=fs.createReadStream('strem.js');
    data.pipe(res);
})

newserver.listen(8888)