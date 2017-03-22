const gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    webpackStream = require("webpack-stream"),
    webpack = webpackStream.webpack,
    gulpIf = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    handlebars = require("gulp-handlebars"),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat');

const path = {
    build: {
        js: 'client/js/build'
    },
    src: {
        js: 'client/js/src/**/*.js',
        htmlTmpl: 'client/js/src/**/*.hbs'
    },
    watch: {
        js: 'client/js/src/**/*.js',
        htmlTmpl: 'client/js/src/**/*.hbs'
    }
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('webpack', function(){
    let options = {
        context: __dirname + '/client/js/src',
        entry: {
            main: `./app`
        },
        output: {
            path: __dirname + '/client/js/build',
            libraryTarget: 'var',
            library: "App",
            filename: "app.js"
        },
        watch: isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
        module:  {
            loaders: [{
                test:    /\.js$/,
                include: __dirname + "/client/js/src",
                loader:  'babel?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(webpackStream(options, null))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('templates', function(){
    gulp.src(path.src.htmlTmpl)
        .pipe(plumber())
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'ScheduleApp.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});


gulp.task('watch', function () {
    watch([path.src.js], function (event, cb) {
        gulp.start('webpack');
    });
    watch([path.watch.htmlTmpl], function(event, cb) {
        gulp.start('templates');
    });
});

gulp.task('default', ['webpack', 'templates', 'watch']);