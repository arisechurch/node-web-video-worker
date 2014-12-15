var Ffmpeg = require('fluent-ffmpeg')

module.exports = function fileInput (config) {
  return function (job, done) {
    var ffmpeg  = new Ffmpeg(job.data.input.path, {timeout: 0});
    done(null, ffmpeg)
  }
}
