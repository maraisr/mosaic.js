namespace Vector {
	export class Three {
        xyz:Array<number>;

        constructor(xyz:Array<number> = [0, 0, 0]) {
			this.xyz = xyz;
		}

        set x(v:number) {
			this.xyz[0] = v;
		}

        set y(v:number) {
			this.xyz[1] = v;
		}

        set z(v:number) {
			this.xyz[2] = v;
		}

        get x():number {
			return this.xyz[0];
		}

        get y():number {
			return this.xyz[1];
		}

        get z():number {
			return this.xyz[2];
		}

        toString():string {
			return this.xyz.join(', ');
		}

        add(b:Three):Three {
			return new Three([this.x + b.x, this.y + b.y, this.z + b.z]);
		}

        subtract(b:Three):Three {
			return new Three([this.x - b.x, this.y - b.y, this.z - b.z]);
		}

        divideScalar(s:number):Three {
            var r:Three = new Three();

			r.x = ((this.x == 0) ? 0 : (this.x / s));
			r.y = ((this.y == 0) ? 0 : (this.y / s));
			r.z = ((this.z == 0) ? 0 : (this.z / s));

			return r;
		}

        multiplyScalar(s:number):Three {
            var r:Three = new Three();

			r.x = ((this.x == 0) ? 0 : (this.x * s));
			r.y = ((this.y == 0) ? 0 : (this.y * s));
			r.z = ((this.z == 0) ? 0 : (this.z * s));

			return r;
		}

        multiplyVectors(b:Three):Three {
            var r:Three = new Three();

			r.x = this.x * b.x;
			r.y = this.y * b.y;
			r.z = this.z * b.z;

			return r;
		}

        divideVectors(b:Three):Three {
            var r:Three = new Three();

			r.x = this.x / b.x;
			r.y = this.y / b.y;
			r.z = this.z / b.z;

			return r;
		}

        cross(b:Three):Three {
            var r:Three = new Three();

			r.x = this.y * b.z - this.z * b.y;
			r.y = this.z * b.x - this.x * b.z;
			r.z = this.x * b.y - this.y * b.x

			return r;
		}

        lengthSquared():number {
			return this.x * this.x + this.y * this.y + this.z * this.z;
		}

        length():number {
			return Math.sqrt(this.lengthSquared());
		}

        normalize():Three {
			return this.divideScalar(this.length());
		}

        distanceSquared(b:Three):number {
            var dx:number = this.x - b.x;
            var dy:number = this.y - b.y;
            var dz:number = this.z - b.z;

			return dx * dx + dy * dy + dz * dz;
		}

        distance(b:Three):number {
			return Math.sqrt(this.distanceSquared(b));
		}

        dot(b:Three):number {
			return this.x * b.x + this.y * b.y + this.z * b.z;
		}

        min(b:Three):Three {
            var r:Three = new Three();

			r.x = (this.x < b.x) ? this.x : b.x;
			r.y = (this.y < b.y) ? this.y : b.y;
			r.z = (this.z < b.z) ? this.z : b.z;

			return r;
		}

        max(b:Three):Three {
            var r:Three = new Three();

			r.x = (this.x > b.x) ? this.x : b.x;
			r.y = (this.y > b.y) ? this.y : b.y;
			r.z = (this.z > b.z) ? this.z : b.z;

			return r;
		}

        is(b:Three):boolean {
            return (this.x == b.x && this.y == b.y && this.z == b.z);
        }

        copy():Three {
            var r:Three = new Three();

            r.x = this.x;
            r.y = this.y;
            r.z = this.z;

            return r;
        }
	}
}
