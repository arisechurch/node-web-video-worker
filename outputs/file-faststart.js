var spawn = require('child_process').spawn

module.exports = function (config) {
  var faststart = config.faststart || 'qtfaststart'

  return function fileOutput (job, ffmpeg, done) {
    ffmpeg
      .onProgress(onProgress)
      .saveToFile(job.data.output.path, function (out, err) {
        if (err) return done(new Error(err))

        job.progress(100, 100)

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
