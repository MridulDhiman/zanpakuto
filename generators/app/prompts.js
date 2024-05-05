



const path = require('path');
const Generator = require("yeoman-generator")
/**
 * @param {Generator} generator 
 * @param {Object} templateConfig 
 */

  function askForTemplateName(generator, templateConfig) {

    //@ts-ignore
    const templateName = generator.options['templateName'];

    if(templateName) {
        templateConfig.displayName = templateName;
        return Promise.resolve();
    }


    const nameFromFolder = generator.options['destination'] ? path.basename(generator.destinationPath()) : '';

    if (nameFromFolder) {
        templateConfig.displayName = nameFromFolder;
        return Promise.resolve();
    }

    return generator.prompt({
        type: "input",
        name: "templateName",
        message : "What's the name of your template? ",
        default: nameFromFolder
    }).then((ans) => {
           templateConfig.displayName = ans.templateName
    });



}

  function askForDescription(generator, templateConfig) {

    const templateName = generator.options['description'];

    if(templateName) {
        templateConfig.displayName = templateName;
        return Promise.resolve();
    }



    return generator.prompt({
        type: "input",
        name: "description",
        message : "What's the description of your template? ",
        default: ''
    }).then((ans) => {
           templateConfig.description = ans.description
    });
}

  function askForPkgManager(generator, templateConfig) {

    const pkgManager = generator.options['pkgManager'];

    if(pkgManager) {
        templateConfig.pkgManager = pkgManager;
        return Promise.resolve();
    }



    return generator.prompt({
        type: "list",
        name: "pkgManager",
        message : "What's the package manager of your template? ",
        choices: [
            {
                name: "npm",
                value: "npm"
            }, 
            {
                name: "yarn",
                value: "yarn"
            },
            {
                name: "pnpm",
                value: "pnpm"
            }
        ]
    }).then((ans) => {
           templateConfig.pkgManager = ans.pkgManager
    });
}

module.exports  = {
    askForDescription,
    askForPkgManager,
    askForTemplateName
}