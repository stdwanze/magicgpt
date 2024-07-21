const chat = require("./chat.js");
const access = require("./accesskey.js").get();


function setup(ai){
  chat.setup(ai)
}

async function startGame(gametype){

        chat.newSession();

        if(gametype == "quiz"){
          let res = await chat.ask("ich will ein quiz spielen wie bei wer wird millionär aber ohne joker");
        }

        else {
        let res = await chat.ask("ich will ein tier ratespiel spielen bei dem ich mir ein tier ausdenke und du es durch ja nein fragen errätst");
        }
        return res;    
    
 
}
async function tick(answer){

  //  chat.newSession();
    return await chat.ask(answer);


}


module.exports = {

    startGame,
    tick,
    setup

}