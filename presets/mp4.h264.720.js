
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./mp4.h264.video.js')(ffmpeg)

    ffmpeg
      .addOption('-b:v', '2000k')
      .addOption('-vf', 'scale=-1:720')

    require('./mp4.h264.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '160k')
      .addOption('-f', 'mp4')
  }
}
