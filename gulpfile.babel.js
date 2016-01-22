'use strict';

import gulp from 'gulp';
import ts from 'gulp-tsc';
import cc from 'gulp-closure-compiler';
import pn from 'gulp-plumber-notifier';
import concat from 'gulp-concat';
import amd from 'gulp-amd-optimizer';

gulp.task('ts', () => {
	return gulp.src('src/**/*.ts')
	.pipe(pn())
	.pipe(ts({
		target: 'ES5',
		tmpDir: '.tmp/'
	}))
	.pipe(amd({
		baseUrl: ''
	}))
	.pipe(concat('entry.js'))
	.pipe(gulp.dest('dist/'));
});

gulp.task('build', ['ts'], () => {
	return gulp.src('dist/*.js')
	.pipe(pn())
	.pipe(cc({
		fileName: 'entry.js',
		continueWithWarnings: true,
		compilerFlags: {
			compilation_level: 'ADVANCED_OPTIMIZATIONS',
			language_in: 'ECMASCRIPT5',
			language_out: 'ECMASCRIPT5_STRICT',
			warning_level: 'QUIET'
		}
	}))
	.pipe(gulp.dest('bin/'));
});

gulp.task('default', ['ts'], () => {
	gulp.watch('src/**/*.ts', ['ts']);
});
