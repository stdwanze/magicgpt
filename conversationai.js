
let state = "initial";
let game = require("./playgame");

let rules = {

    Abbruch : { validStates: [/*all*/], state : "initial" },
    Tierspiel: { validStates: [ "initial"], state : "tierspiel:beginn" },
    Ja: { validStates: ["tierspiel","tierspiel:eingabe"], state: "tierspiel:eingabe" },
    Nein: { validStates: ["tierspiel","tierspiel:eingabe"], state: "tierspiel:eingabe" }

}

function tickState(intent){

    let target = rules[intent];
    if(target != null){

        if(!isValid(target,state)){
            return -2
        }
        apply(target);
        return intent;
    }
    else {return -1 }

}
function apply(target){

    state = target.state;

}
async function runIntent(state,intent){

    let response = "";
    switch(state){
        case "tierspiel:eingabe": response = await game.tick(intent);break;
        case "initial": response = "Abbruch bestätigt" ;break;
        case "tierspiel:beginn": let response = game.startGame();

    } 
    return response;

}


module.exports = {

    runIntent,
    tickState
}

