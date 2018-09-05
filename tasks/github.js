const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

gulp.task('github', () => gulp.src('./.dist/**/*').pipe(ghPages()));