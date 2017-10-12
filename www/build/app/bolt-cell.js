/*! Built with http://stenciljs.com */
App.loadComponents(

/**** module id (dev mode) ****/
"bolt-cell",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
function css() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var classes = [];
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        if (arg) {
            if (typeof arg === 'string') {
                classes.push(arg);
            }
            else {
                for (var key in arg) {
                    if (arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
    }
    return classes.join(' ');
}

// import * as GenericEvents from './static-definitions/events';
// import * as GenericTypes from './static-definitions/types';
// import './css';
// import './sizes';
// export { GenericEvents, GenericTypes };
// export * from './colorTypes';

// export * from './bore-h';
// export * from './buildFormatLocale';
// export * from './mixins';
// export * from './decorators';
// export * from './match-media';

var BoltCell = /** @class */ (function () {
    function BoltCell() {
    }
    BoltCell.prototype.render = function () {
        var className = css("c-bolt-cell", this.col ? "c-bolt-cell--" + this.col : "", this.colMd ? "c-bolt-cell--" + this.colMd + "@md" : "");
        return (h("div", { class: className },
            h("slot", null)));
    };
    return BoltCell;
}());

exports['BOLT-CELL'] = BoltCell;
},


/***************** bolt-cell *****************/
[
/** bolt-cell: tag **/
"BOLT-CELL",

/** bolt-cell: members **/
[
  [ "col", /** prop **/ 1, /** type string **/ 1 ],
  [ "colMd", /** prop **/ 1, /** type string **/ 1 ]
],

/** bolt-cell: host **/
{}

]
)