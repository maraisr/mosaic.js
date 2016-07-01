import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');

export default {
	entry: 'tmp/Vandal.js',
	plugins: [

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
