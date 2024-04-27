

import Generator from "yeoman-generator";
import * as prompts from "./prompts"



export default {
    id: 'tmpl-express-js',
    aliases: ['tmpl-express-js', 'express-js'],
    name: 'New Express (JavaScript)',

    /**
     * @param {Generator} generator 
     * @param {Object} templateConfig 
     */
    prompting: async (generator, templateConfig) => {
        
        await prompts.askForTemplateName(generator, templateConfig);
        await prompts.askForDescription(generator, templateConfig);
        await prompts.askForPkgManager(generator, templateConfig);
    },


    /**
     * @param {Generator} generator 
     * @param {Object} templateConfig 
     */
    writing: async (generator, templateConfig) => {
        generator.fs.copy(generator.templatePath('index.js'), generator.destinationPath('index.js'));
        generator.fs.copy(generator.templatePath('package.json'), generator.destinationPath('package.json'));
        templateConfig.installDependencies = true;
    }
}