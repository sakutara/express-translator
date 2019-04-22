const {task, dest} = require('gulp'), sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify');

function build(watch) {
  const bundler = watchify(
      browserify('./src/index.js', {debug: true}).transform(babel));

  const rebundle = () => {
    bundler.bundle().
        on('error', function(err) {
          console.error(err);
          this.emit('end');
        }).
        pipe(source('build.js')).
        pipe(buffer()).
        pipe(sourcemaps.init({loadMaps: true})).
        pipe(sourcemaps.write('./')).
        pipe(dest('./build'));
  };

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

const watch = () => build(true);

exports = module.exports = {
  default: ['watch'],
  watch,
  build,
};