var gulp          = require('gulp');
var browserify    = require('browserify');
var watchify      = require('watchify');
var source        = require('vinyl-source-stream');
var babelify      = require('babelify');
var browserSync   = require('browser-sync');
var gutil         = require('gulp-util');
var gnotify       = require('gulp-notify');

var src = './src',
    dest = './build';

var config = {
  src: src,
  entries: src + '/app/index.js',
  markup: src + '/www/**',
  dest: dest,
  outputName: 'bundle.js',
  debug: true, // to create sourcemaps using browserify debug = true
  browserSync: {
    server: {
      baseDir: [dest, src]
    },
    files: [ dest + '/**']
  }
};


///////////////////////////////////////////////////////
// BUILD TASK
///////////////////////////////////////////////////////
gulp.task('browserify', function(){
  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: false,
    entries: config.entries,
    debug: config.debug
  });

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', handleError)
      .pipe(source(config.outputName))
      .pipe(gulp.dest(config.dest))
      .on('end', reportFinished);
  };

  bundler
    //.transform(babelify.configure())
    .transform(babelify, { presets: [ 'es2015', 'react' ]});

  if(global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});

var reportFinished = function() {
    gutil.log(gutil.colors.yellow('Finished bundling'));
};

var handleError = function() {
  var args = Array.prototype.slice.call(arguments);

  gnotify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  this.emit('end');
};


///////////////////////////////////////////////////////
// BROWSER SYNC
///////////////////////////////////////////////////////
gulp.task('browserSync', ['browserify'], function() {
  browserSync(config.browserSync);
});


///////////////////////////////////////////////////////
// MARKUP TASK
///////////////////////////////////////////////////////
gulp.task('markup', function() {
  return gulp.src(config.markup)
            .pipe(gulp.dest(config.dest));
});


///////////////////////////////////////////////////////
// WATCH TASK
///////////////////////////////////////////////////////
gulp.task('setWatch', function() {
  global.isWatching = true;
});

gulp.task('watch', ['setWatch', 'browserSync'], function() {
  gulp.watch(config.markup, ['markup']);
});


///////////////////////////////////////////////////////
// DEFAULT TASK
///////////////////////////////////////////////////////
gulp.task('default', ['watch']);