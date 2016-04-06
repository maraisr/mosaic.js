Mosaic JS
=========

[![NPM version](https://img.shields.io/npm/v/mosaic.js.svg?style=flat-square)](https://www.npmjs.com/package/mosaic.js)
[![Bower version](https://img.shields.io/bower/v/mosaic.js.svg?style=flat-square)](https://github.com/maraisr/mosaic.js)
[![License](https://img.shields.io/npm/l/mosaic.js.svg?style=flat-square)](https://github.com/maraisr/mosaic.js/blob/master/LICENSE.md)

Real time Delaunay triangulation! Shaded, shaped and plotted! [Live Demo](http://marais.io). Written in TypeScript, for the strict sexiness it offers. Uses [Google Closure Compiler](https://developers.google.com/closure/compiler/) compilation passed through [Rollup.js](http://rollupjs.org/) for the tree shaking love they offer.

## Installation

via [npm](https://www.npmjs.com/)
```sh
npm i mosaic.js
```

via [bower](http://bower.io//)
```sh
bower i mosaic.js
```

### Usage
```js
/**
 * Mosaic is global. 
 * 
 * @param {HTMLElement} arg1 The element to which you which to render.
 * @param {Array<number>} arg2 The diffuse rgb Array
 * @param {Array<number>} arg3 The ambient rgb Array
 * @param {number} arg4 Number of triangles
 */
new Mosaic.Vandal.Mosaic(document.getElementById('vandal'), [86, 200, 148], [25, 52, 65], 250);
```

### Build
- `npm i tsc -g`
- `npm i`
- `npm run build`

## License
[MIT](https://github.com/maraisr/mosaic.js/blob/master/LICENSE.md)

Copyright(c) 2016 Marais Rossouw
