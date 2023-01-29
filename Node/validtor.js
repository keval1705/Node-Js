const validator= require('validator');

const chalk=require('chalk');

var mail='keavalpansuriya@gmail.com';

var validate= validator.isEmail(mail);

// console.log(validate);

var grenn= chalk.green(validate);

console.log(grenn);