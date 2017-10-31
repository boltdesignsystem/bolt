/*! Built with http://stenciljs.com */
App.loadComponents(

/**** module id (dev mode) ****/
"bolt-h2",

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

var BoltH2 = /** @class */ (function () {
    function BoltH2() {
    }
    BoltH2.prototype.render = function () {
        // const Tag = getTag(this.tag);
        // const headlineSize = cssClassForSize(this.size, "c-bolt-headline--");
        // console.log(Tag);
        var className = css("c-bolt-headline", "c-bolt-headline--xxlarge"
        // this.col ? "c-bolt-cell--" + this.col : "",
        // this.colMd ? "c-bolt-cell--" + this.colMd + "@md" : ""
        );
        return (h("h2", { class: className },
            h("slot", null)));
    };
    return BoltH2;
}());

exports['BOLT-H2'] = BoltH2;
},


/***************** bolt-h2 *****************/
[
/** bolt-h2: tag **/
"BOLT-H2",

/** bolt-h2: members **/
[
  [ "size", /** prop **/ 1 ],
  [ "tag", /** prop **/ 1 ]
],

/** bolt-h2: host **/
{}

]
)