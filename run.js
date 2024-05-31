var player = require('play-sound')(opts = {});
const AudioRecorder = require('node-audiorecorder');
const fs = require("node:fs");

const fileStream = fs.createWriteStream("output.wav", { encoding: 'binary' });

const options = {
    program: `arecord`, // Which program to use, either `arecord`, `rec`, or `sox`.
    device: "plughw:1,0", // Recording device to use, e.g. `hw:1,0`
  
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

recorder
 .start()
 .stream()
 .pipe(fileStream);


 setTimeout(() => {
    recorder.stop();
    process.stdin.pause();
  }, 5000);

  // Keep process alive.
process.stdin.resume();
console.warn('Press ctrl+c to exit or wait 5 seconds.');

// $ mplayer foo.mp3 
player.play('output.wav', { play: ['-v', 30 ] /* lower volume for afplay on OSX */ },function(err){
  if (err) throw err
})