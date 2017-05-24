var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();                       // load all plugins

//  CSS
gulp.task('css', function () {
    return gulp.src('src/sass/style.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.plumber())
        .pipe(plugins.sass().on('error', plugins.sass.logError))    // compile Sass
        .pipe(plugins.autoprefixer())                               // autoprefix
        .pipe(plugins.csso())                                       // minify
        .pipe(plugins.livereload())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(''));
});

// JS
gulp.task('js', function() {
    return gulp.src('src/js/site.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.plumber())
        .pipe(plugins.uglify())                                     // minify
        .pipe(plugins.livereload())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('static'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src('static', {read: false})
        .pipe(plugins.clean());
});

// Images optimisation
gulp.task('img', function () {
    return gulp.src('src/img/*.{png,jpg,svg}')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('static/img'));
});

// Watch
gulp.task('watch', function(){
    plugins.livereload.listen(35729);
    gulp.watch('**/*.php').on('change', function(file) {
        plugins.livereload.changed(file.path);
    });
    gulp.watch('**/*.twig').on('change', function(file) {
        plugins.livereload.changed(file.path);
    });
    gulp.watch('src/sass/**/*.scss',['css']);
    gulp.watch('src/js/site.js',['js']);
});

// Build
gulp.task('build', ['clean', 'css', 'js', 'img']);

// Default
gulp.task('default', ['watch']);