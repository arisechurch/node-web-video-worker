
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./ogv.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '1500k')
      .addOption('-vf', 'scale=-1:360')

    require('./ogv.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '160k')
  }
}
