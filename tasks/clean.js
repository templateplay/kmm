const gulp = require('gulp'),
	del = require('del');

gulp.task('clean', (done) => {
	del.sync([TMP, BUILD]);
	done();
});
gulp.task('clean:dist', (done) => {
	del.sync([TMP, `${DIST}/!(.git|.gitignore|CNAME)`]);
	done();
});