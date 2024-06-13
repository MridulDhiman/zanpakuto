import Generator from "yeoman-generator";
import { Choice } from "./choice.js";

/**
 * Prompt Type enum
 * @enum {string}
 */
export const PromptType = {
  INPUT: "input",
  CONFIRM: "confirm",
  LIST: "list",
};

// Parent Class

export class Prompt {
  /**
   * Create New Prompt Instance by calling constructor
   * @param {PromptType} type
   * @param {string} message
   * @param {string} promptName
   *  @param {Generator} generator
   *  @param {(ListPrompt | ConfirmPrompt | InputPrompt)[]} subPrompts
   */
  constructor(type, message, promptName, subPrompts = []) {
    if (!PromptType[type]) {
      console.log("Possible Type Options are: ", PromptType);
      console.log("But you provided: ", type);
      return;
    }
    this.type = type;
    this.message = message;
    this.name = promptName;
    /**
     * @type {Generator} generator
     */
      this.generator;
      this.subPrompts= subPrompts;
  }

  async evalPrompt () {
    await this.generator.prompt({
       type: this.type,
       name: this.name,
       message: this.message,
       choices: this.choices
    }).then((ans)=> {
       this.promptAnswer = ans;
    });

    return this.promptAnswer;
   }

   async batchEval () {
    await this.generator.prompt(this.subPrompts).then((ans)=> {
      this.subPromptAnswers = ans;
   });

   return this.subPromptAnswers;
   }

  getPromptName() {
    return this.name;
  }

  getPromptType() {
    return this.type;
  }

  getPromptMessage() {
    return this.message;
  }
}

// Child Class
export class ListPrompt extends Prompt {
  /**
   * 
   * @param {string} type 
   * @param {string} message 
   * @param {string} promptName 
   * @param {Choice[]} choices 
   */
  constructor(message, promptName, choices) {
    // calls the constructor of parent class
    super(message, promptName);
    this.choices = choices;
    this.configs = configs;
  }

  getChoices = () => this.choices;
  setChoices = (choices) => {
    this.choices = choices;
  };

  async evalPrompt () {
    await this.generator.prompt({
       type: this.type,
       name: this.name,
       message: this.message,
       choices: this.choices
    }).then((ans)=> {
       this.promptAnswer = ans;
    });

    return this.promptAnswer;
   }


}

export class InputPrompt extends Prompt {
  /**
   * Create new InputPrompt Instance
   * @param {string} message 
   * @param {string} promptName 
   * @param {string | undefined} defaultValue 
   * @param {(ListPrompt | InputPrompt | ConfirmPrompt)[]} subPrompts
   */
  constructor(message, promptName, defaultValue = "", subPrompts = []) {
    super("input", message, promptName, subPrompts);
    this.defaultName = defaultName;
  }

  getDefaultName = () => this.defaultName;
  setDefaultName = (defaultName) => {
    this.defaultName = defaultName;
  };
}

export class ConfirmPrompt extends Prompt {
  /**
   * Create New ConfirmPrompt Instance
   * @param {string} message 
   * @param {string} promptName 
   * @param {(ConfirmPrompt | ListPrompt | InputPrompt)[]} subPrompts 
   */
    constructor(message, promptName, subPrompts = []) {
      super(message, promptName, subPrompts);
      this.defaultName = defaultName;
    }

    /**
     * Creates new confirm prompt and returns the boolean result
     * @returns boolean
     */
    async evalPrompt () {
     await this.generator.prompt({
        type: this.type,
        name: this.name,
        message: this.message
     }).then((ans)=> {
        this.promptAnswer = ans[this.name];
     });

     return this.promptAnswer;
    }
  }


