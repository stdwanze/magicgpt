let access = require("./accesskey").get();
const {resolve} = require("path");
var player = require('play-sound')(opts = { player: "aplay"});
const { PvRecorder } = require("@picovoice/pvrecorder-node");
const fs = require("node:fs");
const {Rhino } = require("@picovoice/rhino-node");
const { genSpeak } = require("./speak");
var player = require('play-sound')(opts = { player: "aplay"});
var game = require("./playgame");
const accessKey = access.rhino;


async function playSound(text){

   return new Promise((resolve) => {
    console.log("gen: "+text);
    genSpeak(text).then(()=>{

      player.play('output.wav', { aplay: [ '-D', "plughw:1,0" ] }, function(err){
        if(err) console.log(err)
        console.log("finished");
        resolve();
      })
    });
  
   
   });
  
}


let isInterrupted = false;
async function micDemo() {

  const recog = new Rhino(accessKey , resolve("MagicGPT_de_raspberry-pi_v3_0_0.rhn"),0.5,0.5, true,resolve("rhino_params_de.pv") );
  const fileStream = fs.createWriteStream("output.wav", { encoding: 'binary' });

  const frameLength = recog.frameLength;
  await playSound("Willkommen beim Magic Gin");
  await game.startGame();

  const devices = PvRecorder.getAvailableDevices();
  for (let i = 0; i < devices.length; i++) {
      console.log(`index: ${i}, device name: ${devices[i]}`);
  }
  const recorder = new PvRecorder(frameLength, 1);
  recorder.start();

  console.log("Context info:");
  console.log("-------------");
  console.log(recog.getContextInfo());

  console.log(
    `Listening for speech within the context . Please speak your phrase into the microphone. `
  );
  console.log("Press ctrl+c to exit.")

  while (!isInterrupted) {
    const pcm = await recorder.read();
    const isFinalized = recog.process(pcm);
    if (isFinalized === true) {
      recorder.stop();
     
      
      let inference = recog.getInference();
      console.log("Inference result:");
      console.log(JSON.stringify(inference, null, 4));
      console.log();
      if(inference.isUnderstood){
        let response = await game.tick(inference.intent);
        await playSound(response);
      }
      else await playSound("wie bitte?");
      recorder.start();
    }
  }

  console.log("Stopping...");
  recorder.stop();
  recorder.release();

}
(async function () {
  try {
      await micDemo();
  } catch (e) {
      console.error(e.toString());
  }
})();


