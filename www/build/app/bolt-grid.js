/*! Built with http://stenciljs.com */
App.loadComponents(

/**** module id (dev mode) ****/
"bolt-grid",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var BoltGrid = /** @class */ (function () {
    function BoltGrid() {
    }
    // @Prop() last: string;
    BoltGrid.prototype.render = function () {
        return (h("div", { class: this.center ? "c-bolt-grid--center" : "no-center" },
            h("slot", null)));
    };
    return BoltGrid;
}());

exports['BOLT-GRID'] = BoltGrid;
},


/***************** bolt-grid *****************/
[
/** bolt-grid: tag **/
"BOLT-GRID",

/** bolt-grid: members **/
[
  [ "center", /** prop **/ 1, /** type boolean **/ 2 ]
],

/** bolt-grid: host **/
{}

]
)