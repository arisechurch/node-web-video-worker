
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./webm.video.low.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '1000k')
      .addOption('-vf', 'scale=-1:720')

    require('./webm.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '128k')
      .addOption('-f', 'webm')
  }
}
