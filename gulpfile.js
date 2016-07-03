var gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    useref = require('gulp-useref'),
    uncss = require('gulp-uncss'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    filesize = require('gulp-filesize'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    templateCache = require('gulp-angular-templatecache'),
    config = require('./config.json'),
    ngAnnotate = require('gulp-ng-annotate');

var filePath = {
    scripts: {
        src: [
            'client/app/**/*module.js',
            'client/app/**/*.js'
        ],
        vendor: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/materialize-css/dist/js/materialize.js'
        ],
        dest: './public/js'
    },
    html: {
        src: 'client/*.html',
        templates: 'client/app/**/*.html',
        dest_templates: 'public/js',
        dest: './public'
    },
    css: {
        vendor: [
            'node_modules/materialize-css/dist/css/materialize.css'
        ],
        dest: './public/styles'
    },
    sass: {
        src: [
            'client/assets/styles/styles.scss',
            'client/assets/styles/**/*.scss'
        ],
        dest: './public/styles'
    },
    img: {
        src: 'client/assets/images/*',
        //sprite_src: 'client/assets/images/'
        dest: './public/images'
    },
    font: {
        src: 'node_modules/materialize-css/dist/font/**/*',
        dest: './public/fonts'
    }
};

gulp.task('vendor', function() {
    gulp.src(filePath.scripts.vendor)
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(filePath.scripts.dest))
        .pipe(filesize())
        .on('error', gutil.log)
});

gulp.task('js', function() {
    gulp.src(filePath.scripts.src)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('build.js'))
        //.pipe(uglify())
        .pipe(ngAnnotate())
        .pipe(filesize())
        .pipe(gulp.dest(filePath.scripts.dest))
        .pipe(browserSync.stream())
        .on('error', gutil.log)
});

gulp.task('sass', function() {
    gulp.src(filePath.sass.src)
        .pipe(sass())
        .pipe(concatCss("build.css"))
        //.pipe(uncss({
        //    html: [filePath.html.src]
        //}))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: false
        }))
        .pipe(filesize())
        .pipe(gulp.dest(filePath.sass.dest))
        .pipe(browserSync.stream())
});

gulp.task('vendor-css', function() {
    gulp.src(filePath.css.vendor)
        .pipe(concatCss("vendor.css"))
        //.pipe(uncss({
        //    html: [filePath.html.src]
        //}))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: false
        }))
        .pipe(filesize())
        .pipe(gulp.dest(filePath.css.dest))
});

gulp.task('html', function() {
     gulp.src(filePath.html.src)
         .pipe(useref())
         .pipe(filesize())
         .pipe(gulp.dest(filePath.html.dest));
});

gulp.task('template', function() {
    gulp.src(config.templateCache)
        .pipe(templateCache('templates.js', {
            standalone: true
        }))
        .pipe(filesize())
        .pipe(gulp.dest(filePath.html.dest_templates))
        .pipe(browserSync.stream());
});

// gulp.spritesmith
gulp.task('sprite', function() {
    gulp.src(filePath.img.src)
        .pipe(imagemin({
            progressive: true, //jpg
            optimizationLevel: 0 // png (0-7)
        }))
        .pipe(filesize())
        .pipe(gulp.dest(filePath.img.dest));
});

gulp.task('font', function() {
    gulp.src(filePath.font.src)
        .pipe(gulp.dest(filePath.font.dest));
});

gulp.task('clean', function () {
    return gulp.src('public', {read: false})
        .pipe(clean());
});

// Static server
gulp.task('browser-sync', ['js', 'template', 'sass'], function() {

    browserSync.init({
        server: {
            baseDir: './public',
            middleware: [ historyApiFallback() ]
        },
        logLevel: 'info'
    });

    gulp.watch('./client/**/*.js', ['js']);
    gulp.watch('./client/assets/styles/styles.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('./client/**/*.html', ['template', 'html']).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
gulp.task('build', ['js', 'template', 'vendor', 'sass', 'vendor-css', 'html', 'font', 'sprite', 'default']);

