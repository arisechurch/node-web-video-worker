
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./webm.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '1000k')
      .addOption('-vf', 'scale=-1:360')

    require('./webm.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '160k')
      .addOption('-f', 'webm')
  }
}
