import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import includePaths from 'rollup-plugin-includepaths';

let pkg = require('./package.json');

export default {
	entry: 'tmp/Vandal.js',
	plugins: [
		includePaths({
			paths: ['tmp'],
			extensions: ['.js']
		}),
		babel(babelrc())
	],
	targets: [
		{
			dest: pkg['main'],
			format: 'umd',
			moduleName: 'mosaic',
			sourceMap: false,
		}
	]
};
