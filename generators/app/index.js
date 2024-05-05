'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require("path");

const expressJs = require("./generate-express-js");
const { fileURLToPath } = require('url');



const templateGenerators = [
  expressJs
  ];

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    // tooling description
  this.description = "Generates templates from CLI",
  // destination folder 
  this.argument('destination', { type: String, required: false, description: `
  \n    The folder to create the template in, absolute or relative to the current working directory.
  \n    Use '.' for the current folder. If not provided, defaults to a folder with the extension display name.\n
    ` });
    this.option("templateType", {alias: "t", type: String, description: "Type of template to choose from..."})
    this.option("templateName", {type: String, description: "Template display name."});
    this.option("description", {type: String, description: "Template description."});
    this.option("pkgManager", {type: String, description: "Template package manager"});

    this.templateConfig =  Object.create(null);
    this.templateConfig.installDependencies = false;
    this.abort = false;
}


 

async initializing () {
  this.log(yosay("Welcome to Bankai Template Generator"));
  this.log("");

  // make destination root
  const dest = this.options['destination'];

  if(dest) {
    const folderPath = path.resolve(this.destinationPath(), dest);
    this.destinationRoot(folderPath);
  }


}



async prompting () {

   const templateType = this.options['templateType'];
   if(templateType) {
    // const templateTypeId = 'tmpl-' + templateType;
    const templateGenerator = templateGenerators.find(g => g.aliases.indexOf(templateType) !== -1);
    if (templateGenerator) {
        this.templateConfig.type = templateGenerator.id;
    } else {
        this.log("Invalid template type: " + templateType + '\nPossible types are: ' + templateGenerators.map(g => g.aliases.join(', ')).join(', '));
        this.abort = true;
    }
   }

   else {

 
const choices = templateGenerators.map((g) => {
 return {
  name: g.name,
  value : g.id
 }
});
       

// select template
     this.prompt({
      type: "list",
      name: "type",
      message: "Which type of template you want to create? ",
      pageSize: choices.length, 
      choices
    }).then((ans) => {
     this.templateConfig.type = ans.type;
    });


   this.selectedGenerator =  templateGenerators.find((g) => g.id === this.templateConfig.type);


   try {
    // prompt input for selected generator
      await this.selectedGenerator?.prompting(this, this.templateConfig);
   }
   catch(e) {
    console.log(e);
    this.abort = true;
   }

   }
}


async writing() {
  if(this.abort) {
    return;
  }

  // get current working directory and add to generator env. variables
 this.env.cwd = this.destinationPath();

 this.log();
 this.log(`Writing in ${this.destinationPath()}...`);

  // set generator source root: this zanpakuto repo's url...
  this.sourceRoot(path.join(__dirname, "../templates/", this.templateConfig.type));

  await this.selectedGenerator?.writing(this, this.templateConfig)
}

 install () {
   if(this.abort) {
    this.env.options.skipInstall = true;
    return;
   }
   

   if(this.templateConfig.installDependencies) {
    this.env.options.nodePackageManager = this.templateConfig.pkgManager;
   }
   else {
    this.env.options.skipInstall = true;
    return;
   }
}

end() {
  this.log(yosay("Thank you for using Zanpakuto!"));
  this.log("");

}
};



