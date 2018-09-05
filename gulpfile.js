global.BUILD = '.build';
global.DIST = '.dist';
global.TMP = '.tmp';

const fs = require('fs'),
    del = require('del'),
    config = JSON.parse(fs.readFileSync('./package.json')),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    useref = require('gulp-useref'),
    htmlreplace = require('gulp-html-replace'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    cache = require('gulp-cached'),
    replace = require('gulp-replace');
gulp.registry(new require('gulp-hub')(['tasks/*.js']));

gulp.task('dist', gulp.series('img', (done) => {
    done();
}));

gulp.task('connect', () => {
    connect.server({
        port: 3000,
        root: BUILD,
        livereload: true
    });
});

gulp.task('reload', () => {
    gulp.src('./app/*.html')
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
});

gulp.task('reload', () => {
    gulp.src(BUILD + '/**/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(['src/**/*.*'], gulp.series('hbs', 'reload'));
});

gulp.task('default', gulp.parallel('clean', 'hbs', 'copy:build', 'connect', 'watch', (done) => {
    done();
}));

//dist
gulp.task('useref', (done) => {
    gulp.src(`${BUILD}/503.html`)
        .pipe(cache('useref'))
        .pipe(useref({
            searchPath: `assets`
        }))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(TMP))
        .on('end', done);
});
gulp.task('rev', (done) => {
    gulp.src([`${TMP}/css/*.css`, `${TMP}/js/*.js`], {
            base: TMP
        })
        .pipe(rev())
        .pipe(gulp.dest(DIST))
        .pipe(rev.manifest())
        .pipe(gulp.dest(TMP))
        .on('end', done);
});
gulp.task('replace', (done) => {
    var manifest = JSON.parse(fs.readFileSync(`${TMP}/rev-manifest.json`, 'utf8'));
    gulp.src(`${TMP}/**/*.html`)
        .pipe(replace('css/app.css', manifest['css/app.css']))
        .pipe(replace('js/app.js', manifest['js/app.js']))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true
        }))
        .pipe(gulp.dest(DIST))
        .on('end', done);
    done();
});
gulp.task('htmlreplace', (done) => {
    gulp.src(`${BUILD}/**/*.html`)
        .pipe(htmlreplace({
            'css': '/css/app.css',
            'js': '/js/app.js'
        }))
        .pipe(gulp.dest(TMP))
        .on('end', done);
});
gulp.task('dist', gulp.series('clean:dist', 'hbs', 'useref', 'htmlreplace', 'rev', 'replace', 'copy:dist', (done) => {
    done();
}));
gulp.task('deploy', gulp.series('dist', 'github', (done) => {
    done();
}));