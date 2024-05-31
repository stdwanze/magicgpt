var player = require('play-sound')(opts = {})

// $ mplayer foo.mp3
player.play('output.wav', function(err){
  if (err) throw err
})