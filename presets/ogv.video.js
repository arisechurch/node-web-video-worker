
module.exports = function (ffmpeg) {
  ffmpeg
    .addOption('-codec:v', 'libtheora')
    .addOption('-pix_fmt', 'yuv420p')
    .addOption('-r:v', '30')
    .addOption('-vsync', 'vfr')
}
