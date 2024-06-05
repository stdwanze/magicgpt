const chat = require("./chat.js");
const access = require("./accesskey.js").get();

function startGame(){

    return new Promise((resolve)=>{
        chat.setup(access.openai);
        chat.newSession();
        chat.ask("ich will tiere raten spielen").then(res => {
            console.log(res);
            chat.ask("ich habe mir ein tier ausgedacht").then(res => resolve(res));
        });
        
    });
 
}
function tick(answer){

    return new Promise((resolve)=>{
        chat.ask(answer).then(res => resolve(res));

    })


}


module.exports = {

    startGame,
    tick

}