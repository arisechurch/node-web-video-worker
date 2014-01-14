
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./h264.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '5000k')
      .addOption('-vf', 'scale=-1:1080')

    require('./h264.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '192k')
      .addOption('-f', 'mp4')
  }
}
