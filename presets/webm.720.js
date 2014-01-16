
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./webm.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '2000k')
      .addOption('-vf', 'scale=-1:720')

    require('./webm.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '160k')
      .addOption('-f', 'webm')
  }
}
