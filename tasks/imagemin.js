const gulp = require('gulp'),
	imagemin = require('gulp-imagemin');

gulp.task('img', (done) => {
	gulp.src('assets/photos/**')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('assets/photos'))
		.on('end', done);
});