
module.exports = function (ffmpeg) {
  ffmpeg
    .addOption('-codec:a', 'libvorbis')
    .addOption('-ac:a', 2)
}
