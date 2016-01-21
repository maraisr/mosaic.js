'use strict';

import gulp from 'gulp';
import ts from 'gulp-typescript';
import cc from 'gulp-closure-compiler';

gulp.task('ts', () => {
	return gulp.src('src/**/*.ts')
	.pipe(ts({
		noImplicitAny: true,
		out: 'main.js'
	}))
	.pipe(gulp.dest('.tmp/'));
});

gulp.task('build:js', ['ts'], () => {
	return gulp.src('.tmp/*.js')
	.pipe(cc({
		fileName: 'main.js',
		continueWithWarnings: true,
		compilerFlags: {
			compilation_level: 'ADVANCED_OPTIMIZATIONS',
			language_in: 'ECMASCRIPT5',
			language_out: 'ECMASCRIPT5_STRICT',
			warning_level: 'QUIET'
		}
	}))
	.pipe(gulp.dest('dist/'));
})

gulp.task('default', ['ts'], () => {
	gulp.watch('src/**/*.ts', ['ts']);
});
