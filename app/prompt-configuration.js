
import { idToTypeMap } from "./utils";
import { ConfirmPrompt, ListPrompt, InputPrompt } from "./prompt";


/**
 * Initial Prompt Types
 * @enum {string}
 */
const InitialPromptType = {
TEMPLATE: "template",
UTILITY: "utility"
}

class PromptConfig {
   
    /**
     * 
     * @param {InitialPromptType} type 
     * @param {string} name 
     * @param {string} id 
     * @param {(ConfirmPrompt | ListPrompt | InputPrompt)[]} [prompts=[]] 
     */
    constructor (type,id, name, prompts = []) {
        this.type = type;
        this.name = name;
        this.id = id;
        this.prompts = prompts;
    }

    addNewPrompt(prompt){
        this.prompts.push(prompt);
    }

    getAllPrompts () {
return this.prompts;
    }
}


