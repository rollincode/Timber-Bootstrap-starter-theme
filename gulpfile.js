var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();                       // load all plugins

//  CSS
gulp.task('css', function () {
    return gulp.src('src/sass/style.scss')
        .pipe(plugins.sass())                                       // compile Sass
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())                               // autoprefix
        .pipe(plugins.csso())                                       // minify
        .pipe(gulp.dest(''));
});

// JS
gulp.task('js', function() {
    return gulp.src('src/js/site.js')
        .pipe(plugins.uglify())                                     // minify
        .pipe(gulp.dest('static'));
});

// Images optimisation
gulp.task('img', function () {
    return gulp.src('/src/img/*.{png,jpg,svg}')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('/static/img'));
});

// Watch
gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss',['css', 'js']);
});

// Build
gulp.task('build', ['css', 'js', 'img']);

// Default
gulp.task('default', ['watch']);
