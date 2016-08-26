(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.mosaic = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Vector;
(function (Vector) {
    var Three = function () {
        function Three() {
            var xyz = arguments.length <= 0 || arguments[0] === undefined ? [0, 0, 0] : arguments[0];
            classCallCheck(this, Three);

            this.xyz = xyz;
        }

        createClass(Three, [{
            key: 'toString',
            value: function toString() {
                return this.xyz.join(', ');
            }
        }, {
            key: 'add',
            value: function add(b) {
                return new Three([this.x + b.x, this.y + b.y, this.z + b.z]);
            }
        }, {
            key: 'subtract',
            value: function subtract(b) {
                return new Three([this.x - b.x, this.y - b.y, this.z - b.z]);
            }
        }, {
            key: 'divideScalar',
            value: function divideScalar(s) {
                var r = new Three();
                r.x = this.x == 0 ? 0 : this.x / s;
                r.y = this.y == 0 ? 0 : this.y / s;
                r.z = this.z == 0 ? 0 : this.z / s;
                return r;
            }
        }, {
            key: 'multiplyScalar',
            value: function multiplyScalar(s) {
                var r = new Three();
                r.x = this.x == 0 ? 0 : this.x * s;
                r.y = this.y == 0 ? 0 : this.y * s;
                r.z = this.z == 0 ? 0 : this.z * s;
                return r;
            }
        }, {
            key: 'multiplyVectors',
            value: function multiplyVectors(b) {
                var r = new Three();
                r.x = this.x * b.x;
                r.y = this.y * b.y;
                r.z = this.z * b.z;
                return r;
            }
        }, {
            key: 'divideVectors',
            value: function divideVectors(b) {
                var r = new Three();
                r.x = this.x / b.x;
                r.y = this.y / b.y;
                r.z = this.z / b.z;
                return r;
            }
        }, {
            key: 'cross',
            value: function cross(b) {
                var r = new Three();
                r.x = this.y * b.z - this.z * b.y;
                r.y = this.z * b.x - this.x * b.z;
                r.z = this.x * b.y - this.y * b.x;
                return r;
            }
        }, {
            key: 'lengthSquared',
            value: function lengthSquared() {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            }
        }, {
            key: 'length',
            value: function length() {
                return Math.sqrt(this.lengthSquared());
            }
        }, {
            key: 'normalize',
            value: function normalize() {
                return this.divideScalar(this.length());
            }
        }, {
            key: 'distanceSquared',
            value: function distanceSquared(b) {
                var dx = this.x - b.x;
                var dy = this.y - b.y;
                var dz = this.z - b.z;
                return dx * dx + dy * dy + dz * dz;
            }
        }, {
            key: 'distance',
            value: function distance(b) {
                return Math.sqrt(this.distanceSquared(b));
            }
        }, {
            key: 'dot',
            value: function dot(b) {
                return this.x * b.x + this.y * b.y + this.z * b.z;
            }
        }, {
            key: 'min',
            value: function min(b) {
                var r = new Three();
                r.x = this.x < b.x ? this.x : b.x;
                r.y = this.y < b.y ? this.y : b.y;
                r.z = this.z < b.z ? this.z : b.z;
                return r;
            }
        }, {
            key: 'max',
            value: function max(b) {
                var r = new Three();
                r.x = this.x > b.x ? this.x : b.x;
                r.y = this.y > b.y ? this.y : b.y;
                r.z = this.z > b.z ? this.z : b.z;
                return r;
            }
        }, {
            key: 'eq',
            value: function eq(b) {
                return this.x == b.x && this.y == b.y && this.z == b.z;
            }
        }, {
            key: 'copy',
            value: function copy() {
                var r = new Three();
                r.x = this.x;
                r.y = this.y;
                r.z = this.z;
                return r;
            }
        }, {
            key: 'x',
            set: function set(v) {
                this.xyz[0] = v;
            },
            get: function get() {
                return this.xyz[0];
            }
        }, {
            key: 'y',
            set: function set(v) {
                this.xyz[1] = v;
            },
            get: function get() {
                return this.xyz[1];
            }
        }, {
            key: 'z',
            set: function set(v) {
                this.xyz[2] = v;
            },
            get: function get() {
                return this.xyz[2];
            }
        }]);
        return Three;
    }();

    Vector.Three = Three;
})(Vector || (Vector = {}));

var Colour = function () {
    function Colour(rgb) {
        classCallCheck(this, Colour);

        this.rgb = new Vector.Three(rgb);
    }

    createClass(Colour, [{
        key: 'blend',
        value: function blend(d, a, lum) {
            var r = new Vector.Three(this.rgb.xyz);
            return new Colour(r.add(d.rgb.multiplyVectors(a.rgb).multiplyScalar(lum)).xyz.map(function (v) {
                return Math.ceil(v);
            }));
        }
    }, {
        key: 'shade',
        value: function shade(percent) {
            var f = this.rgb.xyz,
                t = percent < 0 ? 0 : 255,
                p = percent < 0 ? percent * -1 : percent,
                R = f[0],
                G = f[1],
                B = f[2];
            return new Colour([Math.round((t - R) * p) + R, Math.round((t - G) * p) + G, Math.round((t - B) * p) + B]);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return 'rgb(' + this.rgb.toString() + ')';
        }
    }]);
    return Colour;
}();

var Generators;
(function (Generators) {
    var EPSILON = 1.0 / 1048576.0;

    var Delaunay = function () {
        function Delaunay(vertices) {
            classCallCheck(this, Delaunay);

            var n = vertices.length,
                i,
                j,
                indices,
                st,
                open,
                closed,
                edges,
                dx,
                dy,
                a,
                b,
                c;
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
                    edges.push(open[j].i, open[j].j, open[j].j, open[j].k, open[j].k, open[j].i);
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

        createClass(Delaunay, [{
            key: "sTriangle",
            value: function sTriangle(v) {
                var xmin = Number.POSITIVE_INFINITY,
                    ymin = Number.POSITIVE_INFINITY,
                    xmax = Number.NEGATIVE_INFINITY,
                    ymax = Number.NEGATIVE_INFINITY,
                    i,
                    dx,
                    dy,
                    dmax,
                    xmid,
                    ymid;
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
                return [[xmid - 20 * dmax, ymid - dmax], [xmid, ymid + 20 * dmax], [xmid + 20 * dmax, ymid - dmax]];
            }
        }, {
            key: "cCircle",
            value: function cCircle(v, i, j, k) {
                var x1 = v[i][0],
                    y1 = v[i][1],
                    x2 = v[j][0],
                    y2 = v[j][1],
                    x3 = v[k][0],
                    y3 = v[k][1],
                    fabsy1y2 = Math.abs(y1 - y2),
                    fabsy2y3 = Math.abs(y2 - y3),
                    xc,
                    yc,
                    m1,
                    m2,
                    mx1,
                    mx2,
                    my1,
                    my2,
                    dx,
                    dy;
                if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON) throw new Error("Points!");
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
                    yc = fabsy1y2 > fabsy2y3 ? m1 * (xc - mx1) + my1 : m2 * (xc - mx2) + my2;
                }
                dx = x2 - xc;
                dy = y2 - yc;
                return { i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy };
            }
        }, {
            key: "deDup",
            value: function deDup(e) {
                var i, j, a, b, m, n;
                for (j = e.length; j;) {
                    b = e[--j];
                    a = e[--j];
                    for (i = j; i;) {
                        n = e[--i];
                        m = e[--i];
                        if (a === m && b === n || a === n && b === m) {
                            e.splice(j, 2);
                            e.splice(i, 2);
                            break;
                        }
                    }
                }
            }
        }]);
        return Delaunay;
    }();

    Generators.Delaunay = Delaunay;
})(Generators || (Generators = {}));

