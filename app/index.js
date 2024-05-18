'use strict';
import  Generator from 'yeoman-generator';
import path from "path";

import { fileURLToPath } from 'url';
import {kebabCase} from 'lodash-es'
import { exec } from 'child_process';
import { globSync } from 'glob';


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
 },

 {
  type: "list",
  name: "type", 
  message: "What type of template you want to generate for yourself: ",
  choices: [
    {
      name: "express-hello-world",
      value: "express-hello-world"
    },
    {
      name: "express-mongoose-boilerplate",
      value: "express-mongoose-boilerplate"
    }
  ]
 }
]).then((answers) => {
  this.options.dirname = kebabCase(answers.name);
  this.options.confirm = answers.confirm;
  this.options.type = answers.type;
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
this.sourceRoot(path.join(__dirname, "templates", this.options.type));


globSync("**", {
  cwd: this.sourceRoot()
}).map((file) =>
  this.fs.copy(this.templatePath(file), this.destinationPath(file))
);

}

 install () {
  this.log.info("Installing npm packages...")
//  exec(`cd ${this.destinationPath()} && npm install`)
this.spawnCommandSync("cd", [this.destinationPath()]);
this.spawnCommandSync("npm", ['install']);
}

end() {
  this.log("npm packages has been installed");
  this.log("Template has been generated successfully...")
}
};






