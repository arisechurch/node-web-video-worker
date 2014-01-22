
module.exports = function (ffmpeg) {
  ffmpeg
    .addOption('-codec:v', 'libvpx')
    .addOption('-quality', 'good')
    .addOption('-cpu-used', '0')
    .addOption('-qmin', '0')
    .addOption('-qmax', '40')
    .addOption('-pix_fmt', 'yuv420p')
    .addOption('-r:v', '30')
    .addOption('-vsync', 'vfr')
    .addOption('-crf', '5')
}
