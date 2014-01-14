
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./h264.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '2000k')
      .addOption('-s:v', '1280x720')

    require('./h264.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '160k')
      .addOption('-f', 'mp4')
  }
}
