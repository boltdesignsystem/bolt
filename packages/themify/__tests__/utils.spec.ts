import {_handleUnSupportedBrowsers, _generateNewVariables} from '../src/utils';
import palette from './palettes/palette';

const whitelabel = {
  "dark": {
    "primary-100": "#c333d3",
    "primary-200": "#c333d3"
  },
  "light": {
    "accent-300": "#ff0000"
  }
}

const whitelabelOnlyDark = {
  "dark": {
    "primary-100": "#c333d3",
    "primary-200": "#c333d3"
  }
}

const fallbackJSON = {
  "dark": ".dark button {color: %[dark, primary-100, 1]%;background-color: %[dark, primary-200, 0.5]%;border: 1px solid %[dark, primary-300, 0.5]%}.dark h1 {color: %[dark, accent-300, 1]%;background: linear-gradient(to right, %[dark, primary-100, 1]%, %[dark, accent-100, 1]%)}.dark p {color: %[dark, primary-100, 1]%}",
  "light": "button {color: %[light, primary-100, 1]%;background-color: %[light, primary-200, 0.5]%;border: 1px solid %[light, primary-300, 0.5]%;}h1 {color: %[light, accent-300, 1]%;background: linear-gradient(to right, %[light, primary-100, 1]%, %[light, accent-100, 1]%);}p {color: %[light, accent-300, 1]%;}"
};

describe('Utils', () => {

  describe('Supported Browsers', () => {
    it('should generate the correct scheme', () => {
      const output = `.dark{--primary-100: 195,51,211;--primary-200: 195,51,211;}:root{--accent-300: 255,0,0;}`;
      expect(_generateNewVariables(whitelabel)).toEqual(output);
    });

    it('should work with one variation', () => {
      const output = `.dark{--primary-100: 195,51,211;--primary-200: 195,51,211;}`;
      expect(_generateNewVariables(whitelabelOnlyDark)).toEqual(output);
    });
  });

  describe('UnSupported Browsers', () => {
    it('should generate the correct scheme', () => {
      const output = ".darkbutton{color:rgba(195,51,211,1);background-color:rgba(195,51,211,0.5);border:1pxsolidrgba(156,160,160,0.5)}.darkh1{color:rgba(4,162,214,1);background:linear-gradient(toright,rgba(195,51,211,1),rgba(9,103,150,1))}.darkp{color:rgba(195,51,211,1)}button{color:rgba(242,242,244,1);background-color:rgba(204,206,206,0.5);border:1pxsolidrgba(156,160,160,0.5);}h1{color:rgba(255,0,0,1);background:linear-gradient(toright,rgba(242,242,244,1),rgba(230,249,252,1));}p{color:rgba(255,0,0,1);}"
      expect(_handleUnSupportedBrowsers(whitelabel, palette, fallbackJSON).replace(/\s/g, '')).toEqual(output.replace(/\s/g, ''));
    });
  });

});