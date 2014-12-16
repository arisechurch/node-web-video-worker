
module.exports = function (options) {
  return function (job, ffmpeg) {
    require('./mp4.h264.video.js')(ffmpeg)

    ffmpeg
      .addOption('-profile:v', 'high')
      .addOption('-vf', 'scale=-1:1080')

    require('./mp4.h264.audio.js')(ffmpeg)

    ffmpeg
      .addOption('-b:a', '192k')
      .addOption('-f', 'mp4')
  }
}
