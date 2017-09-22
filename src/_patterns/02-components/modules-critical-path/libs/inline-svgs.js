/* eslint-disable */
var Meta = require('./get-meta'),
  // svgLocalstorage = require('svg-localstorage'),
  svgRevision = require('../libs/inline_pl_svg_rev.js').revision;

  // require('es6-promise').polyfill();
  // Promise = require('promise/lib/es6-extensions');

//Set default icon path.
var iconPath = '/styleguide/images/icons/pl-icons.svg',
    iconPathOverride;

//Check if an override to the default icon path is available.
if (Meta.get('iconPath')){
  iconPathOverride = Meta.get('iconPath').content;
}

//If the path override Meta tag exists, use that as our #1 preference.
if (iconPathOverride !== undefined) {
  iconPath = iconPathOverride;
}



// A part of the fallback for browsers that do not support SVG
if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ){
	document.createElement( 'svg' );
	document.createElement( 'use' );
}


// Storing SVG Sprite in localStorage
  ;( function( window, document ){
    'use strict';

    var file	 = iconPath,
      revision = svgRevision;

    if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
      return true;

    var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
      request,
      data,
      insertIT = function()
      {
        document.body.insertAdjacentHTML( 'afterbegin', data );
      },
      insert = function(){
        if( document.body ) insertIT();
        else document.addEventListener( 'DOMContentLoaded', insertIT );
      };

    if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision ){
      data = localStorage.getItem( 'inlineSVGdata' );
      if( data ){
        insert();
        return true;
      }
    }

    try {
      request = new XMLHttpRequest();
      request.open( 'GET', file, true );
      request.onload = function() {
        if( request.status >= 200 && request.status < 400 )
        {
          data = request.responseText;
          insert();
          if( isLocalStorage ){
            localStorage.setItem( 'inlineSVGdata',	data );
            localStorage.setItem( 'inlineSVGrev',	revision );
          }
        }
      }
      request.send();
    } catch( e ){}

  }( window, document ) );
