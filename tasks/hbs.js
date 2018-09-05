const gulp = require('gulp'),
	panini = require('panini');

gulp.task('hbs', (done) => {
	panini.refresh();
	gulp.src('src/pages/**/*.html')
		.pipe(panini({
			root: 'src/pages/',
			layouts: 'src/layouts/',
			partials: 'src/partials/',
			helpers: 'src/helpers/',
			data: 'src/data/'
		}))
		.pipe(gulp.dest(BUILD))
		.on('end', done);
});