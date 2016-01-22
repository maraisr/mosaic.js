'use strict';

import gulp from 'gulp';
import ts from 'gulp-tsc';
import pn from 'gulp-plumber-notifier';

gulp.task('ts', () => {
	return gulp.src(['src/entry.ts'])
	.pipe(pn())
	.pipe(ts({
		removeComments: true,
    	noImplicitAny: true,
    	target: 'ES5',
		out: 'entry.js'
	}))
	.pipe(gulp.dest('.tmp/'));
});

gulp.task('js', ['ts'], () => {
	return gulp.src('.tmp/entry.js')
	.pipe(gulp.dest('dist/'))
});

gulp.task('default', ['js'], () => {
	gulp.watch('src/**/*.ts', ['js']);
});
