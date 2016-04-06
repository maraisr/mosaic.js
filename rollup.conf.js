var babel = require('rollup-plugin-babel'),
	includePaths = require('rollup-plugin-includepaths');

module.exports = {
	entry: 'tmp/Vandal.js',
	dest: 'dist/mosaic.js',
	plugins: [
		includePaths({
			paths: ['tmp'],
			extensions: ['.js']
		}),
		babel()
	],
	format: 'umd',
	moduleName: 'Mosaic',
	moduleId: 'mosaic',
	sourceMap: false
};
