var espeak = require('espeak');
 
const fs = require("fs");
// optionally set the path to the `espeak` cli program if it's not in your PATH
//espeak.cmd = '/usr/bin/espeak';
 
function genSpeak(text){
  espeak.speak('richtig', ['-vde+f3'], function(err, wav) {
    if (err) return console.error(err);
    
    // get the raw binary wav data
    var buffer = wav.buffer;
    
    // get a base64-encoded data URI
    //var dataUri = wav.toDataUri();
  
    fs.writeFileSync("output.wav",buffer);
  });

}

module.exports = {
  genSpeak
}


