/// <reference path="Vector.ts"/>
/// <reference path="Generator.ts"/>

interface Array<T> {
	chunk(n:number):Array<Array<number>>
}

Array.prototype.chunk = function (n:number):Array<any> {
	return Array.apply(null, Array(Math.ceil(this.length / n))).map((x:number, i:number) => i).map((x:number, i:number) => this.slice(i * n, i * n + n));
}

namespace Vandal {
	export class Mosaic {
		private el:HTMLElement;
		private count:number;

		private mesh:Mesh;

		constructor(el:HTMLElement, diffuse:Array<number>, ambient:Array<number>, count:number) {
			this.el = el;
			this.count = count;

			this.mesh = new Mesh(this.el.offsetWidth, this.el.offsetHeight, this.count, new Colour(ambient), new Colour(diffuse));

			el.appendChild(SVG.out(this.mesh.polygons.map((v:Triangle) => {
				return v.el;
			}), this.el.offsetWidth, this.el.offsetHeight));
		}
	}

	class Colour {
		rgb:Vector.Three;

		constructor(rgb:Array<number>) {
			this.rgb = new Vector.Three(rgb);
		}

		blend(d:Colour, a:Colour, lum:number):Colour {
			var r:Vector.Three = new Vector.Three(this.rgb.xyz);

			return new Colour(r.add(d.rgb.multiplyVectors(a.rgb).multiplyScalar(lum)).xyz.map((v:number) => {
				return Math.ceil(v);
			}));
		}

		shade(percent:number):Colour {
			var f = this.rgb.xyz, t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f[0], G = f[1], B = f[2];
			return new Colour([(Math.round((t - R) * p) + R), (Math.round((t - G) * p) + G), (Math.round((t - B) * p) + B)]);
		}

		toString() {
			return 'rgb(' + this.rgb.toString() + ')';
		}
	}

	class Light {
		private ray:Vector.Three;

		ambient:Colour;
		diffuse:Colour;

		width:number;
		height:number;

		polygons:Array<Triangle>;

		constructor() {
			this.ray = new Vector.Three([(this.width / 2), (this.height / 2), 1]);

			this.run();
		}

		private run() {
			for (var i:number = 0; i < this.polygons.length; i++) {
				var item:Triangle = this.polygons[i],
					ill:number = ((n:number) => {
						switch (item.face) {
							case 1:
								return Math.abs(Math.min(n, 0));
								break;
							case 2:
								return Math.max(Math.abs(n), 0);
								break;
							default:
								return Math.abs(n);
								break;
						}
					})(item.normal.dot(this.ray.subtract(item.centroid).normalize()));

				var c:Colour = item.colour.blend(this.ambient, this.diffuse, ill);

				item.el.setAttributeNS(null, 'style', 'fill: ' + c.toString() + '; stroke: ' + c.toString() + ';');
			}
		}
	}

	class Mesh extends Light {
		private slices:number;

		constructor(width:number, height:number, slices:number, ambient:Colour, diffuse:Colour) {
			this.width = width;
			this.height = height;
			this.slices = slices;

			this.ambient = ambient;
			this.diffuse = diffuse;

			var i:number, x:number, y:number, vertices:Array<Array<number>>,
				offsetX:number = 0,
				offsetY:number = this.height;

			vertices = new Array(slices);

			for (i = slices; i >= 0; i--) {
				vertices[i] = [(offsetX + Math.random() * width), offsetY - Math.random() * height];
			}

			vertices.push([offsetX, offsetY]);
			vertices.push([offsetX + width / 2, offsetY]);
			vertices.push([offsetX + width, offsetY]);
			vertices.push([offsetX + width, offsetY - height / 2]);
			vertices.push([offsetX + width, offsetY - height]);
			vertices.push([offsetX + width / 2, offsetY - height]);
			vertices.push([offsetX, offsetY - height]);
			vertices.push([offsetX, offsetY - height / 2]);

			for (i = 6; i >= 0; i--) {
				vertices.push([offsetX + Math.random() * width, offsetY]);
				vertices.push([offsetX, offsetY - Math.random() * height]);
				vertices.push([offsetX + width, offsetY - Math.random() * height]);
				vertices.push([offsetX + Math.random() * width, offsetY - height]);
			}

			this.polygons = (new Generator.Delaunay()).triangulate(vertices).chunk(3).map((v:Array<number>) => {
				var a:Array<Vector.Three> = new Array(v.length);

				a = v.map((i:number) => {
					var t:Vector.Three = new Vector.Three([vertices[i][0], vertices[i][1], 0]);
					return t;
				});

				return new Triangle(a, ambient);
			});

			super();
		}
	}

	class SVG {
		elm(type:string):Element {
			return document.createElementNS('http://www.w3.org/2000/svg', type);
		}

		attr(el:Element, a:any):Element {
			Object.keys(a).forEach((k:string) => {
				el.setAttributeNS(null, k, a[k]);
			});

			return el;
		}

		static out(items:Array<Element>, width:number, height:number):Element {
			var s:Element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			s.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);

			items.forEach((v:Element) => {
				s.appendChild(v);
			});

			return s;
		}
	}

	class Polygon extends SVG {
		points:Array<Vector.Three>;
		colour:Colour;

		render():Element {
			var t:Element = this.attr(this.elm('polygon'), {
				'stroke-linejoin': 'round',
				'stroke-miterlimit': '1',
				'stroke-width': '1',
				'points': this.points.map((v:Vector.Three) => {
					return v.x + ' ' + v.y;
				}).join(' '),
				'style': 'fill: ' + this.colour.toString() + '; stroke: ' + this.colour.toString() + ';'
			});

			return t;
		}
	}

	class Triangle extends Polygon {
		el:Element;

		centroid:Vector.Three;
		normal:Vector.Three;

		face:number;

		constructor(v:Array<Vector.Three>, colour:Colour) {
			super();

			this.points = v;
			this.colour = colour;
			this.face = ((n:number) => {
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

		calcCentroid():Vector.Three {

			var r:Vector.Three = new Vector.Three([
				// Sum of all x's
				this.points.map((v:Vector.Three) => {
					return v.x;
				}).reduce((a:number, b:number) => {
					return a + b;
				}),
				// Sum of all y's
				this.points.map((v:Vector.Three) => {
					return v.y;
				}).reduce((a:number, b:number) => {
					return a + b;
				}),
				// Sum of all z's
				this.points.map((v:Vector.Three) => {
					return v.z;
				}).reduce((a:number, b:number) => {
					return a + b;
				})
			]);

			return r.divideScalar(3);
		}

		calcNormal():Vector.Three {
			return this.a.subtract(this.b).cross(this.a.subtract(this.c)).normalize();
		}

		get a():Vector.Three {
			return this.points[0];
		}

		get b():Vector.Three {
			return this.points[1];
		}

		get c():Vector.Three {
			return this.points[2];
		}
	}
}
