var spawn = require('child_process').spawn
var mfile = require('./file.js');

module.exports = function(config) {
  var faststart = config.faststart || 'qtfaststart'
  var file = mfile(config);

  return function fileOutput (job, ffmpeg, done) {
    file(job, ffmpeg, doneFile);

    function doneFile() {
      var child = spawn(
        faststart,
        [job.data.output.path],
        {stdio: 'ignore'}
      );
      child.on('exit', function () {
        done();
      });
    }
  }
}
