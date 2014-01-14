module.exports = function (config) {
  return function fileOutput (job, ffmpeg, done) {
    ffmpeg
      .onProgress(onProgress)
      .saveToFile(job.data.output.path, function (out, err) {
        if (err) return done(new Error(err))

        job.progress(100, 100)
        done()
      })

    function onProgress (progress) {
      job.progress(progress.percent, 100)
    }
  }
}
