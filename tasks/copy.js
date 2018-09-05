const gulp = require('gulp');

gulp.task('copy:build', (done) => {
	gulp.src('assets/**')
		.pipe(gulp.dest(BUILD))
		.on('end', done);
});

gulp.task('copy:dist', (done) => {
	gulp.src([`assets/?(fonts|img|photos)/**/*`, 'assets/*'])
		.pipe(gulp.dest(DIST))
		.on('end', done);
});