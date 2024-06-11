
const fs = require("node:fs")
const path = require("node:path")
let _openai = null;
const speechFile = path.resolve(__dirname, './output.wav');

function setup(openai){
    _openai = openai
}


function genSpeak(text){

    return new Promise(async (resolve) => {
    const mp3 = await _api.audio.speech.create({
        model: 'tts-1',
        voice: 'alloy',
        input: text,
        response_format: "wav"
      });
      const buffer = Buffer.from(await mp3.arrayBuffer());
      await fs.promises.writeFile(speechFile, buffer);
    
      resolve();
    
    });

}

/*
function run(){

    _api = new ai.OpenAI({ 
        apiKey: key 
      }); 

      setup(_api);
      testSpeech()

}

run();
*/
module.exports = {
    genSpeak,
    setup
}