var SVG = function () {
    function SVG() {
        classCallCheck(this, SVG);
    }

    createClass(SVG, [{
        key: 'elm',
        value: function elm(type) {
            return document.createElementNS('http://www.w3.org/2000/svg', type);
        }
    }, {
        key: 'attr',
        value: function attr(el, a) {
            Object.keys(a).forEach(function (k) {
                el.setAttributeNS(null, k, a[k]);
            });
            return el;
        }
    }], [{
        key: 'out',
        value: function out(items, width, height) {
            var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
                g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            s.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
            s.appendChild(g);
            items.forEach(function (v) {
                g.appendChild(v);
            });
            return s;
        }
    }]);
    return SVG;
}();

var Polygon = function (_SVG) {
    inherits(Polygon, _SVG);

    function Polygon() {
        classCallCheck(this, Polygon);
        return possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).apply(this, arguments));
    }

    createClass(Polygon, [{
        key: 'render',
        value: function render() {
            var t = this.attr(this.elm('polygon'), {
                'stroke-linejoin': 'round',
                'stroke-miterlimit': '1',
                'stroke-width': '1',
                'points': this.points.map(function (v) {
                    return v.x + ' ' + v.y;
                }).join(' '),
                'style': 'fill:' + this.colour.toString() + '; stroke:' + this.colour.toString() + ';'
            });
            return t;
        }
    }]);
    return Polygon;
}(SVG);

