

import { ConfirmPrompt, ListPrompt, InputPrompt } from "./prompt";
import Generator from "yeoman-generator";
import { idToTypeMap } from "./utils";
import { globalChoices, templateChoices, utilityChoices } from "./choice";

/**
 * Initial Prompt Types
 * @enum {string}
 */
const InitialPromptType = {
TEMPLATE: "template",
UTILITY: "utility",
GLOBAL: "global"
}

export class PromptConfig {
   
    /**
     * 
     * @param {InitialPromptType} type 
     * @param {string} name 
     * @param {string} id 
     * @param {(ConfirmPrompt | ListPrompt | InputPrompt)[]} prompts
     * @param {PromptConfig[]} subConfigs
     */
    constructor (type,id, name, prompts = [], subConfigs = []) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.prompts = prompts;
        this.answers = {};
        this.subConfigs = subConfigs;
        /**
         * @type {Generator} generator
         */
        this.generator;
    }

    addNewPrompt(prompt){
        this.prompts.push(prompt);
    }

    getAllPrompts () {
return this.prompts;
    }
   async eval () {
       for(let prompt of this.prompts) {

        if(InitialPromptType.includes(this.type)){
            try {
                this.subConfigs.forEach(async (config) => {
                    await config.eval()
                })
            } catch (error) {
                this.generator.log("Error in evaluating config", error)
            }
        }
        else {
            if(prompt.type === "confirm") {
            

                prompt.evalPrompt().then(async (flag) => {
                  this.answers = {
                      ...this.answers,
                      [prompt.name] : flag
                  }
                          if(flag && prompt.subPrompts.length > 0) {
                              try {
                                let subPromptAnswers =   await prompt.batchEval();  
                                let prevAnswers = this.answers;
                                this.answers = {
                                  ...prevAnswers,
                                  ...subPromptAnswers
                                }   
                              } catch (error) {
                                  this.generator.log("Error in prompting user", error);
                              }
                          }
                      });
               }
               else {
                  try {
                     const newAnswer =  await prompt.evalPrompt();
                     let prevAnswers = this.answers;
                     this.answers = {
                      ...prevAnswers,
                       ...newAnswer
                     }
                  } catch (error) {
                     this.generator.log("Error in prompting user", error);
                  }
               }
        }
       
       }
    }


    getAnswers () {
        return this.answers;
    }

}



export const expressUtilityConfig = new PromptConfig("utility", 2.2, idToTypeMap[2.2], [
    new ConfirmPrompt("Do you want to use TypeScript? ", "useTs",
        [
          new InputPrompt("Specify outDir for tsconfig.json", "outDirFolder", "./dist"),
          new InputPrompt("Specify srcDir for tsconfig.json", "srcDirFolder", "./src")
        ]),
    new ConfirmPrompt("Do you want to use import/export?", "useESM")
]);

export const nextjsUtilityConfig = new PromptConfig("utility", 2.1, idToTypeMap[2.1], [
     new ConfirmPrompt("Do you want to use TypeScript? ", "hasTs"), 
     new ConfirmPrompt("Do you want to use /src directory? ", "hasSrcDirectory")
]);


const templatePrompts = [
    new ConfirmPrompt("Do you want to use current directory as destination path?", "useDefaultRoot", [
        new InputPrompt("Enter Directory Name: ", "rootDirName")
    ])
   ];


export const expressHelloWorldConfig = new PromptConfig(InitialPromptType.TEMPLATE, 1.1, idToTypeMap[1.1], templatePrompts);
export const expressMongooseBoilerplateConfig = new PromptConfig(InitialPromptType.TEMPLATE, 1.2, idToTypeMap[1.2], templatePrompts);


const templateConfig = new PromptConfig(InitialPromptType.TEMPLATE, 1, InitialPromptType.TEMPLATE, [
   new ListPrompt("What type of template you want to generate for yourself: ", "type", templateChoices)
], [expressHelloWorldConfig, expressMongooseBoilerplateConfig]);


const utilityConfig = new PromptConfig(InitialPromptType.UTILITY, 1, InitialPromptType.UTILITY, [
    new ListPrompt("What type of utility you want for yourself: ", "type", utilityChoices)
 ], [nextjsUtilityConfig, expressUtilityConfig]);

export const globalPromptConfig = new PromptConfig(InitialPromptType.GLOBAL, 0, InitialPromptType.GLOBAL, [
new ListPrompt("Choose from below options: ", "promptType", globalChoices)
],  [templateConfig, utilityConfig]);