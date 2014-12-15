var spawn = require('child_process').spawn

module.exports = function (config) {
  var faststart = config.faststart || 'qtfaststart'

  return function fileOutput (job, ffmpeg, done) {
    ffmpeg
      .save(job.data.output.path)
      .on('progress', onProgress)
      .on('error', function(err) {
        done(err);
      })
      .on('end', function () {
        var child = spawn(
          faststart
        , [job.data.output.path]
        , { stdio : 'ignore' }
        )
        child.on('exit', function () {
          done()
        })
      })

    function onProgress (progress) {
      job.progress(Math.round(progress.percent), 100)
    }
  }
}
