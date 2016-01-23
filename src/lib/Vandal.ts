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
		private rgb:Vector.Three;

		constructor(rgb:Array<number>) {
			this.rgb = new Vector.Three(rgb);
		}

		toString() {
			return 'rgb(' + this.rgb.toString() + ');';
		}
	}

	class Mesh {
		private width:number;
		private height:number;
		private slices:number;
		private ambient:Colour;
		private diffuse:Colour;

		polygons:Array<Triangle>;

		constructor(width:number, height:number, slices:number, ambient:Colour, diffuse:Colour) {
			this.width = width;
			this.height = height;
			this.slices = slices;

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

		private centroid:Vector.Three;

		constructor(v:Array<Vector.Three>, colour:Colour) {
			super();

			this.points = v;
			this.colour = colour;
			this.el = this.render();

			this.centroid = this.calcCentroid();
		}

		calcCentroid():Vector.Three {

			var r:Vector.Three = new Vector.Three([this.points.map((v:Vector.Three) => {
				return v.x;
			}).reduce((a:number, b:number) => {
				return a + b;
			}), this.points.map((v:Vector.Three) => {
				return v.y;
			}).reduce((a:number, b:number) => {
				return a + b;
			}), this.points.map((v:Vector.Three) => {
				return v.z;
			}).reduce((a:number, b:number) => {
				return a + b;
			})]);

			return r.divideScalar(3);
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
