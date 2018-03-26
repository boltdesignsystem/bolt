const _ = require('lodash');

const Mapper = require('./Mapper.js');
const Replace = require('./Actions/Replace.js');

class Transpiler {
    constructor() {
        this.mapper = new Mapper();
    }

    toJSX(data) {
        let output_str = '';
        let buffer = '';
        let current_open_tag = false;

        for(let x = 0; x < data.length; x++) {
            for(let y = 0; y < data[x].length; y++) {
                buffer = buffer !== '' ? buffer + data[x][y] : data[x][y];
                const mapped = this.map(buffer, current_open_tag);
                if(!mapped) {
                    if(x === data.length-1 && y === data[x].length-1) {
                        output_str += buffer;
                    }
                    continue;
                }
                else {
                    if(mapped.open_tag) {
                        current_open_tag = mapped.open_tag === '[RESET]' ? false : mapped.open_tag;
                    }

                    output_str += buffer.replace(mapped.original, mapped.new);
                    buffer = '';
                }
            }
        }
        return output_str;
    }

    map(key, current_open_tag) {
        let mapped = false;
        let mappee = '';

        if(this.mapper.map(key)) {
            // Direct match
            return this.doAction(key, current_open_tag);
        }
        else {
            // Entire string does not match but maybe part of it will, let's search
            let found = false;
            _.forEach(this.mapper.iterator(), iterator_key => {
                for(let x = 0; x < key.length; x++) {
                    if(key.substr(x) === iterator_key) {
                        mapped = true;
                        mappee = key.substr(x);
                        found = true;
                        break;
                    }
                }
                if(found) {
                    return false;
                }
            });
            if(mapped) {
                return this.doAction(mappee, current_open_tag);
            }
        }
        return false; 
    }

    doAction(key, current_open_tag) {
        switch(this.mapper.map(key).action) {
            case 'REPLACE':
                return this.doReplace(key, current_open_tag);
        }
    }

    doReplace(key, current_open_tag) {
        return new Replace(key, this.mapper.map(key), current_open_tag);
    }
}

module.exports = Transpiler;
