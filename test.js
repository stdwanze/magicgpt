var game = require("./playgame");


async function t(){
    let r = await game.startGame();
    console.log(r);
    
    r = await game.tick("ja");
    console.log(r);
    r= await game.tick("nein");
    console.log(r);
    r= await game.tick("nein");
    console.log(r);
    r= await game.tick("ja");
    console.log(r);
    r= await game.tick("ja");
    console.log(r);
        

}
t()
