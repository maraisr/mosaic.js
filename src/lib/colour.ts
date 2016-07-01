import {Vector} from './vector';

export default class Colour {
	public rgb: Vector.Three;

	constructor(rgb: Array<number>) {
		this.rgb = new Vector.Three(rgb);
	}

	blend(d: Colour, a: Colour, lum: number): Colour {
		var r: Vector.Three = new Vector.Three(this.rgb.xyz);

		return new Colour(r.add(d.rgb.multiplyVectors(a.rgb).multiplyScalar(lum)).xyz.map((v: number) => {
			return Math.ceil(v);
		}));
	}

	shade(percent: number): Colour {
		var f = this.rgb.xyz, t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f[0], G = f[1], B = f[2];
		return new Colour([(Math.round((t - R) * p) + R), (Math.round((t - G) * p) + G), (Math.round((t - B) * p) + B)]);
	}

	toString() {
		return 'rgb(' + this.rgb.toString() + ')';
	}
}
