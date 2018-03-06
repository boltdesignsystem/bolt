const Transpiler = require('./Transpiler');

const transpiler = new Transpiler();


import twigTemplate from 'raw-loader!./test.twig';

const converted_str = transpiler.toJSX(twigTemplate);

console.log(twigTemplate);
console.log(converted_str);