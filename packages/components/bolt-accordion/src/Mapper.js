class Mapper {
	constructor() {
		this.maps = {
			'{% if': this._action('REPLACE', ['<If condition={'], 'if'),
			'{% else %}': this._action('REPLACE', ['<Else />']),
			'app.': this._action('REPLACE', [' $.app.']),
			'==': this._action('REPLACE', ['===']),
			'{% endif %}': this._action('REPLACE', ['</If>']),
			'class=': this._action('REPLACE', ['className=']),
			'onclick': this._action('REPLACE', ['onClick']),
			// 'onclick=': this._action('REPLACE_FROM_CURSOR', ['onClick', 8, '{'], 'onclick')
			' not ': this._action('REPLACE', ['!']),
			' and ': this._action('REPLACE', [' && ']),
			' or ': this._action('REPLACE', [' || ']),
			'{#': this._action('REPLACE', ['{/*']),
			'#}': this._action('REPLACE', ['*/}']),
			'{{ ': this._action('REPLACE', ['{']),
			' }}': this._action('REPLACE', ['}']),
			'|join': this._action('REPLACE', ['.join']),
			'%}': this._action('REPLACE', ['[CLOSE_TAG]']),
			'for=': this._action('REPLACE', ['htmlFor=']),
			'{% include': this._action('REPLACE', ['{/* include template :'], 'include')
		}
	}

	map(key) {
		return this.maps[key];
	}

	iterator() {
		return Object.keys(this.maps);
	}

	_action(action, args = [], opening_tag = false) {
		return {
			action,
			args,
			opening_tag
		};
	}
}

module.exports = Mapper;
