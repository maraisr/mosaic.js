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
		private diffuse:Colour;
		private ambient:Colour;
		private count:number;

		private mesh:Mesh;

		constructor(el:HTMLElement, diffuse:Array<number>, ambient:Array<number>, count:number) {
			this.el = el;
			this.count = count;
			this.diffuse = new Colour(diffuse);
			this.ambient = new Colour(ambient);

			this.mesh = new Mesh(this.el.offsetWidth, this.el.offsetHeight, this.count);
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

		private polygons:Array<Triangle>;

		constructor(width:number, height:number, slices:number) {
			this.width = width;
			this.height = height;
			this.slices = slices;

			var i:number, x:number, y:number, vertices:Array<Array<number>>,
				offsetX:number = 0,
				offsetY:number = this.height;

			vertices = (new Array(slices)).map((i:number) => {
				return [(offsetX + Math.random() * width), offsetY - Math.random() * height];
			});

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

				return new Triangle(a);
			});
		}
	}

	class Triangle {
		private abc:Array<Vector.Three>;

		constructor(v:Array<Vector.Three>) {
			this.abc = v;
		}

		get a():Vector.Three {
			return this.abc[0];
		}

		get b():Vector.Three {
			return this.abc[1];
		}

		get c():Vector.Three {
			return this.abc[2];
		}
	}
}
