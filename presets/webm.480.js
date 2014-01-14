
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./h264.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '1000k')
      .addOption('-s:v', '640x360')

    require('./h264.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '128k')
      .addOption('-f', 'mp4')
  }
}
