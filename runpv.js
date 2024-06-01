let access = require("./accesskey").get();
const {resolve} = require("path");
var player = require('play-sound')(opts = { player: "play"});
const { PvRecorder } = require("@picovoice/pvrecorder-node");
const fs = require("node:fs");
const {Rhino } = require("@picovoice/rhino-node");
const { getSpeak } = require("./speak");
var player = require('play-sound')(opts = { player: "aplay"});
const accessKey = access;


function playSound(text){

  genSpeak(text);

  player.play('output.wav', { afplay: [ '-D', "plughw:1,0" ] }, function(err){
    if (err) throw err
  })

}


let isInterrupted = false;
async function micDemo() {

  const recog = new Rhino(accessKey , resolve("MagicGPT_de_raspberry-pi_v3_0_0.rhn"),0.5,5.0, true,resolve("rhino_params_de.pv") );
  const fileStream = fs.createWriteStream("output.wav", { encoding: 'binary' });

  const frameLength = recog.frameLength;


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
      let inference = recog.getInference();
      console.log("Inference result:");
      console.log(JSON.stringify(inference, null, 4));
      console.log();
      playSound(inference.intent != null ? inference.intent : "nichts verstanden");
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


