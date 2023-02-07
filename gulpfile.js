/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const gulp = require('gulp');

gulp.task('move-email-views', function () {
  return gulp.src('./src/views/mail/**/*.ejs').pipe(gulp.dest('./dist/views/mail'));
});

gulp.task('default', gulp.series('move-email-views'), () => {
  console.log('Done');
});
