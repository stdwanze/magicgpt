
let state = "initial";
let game = require("./playgame");

let rules = {

    Abbruch : { validStates: [/*all*/], state : "initial" },
    Tierspiel: { validStates: [ "initial"], state : "tierspiel:beginn" },
    Ja: { validStates: ["tierspiel:beginn","tierspiel:eingabe"], state: "tierspiel:eingabe" },
    Nein: { validStates: ["tierspiel:beginn","tierspiel:eingabe"], state: "tierspiel:eingabe" }

}

function setup(ai){
    game.setup(ai);
}

function tickState(intent){
    console.log("tick state machine");
    let target = rules[intent];
    console.log("intent found: "+JSON.stringify(target));
    if(target != null){

        if(!isValid(target,state)){
            return -2
        }
        apply(target);
        return state;
    }
    else {return -1 }

}
function isValid(rule,currstate){

    return rule.validStates.length == 0 || rule.validStates.includes(currstate)

}
function apply(target){

    state = target.state;

}
async function runIntent(state,intent){
    console.log("run intent: "+intent +" in state: "+state);
    let response = "";
    switch(state){
        case "tierspiel:eingabe": response = await game.tick(intent);break;
        case "initial": response = "Abbruch bestätigt. Was willst du spielen?" ;break;
        case "tierspiel:beginn": response = await game.startGame();

    } 
    return response;

}


module.exports = {

    runIntent,
    tickState,
    setup
}

