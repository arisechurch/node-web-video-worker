module.exports = function (config) {
  return function fileOutput (job, ffmpeg, done) {
    ffmpeg
      .save(job.data.output.path)
      .on('progress', onProgress)
      .on('error', function(err) {
        done(err);
      })
      .on('end', function (stdout, stderr, err) {
        job.progress(100, 100)
        done()
      })

    job.on('failed', function() {
      ffmpeg.kill();
    });

    function onProgress (progress) {
      job.progress(Math.round(progress.percent), 100);
    }
  }
}
