const chat = require("./chat.js");
const access = require("./accesskey.js").get();

async function startGame(){

        chat.setup(access.openai);
        chat.newSession();
        let res = await chat.ask("ich will ein tier ratespiel spielen bei dem ich mir ein tier ausdenke und du es durch ja nein fragen errätst");
       // res = await chat.ask("ich habe mir ein tier ausgedacht");
        
        return res;    
    
 
}
async function tick(answer){

  //  chat.newSession();
    return await chat.ask(answer);


}


module.exports = {

    startGame,
    tick

}