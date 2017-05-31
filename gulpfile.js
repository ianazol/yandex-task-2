const gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    webpackStream = require("webpack-stream"),
    webpack = webpackStream.webpack,
    gulpIf = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat');

const path = {
    build: {
        js: 'client/build'
    },
    src: {
        js: 'client/src/**/*.js',
    },
    watch: {
        js: 'client/src/**/*.js',
    }
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('webpack', function(){
    let options = {
        context: __dirname + '/client/src',
        entry: {
            main: `./`
        },
        output: {
            path: __dirname + '/client/build',
            filename: "app.js"
        },
        watch: isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
        module:  {
            loaders: [{
                test:    /\.js$/,
                include: __dirname + "/client/src",
                loader:  'babel'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    return gulp.src('client/src/index.js')
        .pipe(plumber())
        .pipe(webpackStream(options, null))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('watch', function () {
    watch([path.src.js], function (event, cb) {
        gulp.start('webpack');
    });
});

gulp.task('default', ['webpack', 'watch']);