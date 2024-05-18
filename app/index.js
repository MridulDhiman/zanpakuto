'use strict';
const  Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    // cli description
  this.description = "Generates templates from CLI",

  // --hello string flag...
    this.option("hello", {alias: "h", type: String, description: "arigatou zanpakuto"})
}



default () {
  this.log("Hello from zanpakuto");
}
prompting () {

 //message hai jo bhi, add to result...

 
 
  this.prompt({
    type: "input",
    name: "hello",
    "message": "Enter message: ",
    default: "hello from jon snow",
 }).then((ans) => {
    this.log("Message: ", ans.hello)
  })
}

};