var Triangle = function (_Polygon) {
    inherits(Triangle, _Polygon);

    function Triangle(v, colour) {
        classCallCheck(this, Triangle);

        var _this2 = possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this));

        _this2.points = v;
        _this2.colour = colour;
        _this2.face = function (n) {
            if (n > 50) {
                return 0;
            }
            if (n < 50 && n > 25) {
                return 1;
            }
            if (n < 25) {
                return 2;
            }
        }(Math.random() * 100);
        _this2.el = _this2.render();
        _this2.centroid = _this2.calcCentroid();
        _this2.normal = _this2.calcNormal();
        return _this2;
    }

    createClass(Triangle, [{
        key: 'calcCentroid',
        value: function calcCentroid() {
            var r = new Vector.Three([this.points.map(function (v) {
                return v.x;
            }).reduce(function (a, b) {
                return a + b;
            }), this.points.map(function (v) {
                return v.y;
            }).reduce(function (a, b) {
                return a + b;
            }), this.points.map(function (v) {
                return v.z;
            }).reduce(function (a, b) {
                return a + b;
            })]);
            return r.divideScalar(3);
        }
    }, {
        key: 'calcNormal',
        value: function calcNormal() {
            return this.a.subtract(this.b).cross(this.a.subtract(this.c)).normalize();
        }
    }, {
        key: 'a',
        get: function get() {
            return this.points[0];
        }
    }, {
        key: 'b',
        get: function get() {
            return this.points[1];
        }
    }, {
        key: 'c',
        get: function get() {
            return this.points[2];
        }
    }]);
    return Triangle;
}(Polygon);

Array.prototype.chunk = function (n) {
    var _this = this;

    return Array.apply(null, Array(Math.ceil(this.length / n))).map(function (x, i) {
        return i;
    }).map(function (x, i) {
        return _this.slice(i * n, i * n + n);
    });
};

var Mosaic = function () {
    function Mosaic(el, diffuse, ambient, count) {
        var _this2 = this;

        classCallCheck(this, Mosaic);

        this.el = el;
        this.count = count;
        var run = function run() {
            _this2.clear();
            _this2.mesh = new Mesh(_this2.el.offsetWidth, _this2.el.offsetHeight, _this2.count, new Colour(ambient), new Colour(diffuse));
            el.appendChild(SVG.out(_this2.mesh.polygons.map(function (v) {
                return v.el;
            }), _this2.el.offsetWidth, _this2.el.offsetHeight));
        };
        run();
        var screenWH = 0;
        var render = function render() {
            if (_this2.mesh.blendNow()) {
                _this2.mesh.blendLights();
            }
            if (screenWH == 0 || screenWH != _this2.el.offsetWidth + _this2.el.offsetHeight) {
                screenWH = _this2.el.offsetWidth + _this2.el.offsetHeight;
                run();
                _this2.mesh.blendLights();
            }
            requestAnimationFrame(render);
        };
        render();
    }

    createClass(Mosaic, [{
        key: 'clear',
        value: function clear() {
            for (var i = this.el.childNodes.length - 1; i >= 0; i--) {
                this.el.removeChild(this.el.childNodes[i]);
            }
        }
    }]);
    return Mosaic;
}();

var Light = function () {
    function Light(ray) {
        var _this3 = this;

        classCallCheck(this, Light);

        this.ray = ray;
        this.ray = ray;
        self.addEventListener('mousemove', function (e) {
            _this3.ray.x = e.pageX;
            _this3.ray.y = e.pageY;
        });
    }

    createClass(Light, [{
        key: 'blendLights',
        value: function blendLights() {
            for (var i = 0; i < this.polygons.length; i++) {
                var item = this.polygons[i],
                    ill = function (n) {
                    switch (item.face) {
                        case 1:
                            return Math.abs(Math.min(n, 0)) * 0.99;
                        case 2:
                            return Math.max(Math.abs(n), 0) * 0.89;
                        default:
                            return Math.abs(n) * 0.85;
                    }
                }(item.normal.dot(this.ray.subtract(item.centroid).normalize()));
                var c = item.colour.blend(this.ambient, this.diffuse, ill);
                item.el.setAttributeNS(null, 'style', 'fill: ' + c.toString() + '; stroke: ' + c.toString() + ';');
            }
        }
    }]);
    return Light;
}();

var Mesh = function (_Light) {
    inherits(Mesh, _Light);

    function Mesh(width, height, slices, ambient, diffuse) {
        classCallCheck(this, Mesh);

        var _this4 = possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this, new Vector.Three([width / 2, height / 2, 1.2])));

        _this4.width = width;
        _this4.height = height;
        _this4.slices = slices;
        _this4.ambient = ambient;
        _this4.diffuse = diffuse;
        var i,
            x,
            y,
            vertices,
            offsetX = 0,
            offsetY = _this4.height;
        vertices = new Array(slices);
        for (i = slices; i >= 0; i--) {
            vertices[i] = [offsetX + Math.random() * width, offsetY - Math.random() * height];
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
        _this4.polygons = new Generators.Delaunay(vertices).triangles.chunk(3).map(function (v) {
            var a = new Array(v.length);
            a = v.map(function (i) {
                var t = new Vector.Three([vertices[i][0], vertices[i][1], 0]);
                return t;
            });
            return new Triangle(a, ambient);
        });
        return _this4;
    }

    createClass(Mesh, [{
        key: 'blendNow',
        value: function blendNow() {
            if (this.mouseXY != this.ray.x + this.ray.y) {
                this.mouseXY = this.ray.x + this.ray.y;
                return true;
            }
            return false;
        }
    }]);
    return Mesh;
}(Light);

return Mosaic;

})));