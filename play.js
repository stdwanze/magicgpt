var player = require('play-sound')(opts = { player: "play"})

// $ mplayer foo.mp3
player.play('output.wav', { play: [ '-v', 30 ] }, function(err){
  if (err) throw err
})