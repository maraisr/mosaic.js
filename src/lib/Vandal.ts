namespace Vandal {
	export class Mosaic {

		private diffuse: Colour;

		constructor(diffuse: Array<number>) {
			this.diffuse = new Colour(diffuse);

			console.log(this.diffuse.toString());
		}
	}

	class Colour {
		private rgb: Array<number>;

		constructor(rgb: Array<number>) {
			this.rgb = rgb;
		}

		toString() {
			return 'rgb('+this.rgb.join(',')+');';
		}
	}
}
