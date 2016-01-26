'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var pn = require('gulp-plumber-notifier');
var gc = require('gulp-closure-compiler');
var rmrf = require('gulp-rimraf');
var ru = require('gulp-rollup');
var babel = require('gulp-babel');

gulp.task('clean', function () {
	return gulp.src(['bin/', 'dist/', '.tmp/'], {read: false})
		.pipe(rmrf());
});

gulp.task('ts', ['clean'], function () {
	return gulp.src(['src/**/*.ts'])
		.pipe(pn())
		.pipe(ts(ts.createProject('tsconfig.json')))
		.pipe(gulp.dest('.tmp/one/'));
});

gulp.task('build:es6', ['ts'], function () {
	return gulp.src('.tmp/one/Vandal.js')
		.pipe(ru({
			indent: false, plugins: {
				resolveId: function (code, id) {
					if (id) {
						return '.tmp/one/' + code + '.js';
					}
				}
			}
		}))
		.pipe(gulp.dest('.tmp/two/'))
})

gulp.task('default', ['build:es6'], function () {
	return gulp.src('.tmp/two/Vandal.js')
		.pipe(gc({
			fileName: 'Mosaic.js',
			compilerFlags: {
				compilation_level: 'ADVANCED_OPTIMIZATIONS',
				language_in: 'ES6_TYPED',
				language_out: 'ECMASCRIPT5_STRICT',
				warning_level: 'QUIET',
				use_types_for_optimization: true,
				generate_exports: true
			}
		}))
		.pipe(gulp.dest('bin/'))
});