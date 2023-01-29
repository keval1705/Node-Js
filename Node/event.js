const fs =require('fs');

var obj={
    name:"keno info",
    mo_no:9099039752,
    // name: 'keno info', mo_no: 9099039752 

}
// console.log(obj);

var json= JSON.stringify(obj);
// console.log(json);
// {"name":"keno info","mo_no":9099039752}

var convet  =JSON.parse(json)
// console.log(convet);
// { name: 'keno info', mo_no: 9099039752 }


// Event Modual create//

const eventmodual=require("events");

const event= new eventmodual;

event.on("demo",() => {
    console.log(111);
})

event .on("abc",() => {
    console.log('demo');
})


event.emit("demo")
event.emit("abc")