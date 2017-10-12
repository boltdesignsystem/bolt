/*! Built with http://stenciljs.com */
App.loadComponents(

/**** module id (dev mode) ****/
"my-name",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var MyName = /** @class */ (function () {
    function MyName() {
    }
    MyName.prototype.render = function () {
        return (h("div", null,
            "Hello, my name is ",
            this.first,
            " ",
            this.last));
    };
    return MyName;
}());

exports['MY-NAME'] = MyName;
},


/***************** my-name *****************/
[
/** my-name: tag **/
"MY-NAME",

/** my-name: members **/
[
  [ "first", /** prop **/ 1, /** type string **/ 1 ],
  [ "last", /** prop **/ 1, /** type string **/ 1 ]
],

/** my-name: host **/
{}

]
)