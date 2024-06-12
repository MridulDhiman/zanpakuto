import Generator from "yeoman-generator";

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
   */
  constructor(type, message, promptName, generator) {
    if (!PromptType[type]) {
      console.log("Possible Type Options are: ", PromptType);
      console.log("But you provided: ", type);
      return;
    }
    this.type = type;
    this.message = message;
    this.name = promptName;
      this.generator = generator;
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
  constructor(message, promptName, choices) {
    // calls the constructor of parent class
    super("list", message, promptName);
    this.choices = choices;
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
       this.promptAnswer = ans[this.name];
    });

    return this.promptAnswer;
   }



}

export class InputPrompt extends Prompt {
  constructor(message, promptName, defaultValue = null) {
    super("input", message, promptName);
    this.defaultName = defaultName;
  }

  getDefaultName = () => this.defaultName;
  setDefaultName = (defaultName) => {
    this.defaultName = defaultName;
  };
}

export class ConfirmPrompt extends Prompt {
    constructor(message, promptName) {
      super("confirm", message, promptName);
      this.defaultName = defaultName;
      
    }

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


