import { idToTypeMap } from "./utils";

export class Choice  {
    /**
     * 
     * @param {string} name 
     * @param {string} value 
     */
    constructor (name , value) {
     this.name = name;
     this.value = value;
    }

    getName = () => this.name;
    getValue = () => this.value; 
}


/*
 {
            name: "template: Built-in templates in new/current directory.",
            value: "template",
          },
          {
            name: "utility: Built-in utilities in current directory.",
            value: "utility",
          },
*/
export const globalChoices = [
    new Choice("template: Built-in templates in new/current directory.", "template"),
    new Choice("utility: Built-in utilities in current directory.", "utility")
];

export const templateChoices = [
    new Choice(idToTypeMap[1.1],1.1),
    new Choice(idToTypeMap[1.2], 1.2)
];

export const utilityChoices = [
    new Choice(idToTypeMap[2.1], 2.1),
    new Choice(idToTypeMap[2.2], 2.2)
]