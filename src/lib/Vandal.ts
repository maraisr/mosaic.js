/// <reference path="Vector.ts"/>
/// <reference path="Delaunay.ts"/>

namespace Vandal {
	export class Mosaic {
        private el:HTMLElement;
        private diffuse:Colour;
        private ambient:Colour;
        private count:number;

        constructor(el:HTMLElement, diffuse:Array<number>, ambient:Array<number>, count:number) {
			this.el = el;
			this.count = count;
			this.diffuse = new Colour(diffuse);
			this.ambient = new Colour(ambient);
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
}
