class Delaunay {
	constructor() {
		const EPSILON = (1.0 / 1048576.0);
	}

	sTriangle(v: Array<Array<number>>): Array<Array<number>> {
		var xmin: number = Number.POSITIVE_INFINITY;
		var ymin: number = Number.POSITIVE_INFINITY;
		var xmax: number = Number.NEGATIVE_INFINITY;
		var ymax: number = Number.NEGATIVE_INFINITY;
		var i: number;
		var dx: number;
		var dy: number;
		var dmax: number;
		var xmid: number;
		var ymid: number;

		for(i = v.length; i--;) {
	      	if(v[i][0] < xmin) xmin = v[i][0];
	      	if(v[i][0] > xmax) xmax = v[i][0];
	      	if(v[i][1] < ymin) ymin = v[i][1];
	      	if(v[i][1] > ymax) ymax = v[i][1];
	    }

		dx = xmax - xmin;
	    dy = ymax - ymin;
	    dmax = Math.max(dx, dy);
	    xmid = xmin + dx * 0.5;
	    ymid = ymin + dy * 0.5;

		return [
	      [xmid - 20 * dmax, ymid -      dmax],
	      [xmid            , ymid + 20 * dmax],
	      [xmid + 20 * dmax, ymid -      dmax]
	    ]
	}
}
