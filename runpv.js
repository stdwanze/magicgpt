let access = require("./accesskey").get();
const {resolve} = require("path");
var player = require('play-sound')(opts = { player: "play"});
const { PvRecorder } = require("@picovoice/pvrecorder-node");
const fs = require("node:fs");
const {Rhino } = require("@picovoice/rhino-node");
const accessKey = access;

const recog = new Rhino(accessKey , resolve("MagicGPT_de_raspberry-pi_v3_0_0.rhn"),0.5,5.0, true,resolve("rhino_params_de.pv") );
const fileStream = fs.createWriteStream("output.wav", { encoding: 'binary' });

const frameLength = recog.frameLength;

const recorder = new PvRecorder(frameLength, audioDeviceIndex);
recorder.start();

console.log("Context info:");
console.log("-------------");
console.log(handle.getContextInfo());

console.log(
  `Listening for speech within the context of '${contextName}'. Please speak your phrase into the microphone. `
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
  }
}

console.log("Stopping...");
recorder.stop();
recorder.release();


