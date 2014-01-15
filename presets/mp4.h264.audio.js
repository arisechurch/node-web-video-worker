
module.exports = function (ffmpeg) {
  ffmpeg
    .addOption('-codec:a', 'libfdk_aac')
    .addOption('-ac:a', 2)
}
