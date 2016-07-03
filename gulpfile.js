var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', () => {
    log('Analyzing source with JSHint and JSCS');

    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], () => {
    log('Compiling CSS');

    return gulp.src(config.style)
        .pipe($.plumber())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});


gulp.task('images', ['clean-images'], () => {
    log('Copying and compressing the images');

    return gulp.src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', () => {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig);
});

gulp.task('clean-images', () => {
    clean(config.build + 'images/**/*.*');
});

gulp.task('clean-styles', () => {
    clean(config.temp + '**/*.css');
});

gulp.task('clean-code', () => {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files);
});

gulp.task('templatecache', ['clean-code'], () => {
    log('Creating AngularJS $templateCache');

    return gulp.src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('inject', ['templatecache', 'styles'], () => {
    log('Wire up the bower css js, app css js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    var templateCache = config.temp + config.templateCache.file;

    return gulp.src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js, {read: false}), {relative: true}))
        .pipe($.inject(
            gulp.src(templateCache, {read: false}), {
                starttag: '<!-- inject:templates:js -->',
                relative: true
            }))
        .pipe($.inject(gulp.src(config.css, {read: false}), {relative: true}))
        .pipe(gulp.dest(config.client));
});

gulp.task('build', ['optimize', 'images'], () => {
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running'
    };
    //del(config.temp);
    log(msg);
    notify(msg);
});

function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}