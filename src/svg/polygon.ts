import {Vector} from '../lib/Vector';
import Colour from '../lib/colour';

import SVG from './index';

class Polygon extends SVG {
	points: Array<Vector.Three>;
	colour: Colour;

	render(): Element {
		var t: Element = this.attr(this.elm('polygon'), {
			'stroke-linejoin': 'round',
			'stroke-miterlimit': '1',
			'stroke-width': '1',
			'points': this.points.map((v: Vector.Three) => {
				return v.x + ' ' + v.y;
			}).join(' '),
			'style': 'fill:' + this.colour.toString() + '; stroke:' + this.colour.toString() + ';'
		});

		return t;
	}
}

export class Triangle extends Polygon {
	el: Element;

	centroid: Vector.Three;
	normal: Vector.Three;

	face: number;

	constructor(v: Array<Vector.Three>, colour: Colour) {
		super();

		this.points = v;
		this.colour = colour;
		this.face = ((n: number) => {
			if (n > 50) {
				return 0;
			}

			if (n < 50 && n > 25) {
				return 1;
			}

			if (n < 25) {
				return 2;
			}
		})(Math.random() * 100);

		this.el = this.render();

		this.centroid = this.calcCentroid();
		this.normal = this.calcNormal();
	}

	calcCentroid(): Vector.Three {

		var r: Vector.Three = new Vector.Three([
			// Sum of all x's
			this.points.map((v: Vector.Three) => {
				return v.x;
			}).reduce((a: number, b: number) => {
				return a + b;
			}),
			// Sum of all y's
			this.points.map((v: Vector.Three) => {
				return v.y;
			}).reduce((a: number, b: number) => {
				return a + b;
			}),
			// Sum of all z's
			this.points.map((v: Vector.Three) => {
				return v.z;
			}).reduce((a: number, b: number) => {
				return a + b;
			})
		]);

		return r.divideScalar(3);
	}

	calcNormal(): Vector.Three {
		return this.a.subtract(this.b).cross(this.a.subtract(this.c)).normalize();
	}

	get a(): Vector.Three {
		return this.points[0];
	}

	get b(): Vector.Three {
		return this.points[1];
	}

	get c(): Vector.Three {
		return this.points[2];
	}
}
