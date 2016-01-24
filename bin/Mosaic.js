'use strict';
var q = "undefined" != typeof window && window === this ? this : "undefined" != typeof global ? global : this;
function u(n, c) {
	function b() {
	}

	b.prototype = c.prototype;
	n.prototype = new b;
	n.prototype.constructor = n;
	for (var a in c)if (q.Object.defineProperties) {
		var r = q.Object.getOwnPropertyDescriptor(c, a);
		void 0 !== r && q.Object.defineProperty(n, a, r)
	} else n[a] = c[a]
}
var v;
(function (n) {
	function c(b) {
		this.f = b = void 0 === b ? [0, 0, 0] : b
	}

	c.prototype.toString = function () {
		return this.f.join(", ")
	};
	c.prototype.add = function (b) {
		return new c([this.x + b.x, this.y + b.y, this.z + b.z])
	};
	c.prototype.v = function (b) {
		return new c([this.x - b.x, this.y - b.y, this.z - b.z])
	};
	c.prototype.B = function (b) {
		var a = new c;
		a.x = 0 == this.x ? 0 : this.x / b;
		a.y = 0 == this.y ? 0 : this.y / b;
		a.z = 0 == this.z ? 0 : this.z / b;
		return a
	};
	c.prototype.N = function (b) {
		var a = new c;
		a.x = 0 == this.x ? 0 : this.x * b;
		a.y = 0 == this.y ? 0 : this.y * b;
		a.z = 0 == this.z ? 0 : this.z *
		b;
		return a
	};
	c.prototype.O = function (b) {
		var a = new c;
		a.x = this.x * b.x;
		a.y = this.y * b.y;
		a.z = this.z * b.z;
		return a
	};
	c.prototype.L = function (b) {
		var a = new c;
		a.x = this.y * b.z - this.z * b.y;
		a.y = this.z * b.x - this.x * b.z;
		a.z = this.x * b.y - this.y * b.x;
		return a
	};
	c.prototype.a = function () {
		return this.x * this.x + this.y * this.y + this.z * this.z
	};
	c.prototype.length = function () {
		return Math.sqrt(this.a())
	};
	c.prototype.normalize = function () {
		return this.B(this.length())
	};
	c.prototype.M = function (b) {
		return this.x * b.x + this.y * b.y + this.z * b.z
	};
	c.prototype.min =
		function (b) {
			var a = new c;
			a.x = this.x < b.x ? this.x : b.x;
			a.y = this.y < b.y ? this.y : b.y;
			a.z = this.z < b.z ? this.z : b.z;
			return a
		};
	c.prototype.max = function (b) {
		var a = new c;
		a.x = this.x > b.x ? this.x : b.x;
		a.y = this.y > b.y ? this.y : b.y;
		a.z = this.z > b.z ? this.z : b.z;
		return a
	};
	Object.defineProperties(c.prototype, {
		x: {
			configurable: !0, enumerable: !0, set: function (b) {
				this.f[0] = b
			}, get: function () {
				return this.f[0]
			}
		}, y: {
			configurable: !0, enumerable: !0, set: function (b) {
				this.f[1] = b
			}, get: function () {
				return this.f[1]
			}
		}, z: {
			configurable: !0, enumerable: !0,
			set: function (b) {
				this.f[2] = b
			}, get: function () {
				return this.f[2]
			}
		}
	});
	n.h = c
})(v || (v = {}));
var w;
(function (n) {
	function c(a) {
		var c = a.length, e, f, h, d, l, m, p, k, g;
		if (3 > c)this.C = []; else {
			a = a.slice(0);
			h = Array(c);
			for (e = c; e--;)h[e] = e;
			h.sort(function (d, b) {
				return a[b][0] - a[d][0]
			});
			e = this.g(a);
			a.push(e[0], e[1], e[2]);
			d = [this.a(a, c + 0, c + 1, c + 2)];
			l = [];
			m = [];
			for (e = h.length; e--; m.length = 0) {
				g = h[e];
				for (f = d.length; f--;)p = a[g][0] - d[f].x, 0 < p && p * p > d[f].r ? (l.push(d[f]), d.splice(f, 1)) : (k = a[g][1] - d[f].y, p * p + k * k - d[f].r > b || (m.push(d[f].i, d[f].j, d[f].j, d[f].k, d[f].k, d[f].i), d.splice(f, 1)));
				this.c(m);
				for (f = m.length; f;)k = m[--f],
					p = m[--f], d.push(this.a(a, p, k, g))
			}
			for (e = d.length; e--;)l.push(d[e]);
			d.length = 0;
			for (e = l.length; e--;)l[e].i < c && l[e].j < c && l[e].k < c && d.push(l[e].i, l[e].j, l[e].k);
			this.C = d
		}
	}

	var b = 1 / 1048576;
	c.prototype.g = function (a) {
		var b = Number.POSITIVE_INFINITY, c = Number.POSITIVE_INFINITY, f = Number.NEGATIVE_INFINITY, h = Number.NEGATIVE_INFINITY, d;
		for (d = a.length; d--;)a[d][0] < b && (b = a[d][0]), a[d][0] > f && (f = a[d][0]), a[d][1] < c && (c = a[d][1]), a[d][1] > h && (h = a[d][1]);
		a = f - b;
		f = h - c;
		h = Math.max(a, f);
		b += .5 * a;
		c += .5 * f;
		return [[b - 20 * h, c - h], [b,
			c + 20 * h], [b + 20 * h, c - h]]
	};
	c.prototype.a = function (a, c, e, f) {
		var h = a[c][0], d = a[c][1], l = a[e][0], m = a[e][1], p = a[f][0], k = a[f][1], g = Math.abs(d - m), x = Math.abs(m - k), n, t;
		if (g < b && x < b)throw Error("Points!");
		g < b ? (a = (l + h) / 2, g = -((p - l) / (k - m)) * (a - (l + p) / 2) + (m + k) / 2) : x < b ? (a = (p + l) / 2, g = -((l - h) / (m - d)) * (a - (h + l) / 2) + (d + m) / 2) : (n = -((l - h) / (m - d)), t = -((p - l) / (k - m)), h = (h + l) / 2, p = (l + p) / 2, d = (d + m) / 2, k = (m + k) / 2, a = (n * h - t * p + k - d) / (n - t), g = g > x ? n * (a - h) + d : t * (a - p) + k);
		l = l - a;
		m = m - g;
		return {i: c, j: e, k: f, x: a, y: g, r: l * l + m * m}
	};
	c.prototype.c = function (a) {
		var b,
			c, f, h, d, l;
		for (c = a.length; c;)for (h = a[--c], f = a[--c], b = c; b;)if (l = a[--b], d = a[--b], f === d && h === l || f === l && h === d) {
			a.splice(c, 2);
			a.splice(b, 2);
			break
		}
	};
	n.D = c
})(w || (w = {}));
function y(n) {
	return Array.apply(null, Array(Math.ceil(n.length / 3))).map(function (c, b) {
		return b
	}).map(function (c, b) {
		return n.slice(3 * b, 3 * b + 3)
	})
}
var z;
(function (n) {
	function c(d, b) {
		this.a = d;
		this.m = b;
		var a = 100 * Math.random();
		this.face = 50 < a ? 0 : 50 > a && 25 < a ? 1 : 25 > a ? 2 : void 0;
		this.b = this.u();
		this.K = this.g();
		this.P = this.o()
	}

	function b() {
	}

	function a() {
	}

	function r(d, a, b, f, k) {
		this.o = d;
		this.g = a;
		this.s = f;
		this.u = k;
		var g;
		k = this.g;
		for (g = Array(b); 0 <= b; b--)g[b] = [0 + Math.random() * d, k - Math.random() * a];
		g.push([0, k]);
		g.push([0 + d / 2, k]);
		g.push([0 + d, k]);
		g.push([0 + d, k - a / 2]);
		g.push([0 + d, k - a]);
		g.push([0 + d / 2, k - a]);
		g.push([0, k - a]);
		g.push([0, k - a / 2]);
		for (b = 6; 0 <= b; b--)g.push([0 + Math.random() *
		d, k]), g.push([0, k - Math.random() * a]), g.push([0 + d, k - Math.random() * a]), g.push([0 + Math.random() * d, k - a]);
		this.c = y((new w.D(g)).C).map(function (a) {
			var b = Array(a.length), b = a.map(function (a) {
				return new v.h([g[a][0], g[a][1], 0])
			});
			return new c(b, f)
		});
		e.call(this)
	}

	function e() {
		var a = this;
		this.a = new v.h([this.o / 2, this.g / 2, 1.2]);
		self.addEventListener("mousemove", function (b) {
			a.a.x = b.pageX;
			a.a.y = b.pageY
		})
	}

	function f(a) {
		this.l = new v.h(a)
	}

	function h(b, c, m, h) {
		function k() {
			e.a.I() && e.a.A();
			if (0 == n || n != e.b.offsetWidth +
				e.b.offsetHeight)n = e.b.offsetWidth + e.b.offsetHeight, g(), e.a.A();
			requestAnimationFrame(k)
		}

		function g() {
			e.g();
			e.a = new r(e.b.offsetWidth, e.b.offsetHeight, e.c, new f(m), new f(c));
			b.appendChild(a.a(e.a.c.map(function (a) {
				return a.b
			}), e.b.offsetWidth, e.b.offsetHeight))
		}

		var e = this;
		this.b = b;
		this.c = h;
		g();
		var n = 0;
		requestAnimationFrame(k)
	}

	h.prototype.g = function () {
		for (var a = this.b.childNodes.length - 1; 0 <= a; a--)this.b.removeChild(this.b.childNodes[a])
	};
	n.F = h;
	f.prototype.H = function (a, b, c) {
		var e = new v.h(this.l.f);
		return new f(e.add(a.l.O(b.l).N(c)).f.map(function (a) {
			return Math.ceil(a)
		}))
	};
	f.prototype.toString = function () {
		return "rgb(" + this.l.toString() + ")"
	};
	e.prototype.A = function () {
		for (var a = 0; a < this.c.length; a++) {
			var b = this.c[a], c;
			a:switch (c = b.P.M(this.a.v(b.K).normalize()), b.face) {
				case 1:
					c = .99 * Math.abs(Math.min(c, 0));
					break a;
				case 2:
					c = .89 * Math.max(Math.abs(c), 0);
					break a;
				default:
					c = .85 * Math.abs(c)
			}
			c = b.m.H(this.s, this.u, c);
			b.b.setAttributeNS(null, "style", "fill: " + c.toString() + "; stroke: " + c.toString() + ";")
		}
	};
	u(r, e);
	r.prototype.I = function () {
		return this.R != this.a.x + this.a.y ? (this.R = this.a.x + this.a.y, !0) : !1
	};
	a.prototype.s = function () {
		return document.createElementNS("http://www.w3.org/2000/svg", "polygon")
	};
	a.prototype.c = function (a, b) {
		Object.keys(b).forEach(function (c) {
			a.setAttributeNS(null, c, b[c])
		});
		return a
	};
	a.a = function (a, b, c) {
		var e = document.createElementNS("http://www.w3.org/2000/svg", "svg"), f = document.createElementNS("http://www.w3.org/2000/svg", "g");
		e.setAttributeNS(null, "viewBox", "0 0 " + b + " " + c);
		e.appendChild(f);
		a.forEach(function (a) {
			f.appendChild(a)
		});
		return e
	};
	u(b, a);
	b.a = a.a;
	b.prototype.u = function () {
		return this.c(this.s(), {
			"stroke-linejoin": "round", "stroke-miterlimit": "1", "stroke-width": "1", points: this.a.map(function (a) {
				return a.x + " " + a.y
			}).join(" "), style: "fill: " + this.m.toString() + "; stroke: " + this.m.toString() + ";"
		})
	};
	u(c, b);
	c.a = b.a;
	c.prototype.g = function () {
		return (new v.h([this.a.map(function (a) {
			return a.x
		}).reduce(function (a, b) {
			return a + b
		}), this.a.map(function (a) {
			return a.y
		}).reduce(function (a, b) {
			return a +
				b
		}), this.a.map(function (a) {
			return a.z
		}).reduce(function (a, b) {
			return a + b
		})])).B(3)
	};
	c.prototype.o = function () {
		return this.w.v(this.G).L(this.w.v(this.J)).normalize()
	};
	Object.defineProperties(c.prototype, {
		w: {
			configurable: !0, enumerable: !0, get: function () {
				return this.a[0]
			}
		}, G: {
			configurable: !0, enumerable: !0, get: function () {
				return this.a[1]
			}
		}, J: {
			configurable: !0, enumerable: !0, get: function () {
				return this.a[2]
			}
		}
	})
})(z || (z = {}));
new z.F(document.getElementById("vandal"), [86, 200, 148], [25, 52, 65], 250);
