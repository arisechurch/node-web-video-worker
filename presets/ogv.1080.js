
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./ogv.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '7000k')
      .addOption('-vf', 'scale=-1:1080')

    require('./ogv.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '192k')
  }
}
