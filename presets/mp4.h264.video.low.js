
module.exports = function (ffmpeg) {
  ffmpeg
    .addOption('-codec:v', 'libx264')
    .addOption('-preset', 'slow')
    .addOption('-pix_fmt', 'yuv420p')
    .addOption('-r:v', '27')
    .addOption('-vsync', 'vfr')
    .addOption('-crf', '30')
}
