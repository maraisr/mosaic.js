Mosaic JS
=========

[![NPM version](https://img.shields.io/npm/v/mosaic-js.svg?style=flat-square)](https://www.npmjs.com/package/mosaic-js)
[![License](https://img.shields.io/npm/l/mosaic-js.svg?style=flat-square)](https://github.com/maraisr/mosaic-js/blob/master/license.md)

Real time Delaunay triangulation! Shaded, shaped and plotted! [Live Demo](http://marais.io). Written in TypeScript, for the strict sexiness it offers. [Rollup.js](http://rollupjs.org/) used for the tree shaking love they offer.

## Installation
via [npm](https://www.npmjs.com/)
```sh
npm i mosaic-js
```

### Usage
```js
import Mosaic from 'mosaic-js';

new Mosaic(document.getElementById('mosaic'), [86, 200, 148], [25, 52, 65], 250)
```

### Build
- `npm i tsc -g`
- `npm i`
- `npm run build`

## License
[MIT](https://github.com/maraisr/mosaic.js/blob/master/license.md)

Copyright(c) 2016 Marais Rossouw
