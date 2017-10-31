/*! Built with http://stenciljs.com */
App.loadComponents(

/**** module id (dev mode) ****/
"bolt-headline",

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

var Sizes = {
    xsmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xlarge: 'xlarge',
    super: 'super'
};
function cssClassForSize(size, prefix) {
    return Sizes.hasOwnProperty(size) ? "" + prefix + size : null;
}

var Tags = [
    'div', 'a', 'button', 'h1', 'h2', 'h3', 'h4'
    // small: 'small',
    // medium: 'medium',
    // large: 'large',
    // xlarge: 'xlarge',
    // super: 'super'
];
function getTag(tag) {
    return Tags.includes(tag) ? "" + tag : 'p';
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

var BoltHeadline = /** @class */ (function () {
    function BoltHeadline() {
    }
    BoltHeadline.prototype.render = function () {
        var Tag = getTag(this.tag);
        var headlineSize = cssClassForSize(this.size, "c-bolt-headline--");
        // console.log(Tag);
        var className = css("c-bolt-headline", headlineSize
        // this.col ? "c-bolt-cell--" + this.col : "",
        // this.colMd ? "c-bolt-cell--" + this.colMd + "@md" : ""
        );
        return (h(Tag, { class: className },
            h("slot", null)));
    };
    return BoltHeadline;
}());

exports['BOLT-HEADLINE'] = BoltHeadline;
},


/***************** bolt-headline *****************/
[
/** bolt-headline: tag **/
"BOLT-HEADLINE",

/** bolt-headline: members **/
[
  [ "size", /** prop **/ 1 ],
  [ "tag", /** prop **/ 1 ]
],

/** bolt-headline: host **/
{}

]
)