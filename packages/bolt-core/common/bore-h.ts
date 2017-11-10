/**
 * @deprecated
 */
export function h( name: any, attrs: { [ key: string ]: any }, ...chren: any[] ) {
  const node = typeof name === 'function' ? handleFunction( name ) : document.createElement( name );
  Object.keys( attrs || [] ).forEach(( attrName: string ) =>
    shouldBeAttr( attrName, attrs[ attrName ] )
      ? ( attr( node, attrName, attrs[ attrName ] ) )
      : ( node[ attrName ] = attrs[ attrName ] )
  );
  chren.forEach(( child ) => node.appendChild( child instanceof Node ? child : document.createTextNode( child ) ) );

  return node;
}

function startsWith( key: string, val: string ) {
  return key.indexOf( val ) === 0;
}
function shouldBeAttr( key: string, val: string ) {
  return startsWith( key, 'aria-' ) || startsWith( key, 'data-' ) || isAttribute( key );
}
function isAttribute( key: string ) {
  return key === 'attributes';
}

function handleFunction( Fn: any ) {
  return Fn.prototype instanceof HTMLElement ? new Fn() : Fn();
}

// JQuery like attr
function attr( node: any, attrName: string, attrValue: any ): void {
  if ( isAttribute( attrName ) ) {
    Object.keys( attrValue ).forEach(( key ) => {
      node.setAttribute( key, attrValue[ key ] );
    } );

    return;
  }
  node.setAttribute( attrName, attrValue );
}
