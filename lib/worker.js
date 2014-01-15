var kue   = require('kue')
var redis = require('redis')
var os    = require('os')

/**
 * Wrapper around kue for processing videos
 *
 * @constructor
 * @param Object options
 */
function WebVideoWorker (options) {
  var worker = this

  options              || (options = {})
  options.redisPort    || (options.redisPort = 6379)
  options.redisHost    || (options.redisHost = '127.0.0.1')
  options.queue        || (options.queue = 'web-video')
  options.workers      || (options.workers = WebVideoWorker.CPUS)
  options.log          || (options.log = console.error)
  worker.options       = options

  // Alias for worker.options.log
  worker.log           = options.log

  worker.inputs        =
    { file             : require('../inputs/file.js')(worker.options)
    }
  worker.outputs       =
    { file             : require('../outputs/file.js')(worker.options)
    , 'file-faststart' : require('../outputs/file-faststart.js')(worker.options)
    }
  worker.presets       =
    { 'h264.1080'      : require('../presets/h264.1080.js')(worker.options)
    , 'h264.720'       : require('../presets/h264.720.js')(worker.options)
    , 'h264.480'       : require('../presets/h264.480.js')(worker.options)
    , 'webm.1080'      : require('../presets/webm.1080.js')(worker.options)
    , 'webm.720'       : require('../presets/webm.720.js')(worker.options)
    , 'webm.480'       : require('../presets/webm.480.js')(worker.options)
    , 'ogv.1080'       : require('../presets/ogv.1080.js')(worker.options)
    , 'ogv.720'        : require('../presets/ogv.720.js')(worker.options)
    , 'ogv.480'        : require('../presets/ogv.480.js')(worker.options)
    }

  kue.redis.createClient = function () {
    var client = redis.createClient(
      worker.options.redisPort
    , worker.options.redisHost
    )

    if (worker.options.redisAuth) {
      client.auth(worker.options.redisAuth)
    }

    return client
  }

  worker.queue = kue.createQueue()

  worker.queue.process(
    worker.options.queue
  , worker.options.workers
  , function (job, done) {
      worker.process(job, done)
    }
  )
}

module.exports = WebVideoWorker
var proto = WebVideoWorker.prototype

WebVideoWorker.CPUS = os.cpus().length

/**
 * Add an input
 *
 * @param String   name
 * @param Function module
 */
proto.input = function input (name, module) {
  if (module) {
    this.inputs[name] = module(this.options)
    return this
  }
  return this.inputs[name]
}

/**
 * Add an output
 *
 * @param String   name
 * @param Function module
 */
proto.output = function output (name, module) {
  if (module) {
    this.outputs[name] = module(this.options)
    return this
  }
  return this.outputs[name]
}

/**
 * Add an preset
 *
 * @param String   name
 * @param Function module
 */
proto.preset = function preset (name, module) {
  if (module) {
    this.presets[name] = module(this.options)
    return this
  }
  return this.presets[name]
}

/**
 * Process an encoding job
 *
 * @param kue.Job  job
 * @param Function done
 */
proto.process = function process (job, done) {
  var worker = this
  var s = {}

  worker.log('[JOB]', job.id, 'Processing')

  // Create the ffmpeg object from input data
  worker.log('[JOB]', job.id, 'Input', job.data.input)
  worker.input(job.data.input.type)(job, gotInput)

  // Load preset
  function gotInput (error, ffmpeg) {
    if (error) return done(error)

    worker.log('[JOB]', job.id, 'Preset', job.data.preset)
    worker.preset(job.data.preset)(job, ffmpeg)

    // Set threads to cpu count
    ffmpeg.addOption('-threads', WebVideoWorker.CPUS)

    // Do output
    worker.log('[JOB]', job.id, 'Output', job.data.output)
    worker.output(job.data.output.type)(job, ffmpeg, doneOutput)
  }

  function doneOutput (err) {
    if (err) return done(err)

    worker.log('[JOB]', job.id, 'Complete')
    done()
  }
}
