import Colour from './lib/colour';
import {Generators} from './lib/generators';
import {Vector} from './lib/vector';

import SVG from './svg/index';
import {Triangle} from './svg/polygon';

Array.prototype.chunk = function (n: number): Array<any> {
	return Array.apply(null, Array(Math.ceil(this.length / n))).map((x: number, i: number) => i).map((x: number, i: number) => this.slice(i * n, i * n + n));
}

export default class Mosaic {
	private el: HTMLElement;
	private count: number;

	private mesh: Mesh;

	constructor(el: HTMLElement, diffuse: Array<number>, ambient: Array<number>, count: number) {
		this.el = el;
		this.count = count;

		var run = () => {
			this.clear();
			this.mesh = new Mesh(this.el.offsetWidth, this.el.offsetHeight, this.count, new Colour(ambient), new Colour(diffuse));

			el.appendChild(SVG.out(this.mesh.polygons.map((v: Triangle) => {
				return v.el;
			}), this.el.offsetWidth, this.el.offsetHeight));
		}

		run();

		var screenWH: number = 0;

		var render = () => {
			if (this.mesh.blendNow()) {
				this.mesh.blendLights();
			}

			if (screenWH == 0 || screenWH != this.el.offsetWidth + this.el.offsetHeight) {
				screenWH = this.el.offsetWidth + this.el.offsetHeight;

				run();
				this.mesh.blendLights();
			}

			requestAnimationFrame(render);
		}

		render();
	}

	clear(): void {
		for (var i = this.el.childNodes.length - 1; i >= 0; i--) {
			this.el.removeChild(this.el.childNodes[i]);
		}
	}
}

class Light {
	ambient: Colour;
	diffuse: Colour;

	width: number;
	height: number;

	polygons: Array<Triangle>;

	constructor(public ray:Vector.Three) {
		this.ray = ray;

		self.addEventListener('mousemove', (e: MouseEvent) => {
			this.ray.x = e.pageX;
			this.ray.y = e.pageY;
		});
	}

	blendLights() {
		for (var i: number = 0; i < this.polygons.length; i++) {
			var item: Triangle = this.polygons[i],
				ill: number = ((n: number) => {
					switch (item.face) {
						case 1:
							return Math.abs(Math.min(n, 0)) * 0.99;
						case 2:
							return Math.max(Math.abs(n), 0) * 0.89;
						default:
							return Math.abs(n) * 0.85;
					}
				})(item.normal.dot(this.ray.subtract(item.centroid).normalize()));

			var c: Colour = item.colour.blend(this.ambient, this.diffuse, ill);

			item.el.setAttributeNS(null, 'style', 'fill: ' + c.toString() + '; stroke: ' + c.toString() + ';');
		}
	}
}

class Mesh extends Light {
	private slices: number;

	private mouseXY: number;

	constructor(width: number, height: number, slices: number, ambient: Colour, diffuse: Colour) {
		super(new Vector.Three([(width / 2), (height / 2), 1.2]));

		this.width = width;
		this.height = height;
		this.slices = slices;

		this.ambient = ambient;
		this.diffuse = diffuse;

		var i: number, x: number, y: number, vertices: Array<Array<number>>,
			offsetX: number = 0,
			offsetY: number = this.height;

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

		this.polygons = (new Generators.Delaunay(vertices)).triangles.chunk(3).map((v: Array<number>) => {
			var a: Array<Vector.Three> = new Array(v.length);

			a = v.map((i: number) => {
				var t: Vector.Three = new Vector.Three([vertices[i][0], vertices[i][1], 0]);
				return t;
			});

			return new Triangle(a, ambient);
		});
	}

	blendNow(): boolean {
		if (this.mouseXY != this.ray.x + this.ray.y) {
			this.mouseXY = this.ray.x + this.ray.y;
			return true;
		}

		return false;
	}
}
