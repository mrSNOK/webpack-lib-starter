import _ from "lodash";
export default class Greeter{
    constructor(phrase){
        this.phrase = phrase
    }
    greet(){
        console.log(`${_.camelCase(this.phrase)} camelCased from greeter!`);
    }
}