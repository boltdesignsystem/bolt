declare const isArray: (arg: any) => arg is any[];
/**
 * Convert a JS object to SASS
 * Credits to https://github.com/acdlite/json-sass
 * @example {color: 'red'} -> (color: red)
 * @param jsValue
 */
declare function JSToSASS(jsValue: any): any;
declare function indentsToSpaces(indentCount: number): string;
declare function isObject(value: any): boolean;
declare function isNull(value: any): boolean;
declare function isNotUndefined(value: any): boolean;
