// Modified version of https://github.com/developit/preact-markup/blob/master/src/index.js to allow rendering without a wrapper
/* eslint-disable */
import { Fragment, h as defaultReviver, Component } from 'preact';
import markupToVdom from 'preact-markup/src/markup-to-vdom';

let customReviver;

export default class Markup extends Component {
	static setReviver(h) {
		customReviver = h;
	}

	shouldComponentUpdate({ wrap, type, markup }) {
		let p = this.props;
		return wrap!==p.wrap || type!==p.type || markup!==p.markup;
	}

	setComponents(components) {
		this.map = {};
		if (components) {
			for (let i in components) {
				// eslint-disable-next-line no-prototype-builtins
				if (components.hasOwnProperty(i)) {
					let name = i.replace(/([A-Z]+)([A-Z][a-z0-9])|([a-z0-9]+)([A-Z])/g, '$1$3-$2$4').toLowerCase();
					this.map[name] = components[i];
				}
			}
		}
	}

	render({ wrap=true, type, markup, components, reviver, onError, 'allow-scripts':allowScripts, 'allow-events':allowEvents, trim, ...props }) {
		let h = reviver || this.reviver || this.constructor.prototype.reviver || customReviver || defaultReviver,
			vdom;

		this.setComponents(components);

		let options = {
			allowScripts,
			allowEvents,
			trim
		};

		try {
			vdom = markupToVdom(markup, type, h, this.map, options);
		} catch (error) {
			if (onError) {
				onError({ error });
			}
			else if (typeof console!=='undefined' && console.error) {
				console.error(`preact-markup: ${error}`);
			}
		}

		if (wrap===false) return vdom && vdom[0] || null;

		// eslint-disable-next-line no-prototype-builtins
		let c = props.hasOwnProperty('className') ? 'className' : 'class',
			cl = props[c];
		if (!cl) props[c] = 'markup';
		else if (cl.splice) cl.splice(0, 0, 'markup');
		else if (typeof cl==='string') props[c] += ' markup';
    else if (typeof cl==='object') cl.markup = true;

    return (
      <>{vdom}</>
    )
	}
}