let access = require("./accesskey").get();
const {resolve} = require("path");
const WaveFile = require('wavefile').WaveFile;
var player = require('play-sound')(opts = { player: "play"});
const AudioRecorder = require('node-audiorecorder');
const fs = require("node:fs");
const {Rhino, getInt16Frames } = require("@picovoice/rhino-node");
const accessKey = access;

const recog = new Rhino(accessKey , resolve("MagicGPT_de_raspberry-pi_v3_0_0.rhn"),0.5,5.0, true,resolve("rhino_params_de.pv") );
const fileStream = fs.createWriteStream("output.wav", { encoding: 'binary' });

const options = {
    program: `arecord`, // Which program to use, either `arecord`, `rec`, or `sox`.
    device: "plughw:0,0", // Recording device to use, e.g. `hw:1,0`
  
    bits: 16, // Sample size. (only for `rec` and `sox`)
    channels: 1, // Channel count.
    encoding: `signed-integer`, // Encoding type. (only for `rec` and `sox`)
    format: `S16_LE`, // Encoding type. (only for `arecord`)
    rate: 16000, // Sample rate.
    type: `wav`, // Format type.
  
    // Following options only available when using `rec` or `sox`.
    silence: 2, // Duration of silence in seconds before it stops recording.
    thresholdStart: 0.5, // Silence threshold to start recording.
    thresholdStop: 0.5, // Silence threshold to stop recording.
    keepSilence: true, // Keep the silence in the recording.
  }

let recorder = new AudioRecorder(options,console);
// Log information on the following events.
recorder.on('error', function () {
    console.warn('Recording error.');
  });
  recorder.on('end', function () {
    console.warn('Recording ended.');
  });

  console.log("start");
recorder
 .start()
 .stream()
 .pipe(fileStream);


 setTimeout(() => {
  console.log("end");
    recorder.stop();
    process.stdin.pause();
    
    // $ mplayer foo.mp3 
  /*player.play('output.wav', { play: [ '-v', 40 ] },function(err){
    if (err) throw err
    })
*/

  let waveBuffer = fs.readFileSync('output.wav');
  let inputWaveFile;
  try {
    inputWaveFile = new WaveFile(waveBuffer);
  } catch (error) {
    console.error(`Exception trying to read file as wave format: `);
    console.error(error);
    return;
  }
  let frames = getInt16Frames(inputWaveFile, recog.frameLength);
  for (let frame of frames) {
    console.log(".");
    isFinalized = recog.process(frame);

    if (isFinalized) {
      let inference = recog.getInference();
      console.log(
        `Inference result of '' using context '':`
      );
      console.log(JSON.stringify(inference, null, 4));
      break;
    }
  }
  if (!isFinalized) {
    console.log(
      "Rhino did not receive enough frames of audio to reach an inference conclusion."
    );
  }

  recog.release();
    
  }, 5000);

  // Keep process alive.
process.stdin.resume();
console.warn('Press ctrl+c to exit or wait 5 seconds.');

