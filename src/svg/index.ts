export default class SVG {
	elm(type: string): Element {
		return document.createElementNS('http://www.w3.org/2000/svg', type);
	}

	attr(el: Element, a: any): Element {
		Object.keys(a).forEach((k: string) => {
			el.setAttributeNS(null, k, a[k]);
		});

		return el;
	}

	static out(items: Array<Element>, width: number, height: number): Element {
		var s: Element = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			g: Element = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		s.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
		s.appendChild(g);

		items.forEach((v: Element) => {
			g.appendChild(v);
		});

		return s;
	}
}
