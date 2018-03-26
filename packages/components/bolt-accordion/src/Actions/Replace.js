class Replace {
	constructor(mappee, mapper, current_tag) {
		this.original = mappee;
		this.new = mapper.args[0];
		this.open_tag = current_tag || false;

		if(mapper.opening_tag) {
			this.open_tag = mapper.opening_tag;
		}

		switch(this.new) {
			case '[CLOSE_TAG]':
				if(this.open_tag) {
					switch(this.open_tag) {
						case 'if':
							this.new = '}>';
							break;
						case 'include':
							this.new = '*/}'
							break;
						case 'onclick':
							this.new = '}';
							break;
						default:
							this.new = '>';
							break;
					}
					this.open_tag = '[RESET]';
				}
				else {
					this.new = this.original;
					this.open_tag = '[RESET]';
				}
				break;
			default:
				break
		}
	}

	
}

module.exports = Replace;
