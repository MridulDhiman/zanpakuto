'use strict';
import  Generator from 'yeoman-generator';
import path from "path";

import { fileURLToPath } from 'url';
import {kebabCase} from 'lodash-es'
import { exec } from 'child_process';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    this.options = opts;
  this.description = "Generates templates from CLI"
  this.env.options.nodePackageManager = "npm"
}


async prompting () {

 //message hai jo bhi, add to result...
 
 await this.prompt(
    [ {
    type: "input",
    name: "name",
    "message": "Enter Directory name: ",
    default: "zanpakuto",
 }, {
  type: "confirm",
  name:"confirm",
  message: "Do you want to use current directory as destination path: ",
 }]).then((answers) => {
  this.options.dirname = kebabCase(answers.name);
  this.options.confirm = answers.confirm;
});
}

writing() {

if(this.options.confirm === false)
   {
    this.destinationRoot(this.options.dirname);
    this.appname = this.options.dirname;
   } 

        this.log();
        this.log(`Writing in ${this.destinationPath()}...`);
this.sourceRoot(path.join(__dirname, "templates", "express-hello-world"));
this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
this.fs.copy(this.templatePath("package.json"), this.destinationPath("package.json"));


}

async install () {
  this.log.info("Installing npm packages...")
await exec(`cd ${this.destinationPath()} && npm install`)
}

end() {
  this.log("npm packages has been installed");
  this.log("Template has been generated successfully...")
}
};





