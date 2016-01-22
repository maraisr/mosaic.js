// See: https://github.com/ironwallaby/delaunay/blob/master/delaunay.js
namespace Delaunay {
	const EPSILON = (1.0 / 1048576.0);

	export class triangulate {

		constructor(vertices:Array<Array<number>>) {

		}

		sTriangle(v:Array<Array<number>>):Array<Array<number>> {
			var xmin:number = Number.POSITIVE_INFINITY,
				ymin:number = Number.POSITIVE_INFINITY,
				xmax:number = Number.NEGATIVE_INFINITY,
				ymax:number = Number.NEGATIVE_INFINITY,
				i:number,
				dx:number,
				dy:number,
				dmax:number,
				xmid:number,
				ymid:number;

			for (i = v.length; i--;) {
				if (v[i][0] < xmin) xmin = v[i][0];
				if (v[i][0] > xmax) xmax = v[i][0];
				if (v[i][1] < ymin) ymin = v[i][1];
				if (v[i][1] > ymax) ymax = v[i][1];
			}

			dx = xmax - xmin;
			dy = ymax - ymin;
			dmax = Math.max(dx, dy);
			xmid = xmin + dx * 0.5;
			ymid = ymin + dy * 0.5;

			return [
				[xmid - 20 * dmax, ymid - dmax],
				[xmid, ymid + 20 * dmax],
				[xmid + 20 * dmax, ymid - dmax]
			]
		}

		cCircle(v:Array<Array<number>>, i:number, j:number, k:number) {
			var x1:number = v[i][0],
				y1:number = v[i][1],
				x2:number = v[j][0],
				y2:number = v[j][1],
				x3:number = v[k][0],
				y3:number = v[k][1],
				fabsy1y2:number = Math.abs(y1 - y2),
				fabsy2y3:number = Math.abs(y2 - y3),
				xc:number,
				yc:number,
				m1:number,
				m2:number,
				mx1:number,
				mx2:number,
				my1:number,
				my2:number,
				dx:number,
				dy:number;

			if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
				throw new Error("Eek! Coincident points!");

			if (fabsy1y2 < EPSILON) {
				m2 = -((x3 - x2) / (y3 - y2));
				mx2 = (x2 + x3) / 2.0;
				my2 = (y2 + y3) / 2.0;
				xc = (x2 + x1) / 2.0;
				yc = m2 * (xc - mx2) + my2;
			} else if (fabsy2y3 < EPSILON) {
				m1 = -((x2 - x1) / (y2 - y1));
				mx1 = (x1 + x2) / 2.0;
				my1 = (y1 + y2) / 2.0;
				xc = (x3 + x2) / 2.0;
				yc = m1 * (xc - mx1) + my1;
			} else {
				m1 = -((x2 - x1) / (y2 - y1));
				m2 = -((x3 - x2) / (y3 - y2));
				mx1 = (x1 + x2) / 2.0;
				mx2 = (x2 + x3) / 2.0;
				my1 = (y1 + y2) / 2.0;
				my2 = (y2 + y3) / 2.0;
				xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
				yc = (fabsy1y2 > fabsy2y3) ?
				m1 * (xc - mx1) + my1 :
				m2 * (xc - mx2) + my2;
			}

			dx = x2 - xc;
			dy = y2 - yc;
			return {i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy};
		}

		deDup(e:Array<number>):void {
			var i:number, j:number, a:number, b:number, m:number, n:number;

			for (j = e.length; j;) {
				b = e[--j];
				a = e[--j];

				for (i = j; i;) {
					n = e[--i];
					m = e[--i];

					if ((a === m && b === n) || (a === n && b === m)) {
						e.splice(j, 2);
						e.splice(i, 2);
						break;
					}
				}
			}
		}
	}
}
