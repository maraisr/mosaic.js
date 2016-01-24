// See: https://github.com/ironwallaby/delaunay/blob/master/delaunay.js
export module Generators {
    const EPSILON = (1.0 / 1048576.0);

    export class Delaunay {
        triangles:Array<any>;

        constructor(vertices:Array<Array<number>>) {
            var n:number = vertices.length,
                i:number, j:number, indices:Array<number>, st:Array<Array<number>>, open:Array<any>, closed:Array<any>, edges:Array<number>, dx:number, dy:number, a:number, b:number, c:number;

            if (n < 3) {
                this.triangles = [];
                return;
            }

            vertices = vertices.slice(0);

            indices = new Array(n);

            for (i = n; i--;) {
                indices[i] = i;
            }

            indices.sort(function (i, j) {
                return vertices[j][0] - vertices[i][0];
            });

            st = this.sTriangle(vertices);
            vertices.push(st[0], st[1], st[2]);

            open = [this.cCircle(vertices, n + 0, n + 1, n + 2)];
            closed = [];
            edges = [];

            for (i = indices.length; i--; edges.length = 0) {
                c = indices[i];

                for (j = open.length; j--;) {

                    dx = vertices[c][0] - open[j].x;
                    if (dx > 0.0 && dx * dx > open[j].r) {
                        closed.push(open[j]);
                        open.splice(j, 1);
                        continue;
                    }

                    dy = vertices[c][1] - open[j].y;

                    if (dx * dx + dy * dy - open[j].r > EPSILON) {
                        continue;
                    }

                    edges.push(
                        open[j].i, open[j].j,
                        open[j].j, open[j].k,
                        open[j].k, open[j].i
                    );
                    open.splice(j, 1);
                }

                this.deDup(edges);

                for (j = edges.length; j;) {
                    b = edges[--j];
                    a = edges[--j];
                    open.push(this.cCircle(vertices, a, b, c));
                }
            }

            for (i = open.length; i--;) {
                closed.push(open[i]);
            }

            open.length = 0;

            for (i = closed.length; i--;) {
                if (closed[i].i < n && closed[i].j < n && closed[i].k < n) {
                    open.push(closed[i].i, closed[i].j, closed[i].k);
                }
            }

            this.triangles = open;
        }

        private sTriangle(v:Array<Array<number>>):Array<Array<number>> {
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

        private cCircle(v:Array<Array<number>>, i:number, j:number, k:number):any {
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
                throw new Error("Points!");

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

        private deDup(e:Array<any>):void {
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