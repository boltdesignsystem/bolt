/*!
 * jQuery Once v2.2.0 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var n=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};e.fn.once=function(t){var r="jquery-once-"+n(t);return this.filter(function(){return e(this).data(r)!==true}).data(r,true)};e.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+n(e))};e.fn.findOnce=function(t){var r="jquery-once-"+n(t);return this.filter(function(){return e(this).data(r)===true})}});

/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])}})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.fn.extend({disableSelection:function(){var a="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(a+".ui-disableSelection",function(a){a.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):a(this[0].form)}});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version","./escape-selector"],a):a(jQuery)}(function(a){return a.fn.labels=function(){var b,c,d,e,f;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(e=this.eq(0).parents("label"),d=this.attr("id"),d&&(b=this.eq(0).parents().last(),f=b.add(b.length?b.siblings():this.siblings()),c="label[for='"+a.ui.escapeSelector(d)+"']",e=e.add(f.find(c).addBack(c))),this.pushStack(e))}});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){"1.7"===a.fn.jquery.substring(0,3)&&(a.each(["Width","Height"],function(b,c){function d(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.css(b,"padding"+this))||0,d&&(c-=parseFloat(a.css(b,"border"+this+"Width"))||0),f&&(c-=parseFloat(a.css(b,"margin"+this))||0)}),c}var e="Width"===c?["Left","Right"]:["Top","Bottom"],f=c.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+c]=function(b){return void 0===b?g["inner"+c].call(this):this.each(function(){a(this).css(f,d(this,b)+"px")})},a.fn["outer"+c]=function(b,e){return"number"!=typeof b?g["outer"+c].call(this,b):this.each(function(){a(this).css(f,d(this,b,!0,e)+"px")})}}),a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.fn.scrollParent=function(b){var c=this.css("position"),d="absolute"===c,e=b?/(auto|scroll|hidden)/:/(auto|scroll)/,f=this.parents().filter(function(){var b=a(this);return(!d||"static"!==b.css("position"))&&e.test(b.css("overflow")+b.css("overflow-y")+b.css("overflow-x"))}).eq(0);return"fixed"!==c&&f.length?f:a(this[0].ownerDocument||document)}});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version","./focusable"],a):a(jQuery)}(function(a){return a.extend(a.expr[":"],{tabbable:function(b){var c=a.attr(b,"tabindex"),d=null!=c;return(!d||c>=0)&&a.ui.focusable(b,d)}})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.fn.extend({uniqueId:function(){var a=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&a(this).removeAttr("id")})}})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){return a.ui=a.ui||{},a.ui.version="1.12.1"});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){function b(a){for(var b=a.css("visibility");"inherit"===b;)a=a.parent(),b=a.css("visibility");return"hidden"!==b}return a.ui.focusable=function(c,d){var e,f,g,h,i,j=c.nodeName.toLowerCase();return"area"===j?(e=c.parentNode,f=e.name,!(!c.href||!f||"map"!==e.nodeName.toLowerCase())&&(g=a("img[usemap='#"+f+"']"),g.length>0&&g.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(j)?(h=!c.disabled,h&&(i=a(c).closest("fieldset")[0],i&&(h=!i.disabled))):h="a"===j?c.href||d:d,h&&a(c).is(":visible")&&b(a(c)))},a.extend(a.expr[":"],{focusable:function(b){return a.ui.focusable(b,null!=a.attr(b,"tabindex"))}}),a.ui.focusable});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.ui.plugin={add:function(b,c,d){var e,f=a.ui[b].prototype;for(e in d)f.plugins[e]=f.plugins[e]||[],f.plugins[e].push([c,d[e]])},call:function(a,b,c,d){var e,f=a.plugins[b];if(f&&(d||a.element[0].parentNode&&11!==a.element[0].parentNode.nodeType))for(e=0;e<f.length;e++)a.options[f[e][0]]&&f[e][1].apply(a.element,c)}}});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.ui.safeActiveElement=function(a){var b;try{b=a.activeElement}catch(c){b=a.body}return b||(b=a.body),b.nodeName||(b=a.body),b}});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return a.ui.safeBlur=function(b){b&&"body"!==b.nodeName.toLowerCase()&&a(b).trigger("blur")}});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){var b=0,c=Array.prototype.slice;return a.cleanData=function(b){return function(c){var d,e,f;for(f=0;null!=(e=c[f]);f++)try{d=a._data(e,"events"),d&&d.remove&&a(e).triggerHandler("remove")}catch(g){}b(c)}}(a.cleanData),a.widget=function(b,c,d){var e,f,g,h={},i=b.split(".")[0];b=b.split(".")[1];var j=i+"-"+b;return d||(d=c,c=a.Widget),a.isArray(d)&&(d=a.extend.apply(null,[{}].concat(d))),a.expr[":"][j.toLowerCase()]=function(b){return!!a.data(b,j)},a[i]=a[i]||{},e=a[i][b],f=a[i][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new f(a,b)},a.extend(f,e,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),g=new c,g.options=a.widget.extend({},g.options),a.each(d,function(b,d){return a.isFunction(d)?void(h[b]=function(){function a(){return c.prototype[b].apply(this,arguments)}function e(a){return c.prototype[b].apply(this,a)}return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(h[b]=d)}),f.prototype=a.widget.extend(g,{widgetEventPrefix:e?g.widgetEventPrefix||b:b},h,{constructor:f,namespace:i,widgetName:b,widgetFullName:j}),e?(a.each(e._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,f,c._proto)}),delete e._childConstructors):c._childConstructors.push(f),a.widget.bridge(b,f),f},a.widget.extend=function(b){for(var d,e,f=c.call(arguments,1),g=0,h=f.length;g<h;g++)for(d in f[g])e=f[g][d],f[g].hasOwnProperty(d)&&void 0!==e&&(a.isPlainObject(e)?b[d]=a.isPlainObject(b[d])?a.widget.extend({},b[d],e):a.widget.extend({},e):b[d]=e);return b},a.widget.bridge=function(b,d){var e=d.prototype.widgetFullName||b;a.fn[b]=function(f){var g="string"==typeof f,h=c.call(arguments,1),i=this;return g?this.length||"instance"!==f?this.each(function(){var c,d=a.data(this,e);return"instance"===f?(i=d,!1):d?a.isFunction(d[f])&&"_"!==f.charAt(0)?(c=d[f].apply(d,h),c!==d&&void 0!==c?(i=c&&c.jquery?i.pushStack(c.get()):c,!1):void 0):a.error("no such method '"+f+"' for "+b+" widget instance"):a.error("cannot call methods on "+b+" prior to initialization; attempted to call method '"+f+"'")}):i=void 0:(h.length&&(f=a.widget.extend.apply(null,[f].concat(h))),this.each(function(){var b=a.data(this,e);b?(b.option(f||{}),b._init&&b._init()):a.data(this,e,new d(f,this))})),i}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(c,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=b++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=a(),this.hoverable=a(),this.focusable=a(),this.classesElementLookup={},d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this.options=a.widget.extend({},this.options,this._getCreateOptions(),c),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){var b=this;this._destroy(),a.each(this.classesElementLookup,function(a,c){b._removeClass(c,a)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:a.noop,widget:function(){return this.element},option:function(b,c){var d,e,f,g=b;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof b)if(g={},d=b.split("."),b=d.shift(),d.length){for(e=g[b]=a.widget.extend({},this.options[b]),f=0;f<d.length-1;f++)e[d[f]]=e[d[f]]||{},e=e[d[f]];if(b=d.pop(),1===arguments.length)return void 0===e[b]?null:e[b];e[b]=c}else{if(1===arguments.length)return void 0===this.options[b]?null:this.options[b];g[b]=c}return this._setOptions(g),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return"classes"===a&&this._setOptionClasses(b),this.options[a]=b,"disabled"===a&&this._setOptionDisabled(b),this},_setOptionClasses:function(b){var c,d,e;for(c in b)e=this.classesElementLookup[c],b[c]!==this.options.classes[c]&&e&&e.length&&(d=a(e.get()),this._removeClass(e,c),d.addClass(this._classes({element:d,keys:c,classes:b,add:!0})))},_setOptionDisabled:function(a){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!a),a&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(b){function c(c,f){var g,h;for(h=0;h<c.length;h++)g=e.classesElementLookup[c[h]]||a(),g=a(b.add?a.unique(g.get().concat(b.element.get())):g.not(b.element).get()),e.classesElementLookup[c[h]]=g,d.push(c[h]),f&&b.classes[c[h]]&&d.push(b.classes[c[h]])}var d=[],e=this;return b=a.extend({element:this.element,classes:this.options.classes||{}},b),this._on(b.element,{remove:"_untrackClassesElement"}),b.keys&&c(b.keys.match(/\S+/g)||[],!0),b.extra&&c(b.extra.match(/\S+/g)||[]),d.join(" ")},_untrackClassesElement:function(b){var c=this;a.each(c.classesElementLookup,function(d,e){a.inArray(b.target,e)!==-1&&(c.classesElementLookup[d]=a(e.not(b.target).get()))})},_removeClass:function(a,b,c){return this._toggleClass(a,b,c,!1)},_addClass:function(a,b,c){return this._toggleClass(a,b,c,!0)},_toggleClass:function(a,b,c,d){d="boolean"==typeof d?d:c;var e="string"==typeof a||null===a,f={extra:e?b:c,keys:e?a:b,element:e?this.element:a,add:d};return f.element.toggleClass(this._classes(f),d),this},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){if(b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled"))return("string"==typeof g?f[g]:g).apply(f,arguments)}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^([\w:-]*)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.on(j,k,h):c.on(j,h)})},_off:function(b,c){c=(c||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,b.off(c).off(c),this.bindings=a(this.bindings.not(b).get()),this.focusable=a(this.focusable.not(b).get()),this.hoverable=a(this.hoverable.not(b).get())},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){this._addClass(a(b.currentTarget),null,"ui-state-hover")},mouseleave:function(b){this._removeClass(a(b.currentTarget),null,"ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){this._addClass(a(b.currentTarget),null,"ui-state-focus")},focusout:function(b){this._removeClass(a(b.currentTarget),null,"ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}}),a.widget});;
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:233170,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');;
(function(Drupal, $) {
  Drupal.behaviors.productVersionSelectHack = {
    attach: function(context) {
      $('.product-version-select-form select').change(function() {
        $(this).parents('form').submit();
      });
    }
  }
})(Drupal, jQuery);;
/**
 * @file
 * Attaches several event listener to a web page.
 */

(function ($, Drupal, drupalSettings) {

  /* eslint max-nested-callbacks: ["error", 4] */

  'use strict';

  Drupal.google_analytics = {};

  $(document).ready(function () {

    // Attach mousedown, keyup, touchstart events to document only and catch
    // clicks on all elements.
    $(document.body).on('mousedown keyup touchstart', function (event) {

      // Catch the closest surrounding link of a clicked element.
      $(event.target).closest('a,area').each(function () {

        // Is the clicked URL internal?
        if (Drupal.google_analytics.isInternal(this.href)) {
          // Skip 'click' tracking, if custom tracking events are bound.
          if ($(this).is('.colorbox') && (drupalSettings.google_analytics.trackColorbox)) {
            // Do nothing here. The custom event will handle all tracking.
            // console.info('Click on .colorbox item has been detected.');
          }
          // Is download tracking activated and the file extension configured
          // for download tracking?
          else if (drupalSettings.google_analytics.trackDownload && Drupal.google_analytics.isDownload(this.href)) {
            // Download link clicked.
            ga('send', {
              hitType: 'event',
              eventCategory: 'Downloads',
              eventAction: Drupal.google_analytics.getDownloadExtension(this.href).toUpperCase(),
              eventLabel: Drupal.google_analytics.getPageUrl(this.href),
              transport: 'beacon'
            });
          }
          else if (Drupal.google_analytics.isInternalSpecial(this.href)) {
            // Keep the internal URL for Google Analytics website overlay intact.
            ga('send', {
              hitType: 'pageview',
              page: Drupal.google_analytics.getPageUrl(this.href),
              transport: 'beacon'
            });
          }
        }
        else {
          if (drupalSettings.google_analytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
            // Mailto link clicked.
            ga('send', {
              hitType: 'event',
              eventCategory: 'Mails',
              eventAction: 'Click',
              eventLabel: this.href.substring(7),
              transport: 'beacon'
            });
          }
          else if (drupalSettings.google_analytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
            if (drupalSettings.google_analytics.trackDomainMode !== 2 || (drupalSettings.google_analytics.trackDomainMode === 2 && !Drupal.google_analytics.isCrossDomain(this.hostname, drupalSettings.google_analytics.trackCrossDomains))) {
              // External link clicked / No top-level cross domain clicked.
              ga('send', {
                hitType: 'event',
                eventCategory: 'Outbound links',
                eventAction: 'Click',
                eventLabel: this.href,
                transport: 'beacon'
              });
            }
          }
        }
      });
    });

    // Track hash changes as unique pageviews, if this option has been enabled.
    if (drupalSettings.google_analytics.trackUrlFragments) {
      window.onhashchange = function () {
        ga('send', {
          hitType: 'pageview',
          page: location.pathname + location.search + location.hash
        });
      };
    }

    // Colorbox: This event triggers when the transition has completed and the
    // newly loaded content has been revealed.
    if (drupalSettings.google_analytics.trackColorbox) {
      $(document).on('cbox_complete', function () {
        var href = $.colorbox.element().attr('href');
        if (href) {
          ga('send', {
            hitType: 'pageview',
            page: Drupal.google_analytics.getPageUrl(href)
          });
        }
      });
    }

  });

  /**
   * Check whether the hostname is part of the cross domains or not.
   *
   * @param {string} hostname
   *   The hostname of the clicked URL.
   * @param {array} crossDomains
   *   All cross domain hostnames as JS array.
   *
   * @return {boolean} isCrossDomain
   */
  Drupal.google_analytics.isCrossDomain = function (hostname, crossDomains) {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  };

  /**
   * Check whether this is a download URL or not.
   *
   * @param {string} url
   *   The web url to check.
   *
   * @return {boolean} isDownload
   */
  Drupal.google_analytics.isDownload = function (url) {
    var isDownload = new RegExp('\\.(' + drupalSettings.google_analytics.trackDownloadExtensions + ')([\?#].*)?$', 'i');
    return isDownload.test(url);
  };

  /**
   * Check whether this is an absolute internal URL or not.
   *
   * @param {string} url
   *   The web url to check.
   *
   * @return {boolean} isInternal
   */
  Drupal.google_analytics.isInternal = function (url) {
    var isInternal = new RegExp('^(https?):\/\/' + window.location.host, 'i');
    return isInternal.test(url);
  };

  /**
   * Check whether this is a special URL or not.
   *
   * URL types:
   *  - gotwo.module /go/* links.
   *
   * @param {string} url
   *   The web url to check.
   *
   * @return {boolean} isInternalSpecial
   */
  Drupal.google_analytics.isInternalSpecial = function (url) {
    var isInternalSpecial = new RegExp('(\/go\/.*)$', 'i');
    return isInternalSpecial.test(url);
  };

  /**
   * Extract the relative internal URL from an absolute internal URL.
   *
   * Examples:
   * - http://mydomain.com/node/1 -> /node/1
   * - http://example.com/foo/bar -> http://example.com/foo/bar
   *
   * @param {string} url
   *   The web url to check.
   *
   * @return {string} getPageUrl
   *   Internal website URL.
   */
  Drupal.google_analytics.getPageUrl = function (url) {
    var extractInternalUrl = new RegExp('^(https?):\/\/' + window.location.host, 'i');
    return url.replace(extractInternalUrl, '');
  };

  /**
   * Extract the download file extension from the URL.
   *
   * @param {string} url
   *   The web url to check.
   *
   * @return {string} getDownloadExtension
   *   The file extension of the passed url. e.g. 'zip', 'txt'
   */
  Drupal.google_analytics.getDownloadExtension = function (url) {
    var extractDownloadextension = new RegExp('\\.(' + drupalSettings.google_analytics.trackDownloadExtensions + ')([\?#].*)?$', 'i');
    var extension = extractDownloadextension.exec(url);
    return (extension === null) ? '' : extension[1];
  };

})(jQuery, Drupal, drupalSettings);
;
/**
 * @file
 * Fires Google Analytics events based on user configuration settings.
 */

(function (Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.googleAnaltyicsEt = {
    attach: function (context, settings) {
      // Bail if the ga function isn't defined.
      if (typeof ga == 'undefined') {
        return;
      }
      var trackers = settings.googleAnalyticsEt;
      // Iterate over our tracker settings.
      for (var i = 0; i < trackers.length; i++) {
        var elements = context.querySelectorAll(trackers[i].selector);
        for (var j = 0; j < elements.length; j++) {
          if (!elements[j].hasAttribute('data-google-analytics-et-processed')) {
            elements[j].addEventListener(trackers[i].event, (function(setting, element) {
              return function(e) {
                Drupal.googleAnalyticsEt(setting, element);
              };
            }) (trackers[i], elements[j]), false);
            elements[j].setAttribute('data-google-analytics-et-processed', 'true');
          }
        }
      }
    }
  };

  Drupal.googleAnalyticsEt = function (tracker, element) {
    ga('send', {
      'hitType': 'event',
      'eventCategory': Drupal.googleAnalyticsEtTokenReplace(tracker.category, element),
      'eventAction': Drupal.googleAnalyticsEtTokenReplace(tracker.action, element),
      'eventLabel': Drupal.googleAnalyticsEtTokenReplace(tracker.label, element),
      'eventValue': Number(tracker.value),
      'nonInteraction': Boolean(tracker.noninteraction)
    });
  };

  Drupal.googleAnalyticsEtTokenReplace = function(str, element) {
    var elem_text = element.innerText || element.textContent;
    var elem_href = element.getAttribute('href') || '';
    var current_page = window.location.href;
    return str.replace('!text', elem_text).replace('!href', elem_href).replace('!currentPage', current_page);
  }

})(Drupal, drupalSettings);
;
/**
 * Created by tremw on 6/23/16, based on original by shanr2.
 * This script is designed to be included in the HTML head.
 * It should be included *after* jQuery is loaded.
 * It should be immediately followed by loading an environment-specific
 * configuration file, selected by the back end based on the environment
 * the server is running on.
 * Finally, a trigger script should be loaded that initiates page tracking
 * or other functions. This will vary by page.
 * The lmms.js file does not, by itself, trigger any events.
 */

/**
 * Main LMMS object.
 * @type {{initialized: boolean, debug: boolean, protocol: string, hostName: string, path: string, xhrTimeout: number, console_patched: boolean, $: *, logger: lmms.logger, getServiceURL: lmms.getServiceURL, handleAJAXSuccess: lmms.handleAJAXSuccess, handleAJAXError: lmms.handleAJAXError, makeAjaxCall: lmms.makeAjaxCall, getRequestObj: lmms.getRequestObj, getContactInfo: lmms.getContactInfo, trackPageVisit: lmms.trackPageVisit}}
 */
(function(window, $, undefined){
    var lmms = {
        initialized: false,
        debug: false,
        protocol: window.location.protocol,
        hostName: window.location.hostname,
        path: '',
        xhrTimeout: 5000,
        console_patched: false,
        $: $,

        /**
         * Simple logger. Respects lmms.debug property.
         * @param output
         * @param type
         */
        logger: function(output, type){
            if (!this.console_patched){
                // Accommodate browsers that don't support console functions.
                var methods = ['assert','clear','count','debug','dir','dirxml',
                    'error', 'exception','group','groupCollapsed','groupEnd','info',
                    'log', 'markTimeline','profile','profileEnd','table','time',
                    'timeEnd','timeStamp','trace','warn'];
                var logpresent = typeof window['console']['log'] === 'function';
                if(typeof window['console'] !== 'object'){
                    window['console'] = {};
                }
                for (var i = 0; i < methods.length; i++){
                    if (typeof window['console'][methods[i]] !== 'function'){
                        if (logpresent){
                            window['console'][methods[i]] = window.console.log;
                        } else {
                            window['console'][methods[i]] = function (){};
                        }
                    }
                }
                this.console_patched = true;
            }
            if (typeof (type) === 'undefined'){
                type = 'log';
            }
            if (this.debug == true){
                console[type](output);
            }
        },
        /**
         * Get a cookie's value.
         * @param name
         * @returns {*}
         *
         * @todo: There is still something wrong with cookie handling
         */
        getCookieValue: function (name) {
            var nameEQ = name + '=';
            var cookies = document.cookie.split(';');
            var cookie;
            var value = null;
            for (var i = 0; i < cookies.length; i++) {
                cookie = lmms.$.trim(cookies[i]);
                if (cookie.indexOf(nameEQ) === 0) {
                    value = decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
                    break;
                }
            }
            return value;
        },
        /**
         * Set a cookie value.
         * @param name {String}
         * @param value {String}
         * @param days {Number}
         * @returns {boolean}
         */
        setCookieValue: function (name, value, days){
            name = encodeURIComponent(lmms.$.trim(name));
            value = lmms.$.trim(value);
            var domain = '.pega.com';
            var path = '/';
            var secure = 1;
            var expires = '';
            var cookie = '';
            if (days) {
                days = parseInt(days);
                var date = new Date();
                date.setMilliseconds(date.getMilliseconds() + days * 864e+5);
                expires = date.toUTCString();
            }
            cookie = [
                name, '=', value,
                '; expires=', expires,
                '; path=', path,
                '; domain=', domain,
                '; secure=', secure
            ].join('');
            document.cookie = cookie;
            return lmms.getCookieValue(name) == value;
        },
       /**
        * Returns parameter specified by "name" from the provided url or from
        * current url if not provided.
        *
        * @param name
        * @param url
        * @returns {*}
        */
        getUrlParameterByName: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        /**
         * Handler for the MKTID cookie.
         */
        mktId: {
            /**
             * Get the MKTID cookie.
             * @returns {*}
             */
            get: function () {
                return lmms.getCookieValue('MKTID');
            },
            /**
             * Get the identification status of the cookie.
             * @returns {boolean}
             */
            identified: function () {
                var value = lmms.mktId.get();
                if (value){
                    if (value.indexOf('C-') === 0){
                        return true;
                    }
                }
                return false;
            }

        },
        /**
         * Handler for the IDREQ cookie.
         */
        idReq: {
            /**
             * Set the IDREQ cookie.
             * @param days
             * @returns {boolean}
             */
            set: function (days){
                return lmms.setCookieValue('IDREQ', 'true', days);
            },
            /**
             * Get the IDREQ cookie.
             * @returns {*}
             */
            get: function (){
                return lmms.getCookieValue('IDREQ');
            },
            /**
             * Clear the IDREQ cookie.
             * @returns {boolean}
             */
            delete: function (){
                lmms.idReq.set(-365);
                return lmms.idReq.get() === null;
            },
            present: function () {
                return lmms.idReq.get() === 'true';
            }
        },
        /**
         * Handler for legacy Eloqua cookie.
         */
        elqGuid: {
            /**
             * Get the legacy elq_guid cookie if it is present.
             * @returns {String/null}
             */
            get: function () {
                return lmms.getCookieValue('elq_guid');
            }
        },
        mktSessionId : {
            /**
             * Get the MKTSESSID cookie that LMMS sets if it is present.
             */
            get: function () {
                return lmms.getCookieValue('MKTSESSID');
            }
        },
        conId : {
            /**
             * Get the CONID cookie that LMMS sets if it is present.
             */
            get: function () {
                return lmms.getCookieValue('CONID');
            }
        },
        offerId : {
            /**
             * Get the Offer ID from the URL.
             */
            get: function () {
                return lmms.getUrlParameterByName('O') || lmms.getUrlParameterByName('o') || '';
            }
        },
        interactionId : {
            /**
             * Get the Interaction ID from the URL.
             */
            get: function () {
                return lmms.getUrlParameterByName('IxID') || '';
            }
        },
        /**
         * Returns the REST Service URL.
         * Pass query string parameters as an object with key-value pairs.
         * @param serviceName
         * @param params {Object}
         * @returns {String}
         */
        getServiceURL: function (serviceName, params) {
            if (!this.initialized){
                this.logger('lmms.getServiceURL: lmms is not initialized.', 'error');
                return '';
            }
            var url = this.protocol +
                '//' + this.hostName +
                '/' + this.path + '/' +
                serviceName;
            if (params) {
                url += '?';
                var first_time = true;
                this.$.each(params, function (key, value){
                    if (!first_time){
                        url += '&';
                    }
                    url += encodeURIComponent(key) + '=' + encodeURIComponent(value);
                    first_time = false;
                });
            }
            return url;
        },

        /**
         * AJAX success handler; can invoke callback if it's defined.
         * Callback function will only be defined by another script such as
         * the trigger script for form pre-population.
         * If invoked, the callback will be
         * @param data
         * @param callback
         */
        handleAJAXSuccess: function (data, callback){
            if (!data.Status){
                this.logger('lmms.handleAJAXSuccess: data.Status is missing, aborting.');
                return;
            }
            if (data.Status !== "Success"){
                this.logger('lmms.handleAJAXSuccess: data.Status=' + data.Status + '; aborting.');
                return;
            }
            if (callback){
                if (!(this.hasOwnProperty(callback) && typeof this[callback] === 'function')) {
                    this.logger('lmms.handleAJAXSuccess: callback not defined; aborting callback.');
                } else {
                    this[callback](true, data);
                }
            }
        },

        /**
         * AJAX Error handler;
         * @param xhr
         * @param textStatus
         * @param errorThrown
         * @param callback
         */
        handleAJAXError: function(xhr, textStatus, errorThrown, callback){
            this.logger('lmms.handleAJAXError: error', 'group');
            if (xhr.readyState == 4){
                this.logger('HTTP error.');
                this.logger('StatusText = ' + xhr.statusText);
            }
            if (xhr.readyState == 0){
                this.logger('Network error (i.e. connection refused, access denied due to CORS, etc.)', 'error');
            }
            if (textStatus === 'timeout') {
                //@todo Do something on timeout.
                this.logger('XHR REQUEST TIMED OUT', 'error');
            }
            this.logger(null, 'groupEnd');
            if (callback){
                if (this.hasOwnProperty(callback) && typeof this[callback] === 'function'){
                    this[callback](false);
                } else {
                    this.logger('lmms.handleAJAXError: callback not defined.', 'error');
                }
            }
        },

        /**
         * Make an AJAX call.
         * @param serviceUrl
         * @param requestObject
         * @param callback
         */
        makeAjaxCall: function (serviceUrl, requestObject, callback) {
            this.logger('lmms.makeAjaxCall', 'group');
            this.logger(serviceUrl, 'log');
            this.logger(requestObject, 'table');
            this.logger(callback, 'log');
            this.logger('', 'groupEnd');
            this.$.ajax({
                url: serviceUrl,
                dataType: 'json',
                data: JSON.stringify(requestObject),
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                async: true,
                processData: false,
                cache: false,
                timeout: this.xhrTimeout,
                success: function (data) {
                    lmms.handleAJAXSuccess(data, callback);
                },
                error: function (xhr, textStatus, errorThrown) {
                    lmms.handleAJAXError(xhr, textStatus, errorThrown, callback);
                    // Dispatch the AJAX failure event.
                    lmms.onAjaxFailure(xhr, textStatus, errorThrown, callback);
                }
            });
        },

        /**
         * Generate a blank request.
         * @returns {Request} object
         */
        getRequestObj: function () {
            return {
                Activity: {}
            };
        },

        /**
         * Capture the page visit. Handle IDREQ cookie.
         * @param callback
         */
        trackPageVisit: function (callback) {
            this.logger('lmms.trackPageVisit', 'group');
            var requestObject = this.getRequestObj();
            if (this.idReq.present()){
                requestObject.IDREQ = 'true';
            }
            requestObject.Activity.ACTIVITY_TYPE = 'PageView';
            requestObject.Activity.ASSET_TYPE = 'Web';
            requestObject.Activity.URL = document.URL;
            requestObject.Activity.ASSETDISPLAYNAME = document.title;
            requestObject.Activity.ASSET_NAME = document.URL.split('?')[0];
            requestObject.Activity.REFERRER_URL = document.referrer;
            requestObject.Activity.INTERACTION_ID = lmms.interactionId.get();
            requestObject.Activity.OFFER_ID = lmms.offerId.get();
            requestObject.Activity.UTM_CAMPAIGN = lmms.getUrlParameterByName('utm_campaign') || '';
            requestObject.Activity.UTM_CONTENT = lmms.getUrlParameterByName('utm_content') || '';
            // LMMS erroneously refers to utm_term as utm_keyword. We send both
            // using the utm_term querystring as the value.
            requestObject.Activity.UTM_KEYWORD = lmms.getUrlParameterByName('utm_term') || '';
            requestObject.Activity.UTM_TERM = lmms.getUrlParameterByName('utm_term') || '';
            requestObject.Activity.UTM_MEDIUM = lmms.getUrlParameterByName('utm_medium') || '';
            requestObject.Activity.UTM_SOURCE = lmms.getUrlParameterByName('utm_source') || '';

            var terms = lmms.getPageTermsFromMetatags();
            for (var vocab in terms) {
                if (lmms.ecmVocabMap.hasOwnProperty(vocab)) {
                    requestObject.Activity[lmms.ecmVocabMap[vocab]] = terms[vocab].join(',');
                }
            }
            var cdh_terms = lmms.getCdhFromMetatags();
            if (cdh_terms.hasOwnProperty('cdh')) {
                requestObject.Activity.ContentID = cdh_terms['cdh'];
            }
            this.logger(requestObject, 'table');
            var url = this.getServiceURL('CapturePageVisit', null);
            this.logger(null, 'groupEnd');
            this.makeAjaxCall(url, requestObject, callback);
        },

        /**
         * Dispatch ajax failure event.
         */
        onAjaxFailure: function(xhr, textStatus, errorThrown, callback) {
            var e = new CustomEvent('lmmsajaxfailure', {
                detail: {
                    callback: callback
                }
            });
            window.dispatchEvent(e);
        },

       /**
        * Returns an object containing the page terms parsed from metatags.
        *
        * Assumes page has metatags in the format:
        *   <meta
        *     property="article:VOCAB-X"
        *     content="TERM"
        *     data-pega-cd-term="true">
        *
        * @returns {{}}
        *   Returns terms in the structure:
        *   {
        *     "vocabA-X": ["term1", "term2", "term3"],
        *     "vocabB-X: ["term6", "term5", "term6"],
        *     ...
        *   }
        */
        getPageTermsFromMetatags: function() {
            var metas = document.getElementsByTagName('meta');
            var terms = {};
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute("property") &&
                    metas[i].getAttribute("content") &&
                    metas[i].getAttribute("data-pega-cd-term") &&
                    metas[i].getAttribute("property").startsWith('article:')) {
                    var propertyArray = metas[i].getAttribute("property").split(':');
                    if (propertyArray.length === 2) {
                        var vocab = propertyArray[1];
                        if (!terms[vocab]) {
                            terms[vocab] = [];
                        }
                        terms[vocab].push(metas[i].getAttribute("content"));
                    }
                }
            }
            return terms;
        },

        getCdhFromMetatags: function() {
            var metas = document.getElementsByTagName('meta');
            var cdh_terms = {};
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute("data-cdh-content-id")) {
                    cdh_terms['cdh'] = metas[i].getAttribute("content");
                }
            }
            return cdh_terms;
        }
    };
    window.lmms = lmms;
})(window, jQuery);


;
/**
 * @file
 * Initializes LMMS object with Drupal settings overrides.
 */

(function(settings) {
    // The LMMS endpoint URL is constructed by:
    // https://[lmms.hostName]/[lmms.path]/NAME_OF_SERVICE

    // Endpoint Host Name. Optional. If not provided, defaults to the hostname of the current page.
    lmms.hostName = settings.lmms.hostName || lmms.hostName;

    // Endpoint Path. Required. In practice the path is specific to the LMMS environment that should be used:
    //   - "lmmsprd/PRRestService/LMMSServices/marketing" (prod)
    //   - "lmmsqa/PRRestService/LMMSServices/marketing" (qa)
    //   - "lmmstst/PRRestService/LMMSServices/marketing" (dev)
    //   - "pega_lmms_test" (mock services via pega_lmms_test module)
    lmms.path = settings.lmms.path || lmms.path;

    // Debug. Optional. Whether to print formatted log messages to console. Defaults to false.
    lmms.debug = settings.lmms.debug || lmms.debug;

    // XHR Timeout. Optional. The time in milliseconds the browser should wait for a response from the server. Defaults
    // to "5000". May need to be (much) higher in non-production environments.
    lmms.xhrTimeout = settings.lmms.xhrTimeout || lmms.xhrTimeout;

    // ID Req cookie expiration. Optional. The number of days the browser should keep the idReq cookie used. The cookie
    // is used as a semaphore to the LMMS server after a form POST to tell it to convert the U- MKTID cookie value to
    // C- MKTID. Defaults to "15".
    lmms.idReq.days = settings.lmms.idReqDays;

    // Country code mapping. Required. Used by the form prepopulation logic to map country codes returned by the LMMS
    // service to those used by the Drupal form inputs.
    lmms.countryCodes = settings.lmms.countryCodes;

    // Mapping of ECM vocabulary and level to LMMS field name.
    lmms.ecmVocabMap = settings.lmms.ecmVocabMap;

    // Set the lmms object initialization state. 
    lmms.initialized = true;
})(drupalSettings);
;
/**
 * Created by tremw on 6/24/16.
 */
(function() {
    lmms.trackPageVisitComplete = function (success, data) {
        // Chain this function to form pre-population if it is present.
        if (success){
            lmms.logger('lmms.trackPageVisitComplete', 'group');
            if (data.hasOwnProperty('Status') && data.Status == "Success"){
                lmms.logger(data, 'table');
                if (data.hasOwnProperty('IDREQ')) {
                    lmms.logger('IDREQ flag present');
                    if (data.IDREQ.toLowerCase() == 'false') {
                        lmms.logger('IDREQ=false; deleting IDREQ cookie!');
                        lmms.idReq.delete();
                    } else {
                        lmms.logger('IDREQ!=false; leaving IDREQ cookie alone');
                    }
                }
            }
            lmms.logger('lmms.trackPageVisitComplete', 'groupEnd');
            var conId = lmms.conId.get();
            ga('set', 'dimension27', conId);
            var mktid = lmms.mktId.get();
            ga('set', 'dimension17', mktid);
            var mktsessid = lmms.mktSessionId.get();
            ga('set', 'dimension21', mktsessid);
            ga('send', {
              'hitType': 'event',
              'eventCategory': 'lmms',
              'eventAction': 'MKTID Updated',
              'eventLabel': mktid,
              'eventValue': lmms.mktId.identified() ? 1 : 0,
              'nonInteraction': 1
            });
        } else {
            lmms.logger('lmms.trackPageVisitComplete: Preceding request failed, aborting.')
        }
        if (lmms.hasOwnProperty('prePopulateForm') && lmms.hasOwnProperty('getContactInfo')){
            lmms.getContactInfo('prePopulateForm');
        }
    };
    lmms.$(document).ready(function (){
        lmms.trackPageVisit('trackPageVisitComplete');
    });
})();
;
(function ($, Drupal) {
    Drupal.pega_personalize = Drupal.pega_personalize || {};
    Drupal.pega_personalize.reveal = function() {
        $('[data-cdh-swappable="true"]').each(function (i, swappable) {
            swappable.removeAttribute('style');
        });
    };
    Drupal.behaviors.pega_personalize_nbc = {
        attach: function (context, settings) {
            if ($('[data-cdh-swappable="true"]', context).length) {
                var contact = lmms.conId.get();
                // Unhide and exit if we don't have a ConID.
                if (!contact) {
                    Drupal.pega_personalize.reveal();
                    return;
                }
                var postData = {
                    "ContainerName": "NextBestContent",
                    "CustomerID": encodeURIComponent(contact),
                    "Channel": "Web",
                    "Direction": "Inbound"
                };
                $.ajax({
                    method: "POST",
                    url: settings.personalize.nbc_endpoint,
                    data: JSON.stringify(postData),
                    dataType: "json",
                    timeout: settings.personalize.nbc_timeout,
                    success: function (result) {
                        if (typeof(result.ContainerList) !== 'undefined' &&
                            result.ContainerList.length > 0 &&
                            typeof(result.ContainerList[0].RankedResults) !== 'undefined' &&
                            result.ContainerList[0].RankedResults.length > 0) {

                            var ranked_results = result.ContainerList[0].RankedResults;
                            var swap_count = ranked_results.length;
                            var ids = [];
                            var offers = {};
                            for (var c = 0; c < swap_count; c++) {
                                // Not all offers have offer IDs. o_O
                                if (ranked_results[c].Offerid) {
                                   ids.push(ranked_results[c].Offerid);
                                   offers[ranked_results[c].Offerid] = ranked_results[c];
                                }
                            }
                            var lang = '';
                            if (settings.path.currentLanguage !== 'en') {
                                lang = settings.path.currentLanguage + '/';
                            }

                            var format = 'teaser_card';
                            var json_path = lang + 'personalize/' + ids.join(',') + '/' + format;

                            $.ajax({
                                url: json_path,
                                dataType: 'json',
                                async: false, // Need this or else the complete function fires before this is finished.
                                success: function(data) {
                                    $('[data-cdh-swappable="true"]', context).each(function (i, swappable) {
                                        if (i < data.length){
                                            var offer_id = data[i].offer_id;
                                            var IxID = offers[offer_id].InteractionID;

                                            var $html = $(data[i].html);
                                            var $swappable = $(swappable);
                                            // Some formats (like teaser cards)
                                            // require us to replace the parent.
                                            if (data[i].replaceParent === '1') {
                                                $swappable = $swappable.parent();
                                            }
                                            $swappable.replaceWith($html);
                                            var query_string = '?IxID=' + IxID + '&o=' + offer_id;
                                            var new_link = $html.find('a').attr('href') + query_string;
                                            $html.find('a').attr('href', new_link);
                                        }
                                    })
                                }
                            });
                        }
                    },
                    error: function (xmlhttp) {
                        console.log('An error occurred when retrieving CDH data: ' + xmlhttp.status);
                    },
                    complete: function() {
                        Drupal.pega_personalize.reveal();
                    }
                });
            }
        }
    };
})(jQuery, Drupal);


;
/** IDIO **/
(function ($, Drupal) {
    Drupal.behaviors.pega_personalize_idio = {
        attach: function (context, settings) {
            !function (d, s) {
                var ia = d.createElement(s);
                ia.async = 1, s = d.getElementsByTagName(s)[0], ia.src = settings.personalize.idio_script, s.parentNode.insertBefore(ia, s)
            }(document, 'script');
        }
    }
})(jQuery, Drupal);;
// TODO: limit to a .js class
const inputs = document.querySelectorAll('.c-bolt-input');

for (let i = 0, len = inputs.length; i < len; i++) {
  const input = inputs[i];

  // Check if the field has pre-filled text from the server side
  if (input.value) {
    input.classList.add('is-filled');
  }

  input.onchange = function() {
    if (input.value) {
      input.classList.add('is-filled');
    } else {
      input.classList.remove('is-filled');
    }
  };

  input.onfocus = function() {
    input.classList.remove('is-touched');

    // In there were server-side errors, the 'is-invalid' class will be present
    // but should be removed on focus because the user is trying to fix them.
    input.classList.remove('is-invalid');

    if (input.errors) {
      input.errors.remove();
    }
  };

  input.onblur = function(e) {
    if (!e.isTrusted) {
      // This blur event was triggered by a script, not a human, so don't mark
      // the input as is-touched (because it actually wasn't) or show errors.

      // Note that Mozilla claims that isTrusted shouldn't work in IE, but
      // based on testing, it does.
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
      return;
    }

    input.classList.add('is-touched');

    if (input.validationMessage) {
      let error = document.createElement('div');
      let messageText = document.createTextNode(input.validationMessage);
      error.classList.add('c-bolt-input-message');
      error.classList.add('c-bolt-input-message--invalid');
      error.appendChild(messageText);

      input.errors = input.insertAdjacentElement('afterend', error);
    }
  };
}

const customInputWrappers = document.querySelectorAll('.c-bolt-custom-input');

for (let i = 0, len = customInputWrappers.length; i < len; i++) {
  const wrapper = customInputWrappers[i];
  const input = wrapper.querySelector('.c-bolt-input');

  input.onfocus = function() {
    wrapper.classList.add('is-active');
  };

  input.onblur = function() {
    wrapper.classList.remove('is-active');
  };
}
;
!function(e){function t(t){for(var n,r,l=t[0],i=t[1],a=0,c=[];a<l.length;a++)r=l[a],o[r]&&c.push(o[r][0]),o[r]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);for(s&&s(t);c.length;)c.shift()()}var n={},o={2:0};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var l=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=l);var i,a=document.getElementsByTagName("head")[0],s=document.createElement("script");s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.src=function(e){return r.p+""+({31:"bolt-band",32:"bolt-icon",36:"vendors~bolt-device-viewer",39:"vendors~bolt-video",40:"vendors~bolt-copy-to-clipboard"}[e]||e)+"-bundle-"+{0:"11ce1bf437da248fc0db",1:"aa107157c3b6d35b3767",30:"cbfed322052596d53487",31:"26a7beec3e55f8c60da9",32:"95e6c101ddb23b288df6",33:"307ee6201d236dbf9ddb",34:"5a41039156315bc88aed",35:"ce1bebdf64d7800ed81e",36:"223ed80396cfaf29d659",37:"d949ced606e30714e871",38:"27d91c2f8197656c7c98",39:"18741c9c1b124074b0a9",40:"a53ed2758686fe4503ad"}[e]+".js"}(e),i=function(t){s.onerror=s.onload=null,clearTimeout(c);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),l=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+l+")");i.type=r,i.request=l,n[1](i)}o[e]=void 0}};var c=setTimeout(function(){i({type:"timeout",target:s})},12e4);s.onerror=s.onload=i,a.appendChild(s)}return Promise.all(t)},r.m=e,r.c=n,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/themes/custom/pegawww_theme/dist/",r.oe=function(e){throw console.error(e),e};var l=window.webpackJsonp=window.webpackJsonp||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var a=0;a<l.length;a++)t(l[a]);var s=i;r(r.s=0)}({"./node_modules/@bolt/components-action-blocks/src/action-blocks.scss":function(e,t,n){},"./node_modules/@bolt/components-background-shapes/src/background-shapes.scss":function(e,t,n){},"./node_modules/@bolt/components-background/src/background.scss":function(e,t,n){},"./node_modules/@bolt/components-band/src/band.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){n.e(31).then(n.bind(null,"./node_modules/@bolt/components-band/src/band.standalone.js"))})},"./node_modules/@bolt/components-band/src/band.scss":function(e,t,n){},"./node_modules/@bolt/components-block-list/src/block-list.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){n.e(35).then(n.bind(null,"./node_modules/@bolt/components-block-list/src/block-list.standalone.js"))})},"./node_modules/@bolt/components-block-list/src/block-list.scss?85d4":function(e,t,n){},"./node_modules/@bolt/components-blockquote/src/blockquote.scss":function(e,t,n){},"./node_modules/@bolt/components-breadcrumb/src/breadcrumb.scss":function(e,t,n){},"./node_modules/@bolt/components-button-group/src/button-group.scss":function(e,t,n){},"./node_modules/@bolt/components-button/src/button.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){window.customElements.get("replace-with-children")||Promise.resolve().then(n.bind(null,"./node_modules/@bolt/core/elements/replace-with-children/index.js")),window.customElements.get("bolt-button")||Promise.resolve().then(n.bind(null,"./node_modules/@bolt/components-button/src/button.standalone.js"))})},"./node_modules/@bolt/components-button/src/button.scss?384f":function(e,t,n){},"./node_modules/@bolt/components-button/src/button.scss?86f9":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!0)).push([e.i,'bolt-button {\n  display: inline-block;\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-appearance: none\n}\n.c-bolt-button {\n  padding: 0;\n  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;\n  font-family: var(--bolt-font-family-body);\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-weight: 600;\n  transition: .3s cubic-bezier(.25,.8,.25,1);\n  box-shadow: 0 1px 4px 1px rgba(6,10,36,.1),0 5px 10px 0 rgba(6,10,36,.08);\n  display: inline-block;\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-flex-grow: 1;\n          flex-grow: 1;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: relative;\n  cursor: pointer;\n  text-decoration: none;\n  vertical-align: middle;\n  border-style: solid;\n  border-width: 1px;\n  border-radius: 3px;\n  -webkit-transform: translate3d(0,0,0);\n          transform: translate3d(0,0,0)\n}\n.js-fonts-loaded .c-bolt-button {\n  font-family: "Open Sans","Helvetica Neue",sans-serif;\n  font-family: var(--bolt-font-family-body)\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-hover,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):hover {\n  -webkit-transform: translateY(-2px);\n          transform: translateY(-2px);\n  box-shadow: 0 1px 8px 1px rgba(6,10,36,.18),0 5px 10px 1px rgba(6,10,36,.15),0 15px 30px 0 rgba(6,10,36,.16)\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-hover:before,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):hover:before {\n  opacity: 1\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-active,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):active {\n  -webkit-transform: translate3d(0,1px,0);\n          transform: translate3d(0,1px,0)\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-active:before,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):active:before {\n  opacity: 0\n}\n.c-bolt-button:before {\n  display: block;\n  position: absolute;\n  z-index: -5;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  content: \'\';\n  pointer-events: none;\n  border-radius: 3px;\n  -webkit-transform: translateY(-2px);\n          transform: translateY(-2px);\n  opacity: .2\n}\n.c-bolt-button--primary,\n.c-bolt-button--primary:visited {\n  border-color: rgba(var(--bolt-theme-primary), 1);\n  color: rgba(var(--bolt-theme-text-on-primary), 1);\n  background-color: rgba(var(--bolt-theme-primary), 1)\n}\n.c-bolt-button--primary.is-hover,\n.c-bolt-button--primary:hover {\n  border-color: rgba(var(--bolt-theme-primary-lighten-15), 1);\n  color: rgba(var(--bolt-theme-text-on-primary-lighten-15), 1);\n  background-color: rgba(var(--bolt-theme-primary-lighten-15), 1)\n}\n.c-bolt-button--primary.is-focus,\n.c-bolt-button--primary:focus {\n  border-color: rgba(var(--bolt-theme-primary-darken-15), 1);\n  background-color: rgba(var(--bolt-theme-primary-darken-15), 1);\n  color: rgba(var(--bolt-theme-text-on-primary-darken-15), 1)\n}\n.c-bolt-button--primary.is-active,\n.c-bolt-button--primary:active {\n  border-color: rgba(var(--bolt-theme-primary-darken-25), 1);\n  color: rgba(var(--bolt-theme-text-on-primary-darken-25), 1);\n  background-color: rgba(var(--bolt-theme-primary-darken-25), 1)\n}\n.c-bolt-button--secondary,\n.c-bolt-button--secondary:visited {\n  border-color: rgba(var(--bolt-theme-secondary), 1);\n  color: rgba(var(--bolt-theme-text-on-secondary), 1);\n  background-color: rgba(var(--bolt-theme-secondary), 1)\n}\n.c-bolt-button--secondary.is-hover,\n.c-bolt-button--secondary:hover {\n  border-color: rgba(var(--bolt-theme-secondary-lighten-5), 1);\n  color: rgba(var(--bolt-theme-text-on-secondary-lighten-5), 1);\n  background-color: rgba(var(--bolt-theme-secondary-lighten-5), 1)\n}\n.c-bolt-button--secondary.is-focus,\n.c-bolt-button--secondary:focus {\n  border-color: rgba(var(--bolt-theme-secondary-darken-3), 1);\n  color: rgba(var(--bolt-theme-text-on-secondary-darken-3), 1);\n  background-color: rgba(var(--bolt-theme-secondary-darken-3), 1)\n}\n.c-bolt-button--secondary.is-active,\n.c-bolt-button--secondary:active {\n  border-color: rgba(var(--bolt-theme-secondary-darken-10), 1);\n  color: rgba(var(--bolt-theme-text-on-secondary-darken-10), 1);\n  background-color: rgba(var(--bolt-theme-secondary-darken-10), 1)\n}\n.c-bolt-button--text {\n  text-decoration: none;\n  border-color: transparent;\n  background-color: transparent;\n  opacity: 1;\n  color: rgba(var(--bolt-theme-headline-link), 1)\n}\n.c-bolt-button--text,\n.c-bolt-button--text:before {\n  border-radius: 0;\n  box-shadow: none\n}\n.c-bolt-button--text:visited {\n  opacity: 1\n}\n.c-bolt-button--text:hover:not([disabled]) {\n  opacity: .8\n}\n.c-bolt-button--text:active,\n.c-bolt-button--text:focus:active {\n  opacity: .6\n}\n.c-bolt-button--disabled,\n.c-bolt-button[disabled] {\n  cursor: not-allowed\n}\n.c-bolt-button--disabled,\n.c-bolt-button--disabled:active,\n.c-bolt-button--disabled:hover,\n.c-bolt-button--disabled:visited,\n.c-bolt-button[disabled],\n.c-bolt-button[disabled]:active,\n.c-bolt-button[disabled]:hover,\n.c-bolt-button[disabled]:visited {\n  color: rgba(var(--bolt-theme-text-disabled), 1);\n  border-color: rgba(var(--bolt-theme-disabled), 1);\n  background-color: rgba(var(--bolt-theme-disabled), 1)\n}\n.c-bolt-button--disabled:active:before,\n.c-bolt-button--disabled:before,\n.c-bolt-button--disabled:hover:before,\n.c-bolt-button[disabled]:active:before,\n.c-bolt-button[disabled]:before,\n.c-bolt-button[disabled]:hover:before {\n  opacity: 1\n}\n.c-bolt-button--disabled,\n.c-bolt-button--disabled:active,\n.c-bolt-button--disabled:hover,\n.c-bolt-button[disabled],\n.c-bolt-button[disabled]:active,\n.c-bolt-button[disabled]:hover {\n  -webkit-transform: none;\n          transform: none\n}\n.c-bolt-button--uppercase {\n  text-transform: uppercase\n}\n.c-bolt-button--lowercase {\n  text-transform: lowercase\n}\n.c-bolt-button--capitalize {\n  text-transform: capitalize\n}\n.c-bolt-button--medium {\n  padding: .825rem 2rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--medium.c-bolt-button--icon-only {\n  padding: 2rem\n}\n.c-bolt-button--xxsmall {\n  padding: .103rem .25rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--xxsmall.c-bolt-button--icon-only {\n  padding: .25rem\n}\n.c-bolt-button--xsmall {\n  padding: .206rem .5rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--xsmall.c-bolt-button--icon-only {\n  padding: .5rem\n}\n.c-bolt-button--small {\n  padding: .412rem 1rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--small.c-bolt-button--icon-only {\n  padding: 1rem\n}\n.c-bolt-button--large {\n  padding: .825rem 2rem;\n  font-size: 1rem;\n  line-height: 1.65\n}\n.c-bolt-button--large.c-bolt-button--icon-only {\n  padding: 2rem\n}\n.c-bolt-button--xlarge {\n  padding: 1.65rem 4rem;\n  font-size: 1.111rem;\n  line-height: 1.45\n}\n.c-bolt-button--xlarge.c-bolt-button--icon-only {\n  padding: 4rem\n}\n.c-bolt-button--full,\nbolt-button[width=full] {\n  width: 100%\n}\n@media screen and (max-width:600px) {\n  .c-bolt-button--full\\@small,\n  bolt-button[width=\'full@small\'] {\n    width: 100%\n  }\n}\n.c-bolt-button--rounded,\n.c-bolt-button--rounded:before {\n  border-radius: 50rem\n}\n.c-bolt-button--center {\n  text-align: center;\n  -webkit-justify-content: center;\n          justify-content: center\n}\n.c-bolt-button--start {\n  text-align: left;\n  text-align: start;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start\n}\n.c-bolt-button--end {\n  text-align: right;\n  text-align: end;\n  -webkit-justify-content: flex-end;\n          justify-content: flex-end\n}\n.c-bolt-button__item + .c-bolt-button__icon:not(.is-empty) {\n  margin-left: .25rem\n}\n.c-bolt-button--icon-only .c-bolt-button__item + .c-bolt-button__icon:not(.is-empty) {\n  margin-left: 0\n}\n.c-bolt-button__icon:not(.is-empty) + .c-bolt-button__item {\n  margin-left: .5rem\n}\n.c-bolt-button--icon-only .c-bolt-button__icon:not(.is-empty) + .c-bolt-button__item {\n  margin-left: 0\n}\n.c-bolt-button__icon {\n  display: inline-block;\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  vertical-align: middle;\n  -webkit-align-self: center;\n          align-self: center;\n  transition: -webkit-transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;\n  text-align: center;\n  line-height: 1\n}',"",{version:3,sources:["/home/rhuser/bamboo/bamboo-home/xml-data/build-dir/5275649/PDND7-PDND8-JOB1/source/docroot/themes/custom/pegawww_theme/node_modules/@bolt/components-button/src/button.scss"],names:[],mappings:"AAAA;EACE,sBAAqB;EACrB,6BAAoB;EAApB,qBAAoB;EACpB,wBAAA;CACF;AACA;EACE,WAAU;EACV,6IAA4I;EAC5I,0CAAyC;EACzC,0BAAiB;KAAjB,uBAAiB;MAAjB,sBAAiB;UAAjB,kBAAiB;EACjB,iBAAgB;EAChB,2CAA0C;EAC1C,0EAAyE;EACzE,sBAAqB;EACrB,6BAAoB;EAApB,qBAAoB;EACpB,4BAAmB;UAAnB,oBAAmB;EACnB,qBAAY;UAAZ,aAAY;EACZ,4BAAmB;UAAnB,oBAAmB;EACnB,mBAAkB;EAClB,gBAAe;EACf,sBAAqB;EACrB,uBAAsB;EACtB,oBAAmB;EACnB,kBAAiB;EACjB,mBAAkB;EAClB,sCAA4B;UAA5B,6BAAA;CACF;AACA;EACE,qDAAoD;EACpD,yCAAA;CACF;AACA;;EAEE,oCAA2B;UAA3B,4BAA2B;EAC3B,4GAAA;CACF;AACA;;EAEE,UAAA;CACF;AACA;;EAEE,wCAA8B;UAA9B,+BAAA;CACF;AACA;;EAEE,UAAA;CACF;AACA;EACE,eAAc;EACd,mBAAkB;EAClB,YAAW;EACX,OAAM;EACN,QAAO;EACP,YAAW;EACX,aAAY;EACZ,YAAW;EACX,qBAAoB;EACpB,mBAAkB;EAClB,oCAA2B;UAA3B,4BAA2B;EAC3B,WAAA;CACF;AACA;;EAEE,iDAA0I;EAC1I,kDAAmK;EACnK,oDAAA;CACF;AACA;;EAEE,4DAAsL;EACtL,6DAA+M;EAC/M,+DAAA;CACF;AACA;;EAEE,2DAAkL;EAClL,+DAAsL;EACtL,2DAAA;CACF;AACA;;EAEE,2DAAkL;EAClL,4DAA2M;EAC3M,8DAAA;CACF;AACA;;EAEE,mDAAkJ;EAClJ,oDAA2K;EAC3K,sDAAA;CACF;AACA;;EAEE,6DAA0L;EAC1L,8DAAmN;EACnN,gEAAA;CACF;AACA;;EAEE,4DAAsL;EACtL,6DAA+M;EAC/M,+DAAA;CACF;AACA;;EAEE,6DAA0L;EAC1L,8DAAmN;EACnN,gEAAA;CACF;AACA;EACE,sBAAqB;EACrB,0BAAyB;EACzB,8BAA6B;EAC7B,WAAU;EACV,+CAAA;CACF;AACA;;EAEE,iBAAgB;EAChB,gBAAA;CACF;AACA;EACE,UAAA;CACF;AACA;EACE,WAAA;CACF;AACA;;EAEE,WAAA;CACF;AACA;;EAEE,mBAAA;CACF;AACA;;;;;;;;EAQE,gDAA2J;EAC3J,kDAA8I;EAC9I,qDAAA;CACF;AACA;;;;;;EAME,UAAA;CACF;AACA;;;;;;EAME,wBAAc;UAAd,eAAA;CACF;AACA;EACE,yBAAA;CACF;AACA;EACE,yBAAA;CACF;AACA;EACE,0BAAA;CACF;AACA;EACE,sBAAqB;EACrB,iBAAgB;EAChB,iBAAA;CACF;AACA;EACE,aAAA;CACF;AACA;EACE,wBAAuB;EACvB,iBAAgB;EAChB,iBAAA;CACF;AACA;EACE,eAAA;CACF;AACA;EACE,uBAAsB;EACtB,iBAAgB;EAChB,iBAAA;CACF;AACA;EACE,cAAA;CACF;AACA;EACE,sBAAqB;EACrB,iBAAgB;EAChB,iBAAA;CACF;AACA;EACE,aAAA;CACF;AACA;EACE,sBAAqB;EACrB,gBAAe;EACf,iBAAA;CACF;AACA;EACE,aAAA;CACF;AACA;EACE,sBAAqB;EACrB,oBAAmB;EACnB,iBAAA;CACF;AACA;EACE,aAAA;CACF;AACA;;EAEE,WAAA;CACF;AACA;EACE;;IAEE,WAAA;GACF;CACF;AACA;;EAEE,oBAAA;CACF;AACA;EACE,mBAAkB;EAClB,gCAAsB;UAAtB,uBAAA;CACF;AACA;EACE,iBAAgB;EAChB,kBAAiB;EACjB,oCAA0B;UAA1B,2BAAA;CACF;AACA;EACE,kBAAiB;EACjB,gBAAe;EACf,kCAAwB;UAAxB,yBAAA;CACF;AACA;EACE,mBAAA;CACF;AACA;EACE,cAAA;CACF;AACA;EACE,kBAAA;CACF;AACA;EACE,cAAA;CACF;AACA;EACE,sBAAqB;EACrB,6BAAoB;EAApB,qBAAoB;EACpB,uBAAsB;EACtB,2BAAkB;UAAlB,mBAAkB;EAClB,gDAAuC;EAAvC,wCAAuC;EAAvC,6EAAuC;EACvC,mBAAkB;EAClB,cAAA;CACF",file:"button.scss",sourcesContent:['bolt-button {\n  display: inline-block;\n  display: inline-flex;\n  -webkit-appearance: none\n}\n.c-bolt-button {\n  padding: 0;\n  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;\n  font-family: var(--bolt-font-family-body);\n  user-select: none;\n  font-weight: 600;\n  transition: .3s cubic-bezier(.25,.8,.25,1);\n  box-shadow: 0 1px 4px 1px rgba(6,10,36,.1),0 5px 10px 0 rgba(6,10,36,.08);\n  display: inline-block;\n  display: inline-flex;\n  align-items: center;\n  flex-grow: 1;\n  flex-direction: row;\n  position: relative;\n  cursor: pointer;\n  text-decoration: none;\n  vertical-align: middle;\n  border-style: solid;\n  border-width: 1px;\n  border-radius: 3px;\n  transform: translate3d(0,0,0)\n}\n.js-fonts-loaded .c-bolt-button {\n  font-family: "Open Sans","Helvetica Neue",sans-serif;\n  font-family: var(--bolt-font-family-body)\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-hover,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):hover {\n  transform: translateY(-2px);\n  box-shadow: 0 1px 8px 1px rgba(6,10,36,.18),0 5px 10px 1px rgba(6,10,36,.15),0 15px 30px 0 rgba(6,10,36,.16)\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-hover:before,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):hover:before {\n  opacity: 1\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-active,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):active {\n  transform: translate3d(0,1px,0)\n}\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]).is-active:before,\n.c-bolt-button:not(.c-bolt-button--disabled):not(.c-bolt-button--text):not([disabled]):active:before {\n  opacity: 0\n}\n.c-bolt-button:before {\n  display: block;\n  position: absolute;\n  z-index: -5;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  content: \'\';\n  pointer-events: none;\n  border-radius: 3px;\n  transform: translateY(-2px);\n  opacity: .2\n}\n.c-bolt-button--primary,\n.c-bolt-button--primary:visited {\n  border-color: \'bolt-themify({"xlight": ["primary", "1"], "light": ["primary", "1"], "dark": ["primary", "1"], "xdark": ["primary", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-primary", "1"], "light": ["text-on-primary", "1"], "dark": ["text-on-primary", "1"], "xdark": ["text-on-primary", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["primary", "1"], "light": ["primary", "1"], "dark": ["primary", "1"], "xdark": ["primary", "1"]})\'\n}\n.c-bolt-button--primary.is-hover,\n.c-bolt-button--primary:hover {\n  border-color: \'bolt-themify({"xlight": ["primary-lighten-15", "1"], "light": ["primary-lighten-15", "1"], "dark": ["primary-lighten-15", "1"], "xdark": ["primary-lighten-15", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-primary-lighten-15", "1"], "light": ["text-on-primary-lighten-15", "1"], "dark": ["text-on-primary-lighten-15", "1"], "xdark": ["text-on-primary-lighten-15", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["primary-lighten-15", "1"], "light": ["primary-lighten-15", "1"], "dark": ["primary-lighten-15", "1"], "xdark": ["primary-lighten-15", "1"]})\'\n}\n.c-bolt-button--primary.is-focus,\n.c-bolt-button--primary:focus {\n  border-color: \'bolt-themify({"xlight": ["primary-darken-15", "1"], "light": ["primary-darken-15", "1"], "dark": ["primary-darken-15", "1"], "xdark": ["primary-darken-15", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["primary-darken-15", "1"], "light": ["primary-darken-15", "1"], "dark": ["primary-darken-15", "1"], "xdark": ["primary-darken-15", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-primary-darken-15", "1"], "light": ["text-on-primary-darken-15", "1"], "dark": ["text-on-primary-darken-15", "1"], "xdark": ["text-on-primary-darken-15", "1"]})\'\n}\n.c-bolt-button--primary.is-active,\n.c-bolt-button--primary:active {\n  border-color: \'bolt-themify({"xlight": ["primary-darken-25", "1"], "light": ["primary-darken-25", "1"], "dark": ["primary-darken-25", "1"], "xdark": ["primary-darken-25", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-primary-darken-25", "1"], "light": ["text-on-primary-darken-25", "1"], "dark": ["text-on-primary-darken-25", "1"], "xdark": ["text-on-primary-darken-25", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["primary-darken-25", "1"], "light": ["primary-darken-25", "1"], "dark": ["primary-darken-25", "1"], "xdark": ["primary-darken-25", "1"]})\'\n}\n.c-bolt-button--secondary,\n.c-bolt-button--secondary:visited {\n  border-color: \'bolt-themify({"xlight": ["secondary", "1"], "light": ["secondary", "1"], "dark": ["secondary", "1"], "xdark": ["secondary", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-secondary", "1"], "light": ["text-on-secondary", "1"], "dark": ["text-on-secondary", "1"], "xdark": ["text-on-secondary", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["secondary", "1"], "light": ["secondary", "1"], "dark": ["secondary", "1"], "xdark": ["secondary", "1"]})\'\n}\n.c-bolt-button--secondary.is-hover,\n.c-bolt-button--secondary:hover {\n  border-color: \'bolt-themify({"xlight": ["secondary-lighten-5", "1"], "light": ["secondary-lighten-5", "1"], "dark": ["secondary-lighten-5", "1"], "xdark": ["secondary-lighten-5", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-secondary-lighten-5", "1"], "light": ["text-on-secondary-lighten-5", "1"], "dark": ["text-on-secondary-lighten-5", "1"], "xdark": ["text-on-secondary-lighten-5", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["secondary-lighten-5", "1"], "light": ["secondary-lighten-5", "1"], "dark": ["secondary-lighten-5", "1"], "xdark": ["secondary-lighten-5", "1"]})\'\n}\n.c-bolt-button--secondary.is-focus,\n.c-bolt-button--secondary:focus {\n  border-color: \'bolt-themify({"xlight": ["secondary-darken-3", "1"], "light": ["secondary-darken-3", "1"], "dark": ["secondary-darken-3", "1"], "xdark": ["secondary-darken-3", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-secondary-darken-3", "1"], "light": ["text-on-secondary-darken-3", "1"], "dark": ["text-on-secondary-darken-3", "1"], "xdark": ["text-on-secondary-darken-3", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["secondary-darken-3", "1"], "light": ["secondary-darken-3", "1"], "dark": ["secondary-darken-3", "1"], "xdark": ["secondary-darken-3", "1"]})\'\n}\n.c-bolt-button--secondary.is-active,\n.c-bolt-button--secondary:active {\n  border-color: \'bolt-themify({"xlight": ["secondary-darken-10", "1"], "light": ["secondary-darken-10", "1"], "dark": ["secondary-darken-10", "1"], "xdark": ["secondary-darken-10", "1"]})\';\n  color: \'bolt-themify({"xlight": ["text-on-secondary-darken-10", "1"], "light": ["text-on-secondary-darken-10", "1"], "dark": ["text-on-secondary-darken-10", "1"], "xdark": ["text-on-secondary-darken-10", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["secondary-darken-10", "1"], "light": ["secondary-darken-10", "1"], "dark": ["secondary-darken-10", "1"], "xdark": ["secondary-darken-10", "1"]})\'\n}\n.c-bolt-button--text {\n  text-decoration: none;\n  border-color: transparent;\n  background-color: transparent;\n  opacity: 1;\n  color: \'bolt-themify({"xlight": ["headline-link", "1"], "light": ["headline-link", "1"], "dark": ["headline-link", "1"], "xdark": ["headline-link", "1"]})\'\n}\n.c-bolt-button--text,\n.c-bolt-button--text:before {\n  border-radius: 0;\n  box-shadow: none\n}\n.c-bolt-button--text:visited {\n  opacity: 1\n}\n.c-bolt-button--text:hover:not([disabled]) {\n  opacity: .8\n}\n.c-bolt-button--text:active,\n.c-bolt-button--text:focus:active {\n  opacity: .6\n}\n.c-bolt-button--disabled,\n.c-bolt-button[disabled] {\n  cursor: not-allowed\n}\n.c-bolt-button--disabled,\n.c-bolt-button--disabled:active,\n.c-bolt-button--disabled:hover,\n.c-bolt-button--disabled:visited,\n.c-bolt-button[disabled],\n.c-bolt-button[disabled]:active,\n.c-bolt-button[disabled]:hover,\n.c-bolt-button[disabled]:visited {\n  color: \'bolt-themify({"xlight": ["text-disabled", "1"], "light": ["text-disabled", "1"], "dark": ["text-disabled", "1"], "xdark": ["text-disabled", "1"]})\';\n  border-color: \'bolt-themify({"xlight": ["disabled", "1"], "light": ["disabled", "1"], "dark": ["disabled", "1"], "xdark": ["disabled", "1"]})\';\n  background-color: \'bolt-themify({"xlight": ["disabled", "1"], "light": ["disabled", "1"], "dark": ["disabled", "1"], "xdark": ["disabled", "1"]})\'\n}\n.c-bolt-button--disabled:active:before,\n.c-bolt-button--disabled:before,\n.c-bolt-button--disabled:hover:before,\n.c-bolt-button[disabled]:active:before,\n.c-bolt-button[disabled]:before,\n.c-bolt-button[disabled]:hover:before {\n  opacity: 1\n}\n.c-bolt-button--disabled,\n.c-bolt-button--disabled:active,\n.c-bolt-button--disabled:hover,\n.c-bolt-button[disabled],\n.c-bolt-button[disabled]:active,\n.c-bolt-button[disabled]:hover {\n  transform: none\n}\n.c-bolt-button--uppercase {\n  text-transform: uppercase\n}\n.c-bolt-button--lowercase {\n  text-transform: lowercase\n}\n.c-bolt-button--capitalize {\n  text-transform: capitalize\n}\n.c-bolt-button--medium {\n  padding: .825rem 2rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--medium.c-bolt-button--icon-only {\n  padding: 2rem\n}\n.c-bolt-button--xxsmall {\n  padding: .103rem .25rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--xxsmall.c-bolt-button--icon-only {\n  padding: .25rem\n}\n.c-bolt-button--xsmall {\n  padding: .206rem .5rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--xsmall.c-bolt-button--icon-only {\n  padding: .5rem\n}\n.c-bolt-button--small {\n  padding: .412rem 1rem;\n  font-size: .8rem;\n  line-height: 1.45\n}\n.c-bolt-button--small.c-bolt-button--icon-only {\n  padding: 1rem\n}\n.c-bolt-button--large {\n  padding: .825rem 2rem;\n  font-size: 1rem;\n  line-height: 1.65\n}\n.c-bolt-button--large.c-bolt-button--icon-only {\n  padding: 2rem\n}\n.c-bolt-button--xlarge {\n  padding: 1.65rem 4rem;\n  font-size: 1.111rem;\n  line-height: 1.45\n}\n.c-bolt-button--xlarge.c-bolt-button--icon-only {\n  padding: 4rem\n}\n.c-bolt-button--full,\nbolt-button[width=full] {\n  width: 100%\n}\n@media screen and (max-width:600px) {\n  .c-bolt-button--full\\@small,\n  bolt-button[width=\'full@small\'] {\n    width: 100%\n  }\n}\n.c-bolt-button--rounded,\n.c-bolt-button--rounded:before {\n  border-radius: 50rem\n}\n.c-bolt-button--center {\n  text-align: center;\n  justify-content: center\n}\n.c-bolt-button--start {\n  text-align: left;\n  text-align: start;\n  justify-content: flex-start\n}\n.c-bolt-button--end {\n  text-align: right;\n  text-align: end;\n  justify-content: flex-end\n}\n.c-bolt-button__item + .c-bolt-button__icon:not(.is-empty) {\n  margin-left: .25rem\n}\n.c-bolt-button--icon-only .c-bolt-button__item + .c-bolt-button__icon:not(.is-empty) {\n  margin-left: 0\n}\n.c-bolt-button__icon:not(.is-empty) + .c-bolt-button__item {\n  margin-left: .5rem\n}\n.c-bolt-button--icon-only .c-bolt-button__icon:not(.is-empty) + .c-bolt-button__item {\n  margin-left: 0\n}\n.c-bolt-button__icon {\n  display: inline-block;\n  display: inline-flex;\n  vertical-align: middle;\n  align-self: center;\n  transition: transform 150ms ease-in-out;\n  text-align: center;\n  line-height: 1\n}'],sourceRoot:""}])},"./node_modules/@bolt/components-button/src/button.standalone.js":function(e,t,n){"use strict";n.r(t),n.d(t,"BoltButton",function(){return S});var o,r,l,i=n("./node_modules/@bolt/core/utils/index.js"),a=n("./node_modules/@bolt/core/renderers/index.js"),s=n("./node_modules/classnames/bind.js"),c=n.n(s),u=n("./node_modules/@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss"),d=n.n(u),f=n("./node_modules/@bolt/components-button/src/button.scss?86f9"),b=n.n(f);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){var e=_(["\n      ","\n      ","\n    "]);return m=function(){return e},e}function h(){var e=_(['<button class="','"></button>']);return h=function(){return e},e}function v(){var e=_(['<a href="','" class="','" target="','"></a>']);return v=function(){return e},e}function y(){var e=_(["<slot/>"]);return y=function(){return e},e}function g(){var e=_(['\n            <span class="','">',"</span>"]);return g=function(){return e},e}function j(){var e=_(['<slot name="','" />']);return j=function(){return e},e}function O(){var e=_(['\n            <span class="','">',"</span>"]);return O=function(){return e},e}function _(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function w(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function C(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function x(e,t,n){return(x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=z(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function z(e){return(z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var k=c.a.bind(b.a),S=Object(i.e)((l=r=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=n=C(this,z(t).call(this,e))).useShadow=i.f,C(n,e)}var n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(t,Object(a.c)()),n=t,(o=[{key:"connecting",value:function(){var e=this;this.childNodes.forEach(function(t,n){if("BUTTON"===t.tagName||"A"===t.tagName){for(e.rootElement=document.createDocumentFragment();t.firstChild;)e.appendChild(t.firstChild);t.className&&(t.className=Object(i.k)(t)),t.getAttribute("is")&&"shadow-root"===t.getAttribute("is")&&t.removeAttribute("is"),e.rootElement.appendChild(t)}}),Object(i.a)(this,function(){this.addEventListener("click",this.clickHandler)})}},{key:"rendered",value:function(){x(z(t.prototype),"rendered",this).call(this),i.f&&this.useShadow&&(this.observer=Object(i.n)(this),this.observer.observe(this,{attributes:!1,childList:!0,characterData:!1}))}},{key:"disconnecting",value:function(){this.removeEventListener("click",this.clickHandler),i.f&&this.useShadow&&this.observer.disconnect()}},{key:"clickHandler",value:function(e){Object(i.d)(this)}},{key:"render",value:function(){var e,t=this,n=k("c-bolt-button",(A(e={"c-bolt-button--rounded":this.props.rounded,"c-bolt-button--disabled":this.props.disabled,"c-bolt-button--icon-only":this.props.iconOnly,"c-bolt-button--center":!this.props.align},"c-bolt-button--".concat(this.props.align),this.props.align),A(e,"c-bolt-button--primary",!this.props.color),A(e,"c-bolt-button--".concat(this.props.color),this.props.color),A(e,"c-bolt-button--medium",!this.props.size),A(e,"c-bolt-button--".concat(this.props.size),this.props.size),A(e,"c-bolt-button--".concat(this.props.width),this.props.width),A(e,"c-bolt-button--".concat(this.props.transform),this.props.transform),e)),o=this.props.url.length>0&&"null"!==this.props.url,r=this.props.target&&o?this.props.target:"_self",l=null,i=function(e){switch(e){case"before":case"after":var n=k("c-bolt-button__icon",{"is-empty":e in t.slots==0});return Object(a.b)(t)(O(),n,e in t.slots?t.slot(e):Object(a.b)(t)(j(),e));default:var o=k("c-bolt-button__item",{"is-empty":e in t.slots==0,"u-bolt-visuallyhidden":t.props.iconOnly});return Object(a.b)(t)(g(),o,e in t.slots?t.slot("default"):Object(a.b)(t)(y()))}},s=[i("before"),i("default"),i("after")];return this.rootElement?(l=this.rootElement.firstChild.cloneNode(!0)).className+=" "+n:l=o?Object(a.b)()(v(),this.props.url,n,r):Object(a.b)()(h(),n),l=function(e){for(var t=0;t<s.length;t++){var n=s[t];void 0!==n&&e.appendChild(n)}return e}(l),this.html(m(),this.addStyles([b.a,d.a]),l)}}])&&w(n.prototype,o),t}(),r.is="bolt-button",r.props={color:i.i.string,text:i.i.string,size:i.i.string,rounded:i.i.boolean,iconOnly:i.i.boolean,width:i.i.string,align:i.i.string,transform:i.i.string,disabled:i.i.boolean,target:i.i.string,url:i.i.string,onClick:i.i.string,onClickTarget:i.i.string},o=l))||o},"./node_modules/@bolt/components-card/src/card.scss":function(e,t,n){},"./node_modules/@bolt/components-chip/src/chip.scss":function(e,t,n){},"./node_modules/@bolt/components-copy-to-clipboard/src/copy-to-clipboard.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){n.e(40).then(n.bind(null,"./node_modules/@bolt/components-copy-to-clipboard/src/copy-to-clipboard.standalone.js"))})},"./node_modules/@bolt/components-copy-to-clipboard/src/copy-to-clipboard.scss":function(e,t,n){},"./node_modules/@bolt/components-device-viewer/src/device-viewer.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){n.e(36).then(n.bind(null,"./node_modules/@bolt/components-device-viewer/src/device-viewer.standalone.js"))})},"./node_modules/@bolt/components-device-viewer/src/device-viewer.scss":function(e,t,n){},"./node_modules/@bolt/components-figure/src/figure.scss":function(e,t,n){},"./node_modules/@bolt/components-form/src/form.js":function(e,t){for(var n=document.querySelectorAll(".c-bolt-input"),o=function(e,t){var o=n[e];o.value&&o.classList.add("is-filled"),o.onchange=function(){o.value?o.classList.add("is-filled"):o.classList.remove("is-filled")},o.onfocus=function(){o.classList.remove("is-touched"),o.classList.remove("is-invalid"),o.errors&&o.errors.remove()},o.onblur=function(e){if(e.isTrusted&&(o.classList.add("is-touched"),o.validationMessage)){var t=document.createElement("div"),n=document.createTextNode(o.validationMessage);t.classList.add("c-bolt-input-message"),t.classList.add("c-bolt-input-message--invalid"),t.appendChild(n),o.errors=o.insertAdjacentElement("afterend",t)}}},r=0,l=n.length;r<l;r++)o(r);var i=document.querySelectorAll(".c-bolt-custom-input"),a=function(e,t){var n=i[e],o=n.querySelector(".c-bolt-input");o.onfocus=function(){n.classList.add("is-active")},o.onblur=function(){n.classList.remove("is-active")}};for(r=0,l=i.length;r<l;r++)a(r)},"./node_modules/@bolt/components-form/src/form.scss":function(e,t,n){},"./node_modules/@bolt/components-grid/src/grid.scss":function(e,t,n){},"./node_modules/@bolt/components-headline/src/headline.scss":function(e,t,n){},"./node_modules/@bolt/components-icon/src/icon.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){n.e(32).then(n.bind(null,"./node_modules/@bolt/components-icon/src/icon.standalone.js"))})},"./node_modules/@bolt/components-icon/src/icon.scss?9a58":function(e,t,n){},"./node_modules/@bolt/components-icons/src/index.js":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/@bolt/core/renderers/index.js");function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var l=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",r({"data-name":"Layer 1"},n,{viewBox:"0 0 28 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M14 32a.37.37 0 0 1-.3-.1C13.5 31.9 0 26.8 0 11.7V.9A.92.92 0 0 1 1 0h26a1 1 0 0 1 1 .9v10.8c0 15.1-13.5 20.2-13.7 20.2a.37.37 0 0 1-.3.1zM1.9 1.9v9.8C1.9 24.2 12 29.2 14 30c2-.9 12.1-5.7 12.1-18.3V1.9zm10.5 16.6a.91.91 0 0 1-.7-.3L8 14.5a.85.85 0 0 1 0-1.3 1 1 0 0 1 1.4 0l3 3 6.3-6.1a1 1 0 0 1 1.4 0 .85.85 0 0 1 0 1.3l-7 6.8a1.08 1.08 0 0 1-.7.3z"}))};function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var a=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",i({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1"}),Object(o.a)("path",{d:"M16 11h-3V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1"}))))};function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var c=function(e){var t=e.bgColor,n=e.fgColor,r=(e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",s({},r,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("circle",{cx:"11",cy:"11",r:"11",fill:t,transform:"translate(1 1)"}),Object(o.a)("path",{fill:n,d:"M16 11h-3V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1"})))};function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var d=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",u({"data-name":"Layer 1"},n,{viewBox:"0 0 31.97 31.7"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M31.9 25.6a1.1 1.1 0 0 1 0 .8c0 .1-.1.2-.2.3L27 31.4a.91.91 0 0 1-.7.3 1.08 1.08 0 0 1-.7-.3 1 1 0 0 1 0-1.4l.8-.8 2.3-2.2h-11a13.49 13.49 0 0 1-8.6-3.1l-1.2-1.2A13.45 13.45 0 0 1 5.1 8.6 13.68 13.68 0 0 1 14.4.4a12.42 12.42 0 0 1 3.3-.4 13.65 13.65 0 0 1 13.6 13.5 10.9 10.9 0 0 1-.3 2.6 11.64 11.64 0 0 1-1.3 3.7.22.22 0 0 1-.2.2L28 18.6a11.73 11.73 0 0 1 .5-1.1 13.32 13.32 0 0 0 .5-1.9 14.92 14.92 0 0 0 .2-2.1A11.52 11.52 0 0 0 7 9.2a12.17 12.17 0 0 0-.8 4.3 11.69 11.69 0 0 0 2.4 7.1c.3.4.6.7.9 1.1a11.51 11.51 0 0 0 8.1 3.4h10.9l-.3-.3-2-2-.7-.7a1 1 0 0 1 1.4-1.4l2.2 2.2 2.5 2.5.1.1c.1-.2.2-.1.2.1zm-24.5-.7a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z","data-name":"path-1"}))};function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var b=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",f({"data-name":"Layer 1"},n,{viewBox:"0 0 30 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M28 8H2V3a.94.94 0 0 1 1-1h24a.94.94 0 0 1 1 1zm0 19a.94.94 0 0 1-1 1H3a.94.94 0 0 1-1-1V10h26zm1-27H1a.94.94 0 0 0-1 1v28a.94.94 0 0 0 1 1h28a.94.94 0 0 0 1-1V1a.94.94 0 0 0-1-1zM8 6h2V4H8zm4 0h2V4h-2zM4 6h2V4H4zm10 18h2v-4h4v-2h-4v-4h-2v4h-4v2h4z","data-name":"Page-1"}))};function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var m=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",p({"data-name":"Layer 1"},n,{viewBox:"0 0 31.8 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M14.9 2.6v9.9a1 1 0 0 0 2 0V2.6l11.7 5.8-12.7 6.4L3.2 8.5zm2 13.9L29.8 10v11.8L20 17a1 1 0 1 0-.9 1.7l9.5 4.7-11.7 6zm-3.5.8a.88.88 0 0 0-1.3-.4L2 21.9V10.1l12.9 6.4v12.8L3.2 23.5l9.8-4.9a.88.88 0 0 0 .4-1.3zm18.4-8.8a.37.37 0 0 0-.1-.3v-.1a.22.22 0 0 0-.2-.2v-.1c-.1-.1-.2-.1-.2-.2L16.3.1c-.1-.1-.2-.1-.4-.1s-.3 0-.4.1L.5 7.6a.22.22 0 0 0-.2.2v.1c-.1 0-.2 0-.2.1v.1c0 .1-.1.2-.1.3V24c0 .1.1.1.1.2v.1c.1.1.1.1.2.1l14.9 7.5a2.25 2.25 0 0 0 .7.1c.2 0 .3 0 .4-.1l14.9-7.5c.1 0 .1-.1.2-.1v-.1a.35.35 0 0 0 .1-.2V8.5z","data-name":"path-1"}))};function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var v=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",h({},n,{viewBox:"0 0 18 14"}),Object(o.a)("path",{fill:t,"fill-rule":"nonzero",d:"M.083 7.378a1.181 1.181 0 0 1-.069-.318v-.105a.951.951 0 0 1 .069-.33c.044-.112.1-.193.162-.274.03-.036.043-.049.055-.06l6-6a1.005 1.005 0 0 1 1.413 0 1.004 1.004 0 0 1 0 1.412L3.419 5.997H17c.55 0 1 .45 1 1s-.45 1-1 1H3.413l4.294 4.294a1.005 1.005 0 0 1 0 1.413.999.999 0 0 1-1.412 0L.301 7.71C.282 7.685.27 7.666.257 7.654a1.128 1.128 0 0 1-.174-.276z"}))};function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var g=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",y({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:t,"fill-rule":"evenodd"},Object(o.a)("path",{d:"M11 20h2V4h-2v16zm2-18h-2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM19 20h2V9h-2v11zm2-13h-2c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM3 20h2v-6H3v6zm2-8H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z"})))};function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var O=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",j({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:t,"fill-rule":"evenodd"},Object(o.a)("path",{d:"M8.5 8c.275 0 .5.225.5.5s-.225.5-.5.5a.501.501 0 0 1-.5-.5c0-.275.225-.5.5-.5m0 3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"}),Object(o.a)("path",{d:"M19 20H7.412L16 11.413l4 4v3.588c0 .55-.45 1-1 1V20zM4 5c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v7.587l-3.294-3.294a1.005 1.005 0 0 0-1.413 0L4.649 19.937a1 1 0 0 1-.65-.938v-14L4 5zm18 10V5c0-1.656-1.344-3-3-3H5C3.344 2 2 3.344 2 5v14a3.002 3.002 0 0 0 2.988 3H19c1.656 0 3-1.344 3-3v-4z"})))};function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var A=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",_({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",{fill:t,d:"M5.428 5.54a.74.74 0 0 0-.737-.738H1.737a.74.74 0 0 0 0 1.48h2.954c.406 0 .737-.331.737-.741"}),Object(o.a)("path",{fill:t,d:"M22.14 5.477c0-.01-.006-.015-.006-.024a.726.726 0 0 0-.183-.441c-.01-.013-.004-.032-.017-.043-.01-.013-.031-.007-.042-.018-.028-.024-.061-.04-.092-.061l-2.873-2.878a.709.709 0 1 0-1.002 1.002l1.74 1.745h-7.057a3.031 3.031 0 0 0-3.02-2.913 3.038 3.038 0 0 0-3.034 3.033v7.33l-.244-.243c-.984-.99-2.723-.987-3.707-.002a2.598 2.598 0 0 0-.766 1.854c0 .701.271 1.36.689 1.767l4.803 6.21a.92.92 0 0 0 1.295.166.923.923 0 0 0 .166-1.294l-4.882-6.3a.768.768 0 0 1-.225-.55c0-.206.08-.402.225-.546a.797.797 0 0 1 1.097 0l1.819 1.819a.916.916 0 0 0 1.006.2.92.92 0 0 0 .57-.852v-9.56a1.19 1.19 0 0 1 1.187-1.186c.656 0 1.187.533 1.187 1.187v6.059c0 .399.253.751.632.877l4.13 1.377a3.32 3.32 0 0 1 2.272 3.153v4.885a.922.922 0 1 0 1.846 0v-4.885c0-2.228-1.42-4.2-3.535-4.905l-3.499-1.167V6.238h7.045l-1.74 1.744a.709.709 0 1 0 1.002 1.003L21.8 6.107c.031-.02.064-.037.09-.061.013-.011.031-.008.044-.019.013-.01.008-.031.017-.044a.737.737 0 0 0 .183-.438c0-.009.005-.016.003-.027.002-.008.006-.013.006-.02 0-.008-.004-.015-.004-.021",mask:"url(#mask-2)",transform:"translate(1 .044)"})))};function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var C=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",w({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",{fill:t,d:"M22.734 3.2l-1.929-1.927C19.996.428 18.986 0 17.805 0c-1.174 0-2.178.393-2.999 1.18l-2.05 2.096c-.276.253-.419.535-.426.84-.007.31.131.61.41.889a1.2 1.2 0 0 0 1.714 0l2.07-2.07c.327-.327.781-.476 1.27-.467.537.012.96.179 1.292.512l1.947 1.947c.351.328.521.742.521 1.268 0 .533-.16.95-.489 1.28l-6.524 6.526c-.369.367-.848.565-1.468.603-.604.036-1.017-.098-1.319-.423l-.804-.804-.668-.668c-.28-.303-.575-.447-.902-.446a1.063 1.063 0 0 0-.795.406c-.3.254-.456.54-.463.852-.006.319.143.622.433.888l1.453 1.454.027.307h.342c.698.57 1.557.858 2.556.858.054 0 .108-.001.161-.003.94-.028 1.781-.294 2.506-.79l.09.089.34-.34c.028-.03.068-.076.118-.144l6.684-6.658C23.607 8.372 24 7.368 24 6.195c0-1.181-.429-2.19-1.266-2.994m-11.47 15.714c.313.308.45.604.45.915 0 .31-.137.607-.41.88l-2.056 2.054C8.424 23.59 7.432 24 6.285 24c-1.144 0-2.149-.408-2.988-1.213L1.22 20.71C.41 19.864 0 18.859 0 17.715c0-1.147.41-2.14 1.22-2.95l6.795-6.794a4.035 4.035 0 0 1 2.95-1.221c1.147 0 2.14.41 2.95 1.22l1.574 1.576c.271.227.427.514.433.825.006.319-.143.622-.447.902-.47.474-1.242.443-1.7-.013L12.2 9.685c-.662-.663-1.765-.658-2.484.012L2.934 16.48a1.775 1.775 0 0 0-.489 1.258c0 .487.16.883.49 1.213l2.114 2.115c.663.662 1.764.657 2.484-.012l2.054-2.1c.15-.15.413-.324.837-.324.322 0 .604.096.84.285",mask:"url(#mask-2)"})))};function x(){return(x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var z=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",x({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:t,"fill-rule":"evenodd"},Object(o.a)("path",{d:"M5.25 12.5v8.75c0 .69-.561 1.25-1.25 1.25h-.75c-.689 0-1.25-.56-1.25-1.25V12.5h3.25zM22.5 2v19.25c0 .69-.561 1.25-1.25 1.25H6.989c.173-.401.261-.82.261-1.25V2H22.5zM5.25 0v10.5H0v10.75a3.254 3.254 0 0 0 3.25 3.25h18a3.254 3.254 0 0 0 3.25-3.25V0H5.25z"}),Object(o.a)("path",{d:"M8.25 5H21.5V3H8.25zM8.25 17.75H21.5v-2H8.25zM8.25 20.75H21.5v-2H8.25zM10.251 12.75h9.25V8h-9.25v4.75zm-2 2h13.25V6H8.251v8.75z"})))};function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var k=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",E({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M19.651 8.87c-.573 0-1.043.47-1.043 1.043V12a6.271 6.271 0 0 1-6.26 6.261c-3.45 0-6.26-2.81-6.26-6.26V9.912c0-.574-.47-1.044-1.044-1.044C4.47 8.87 4 9.34 4 9.913V12c0 4.252 3.188 7.767 7.304 8.283v1.631h-3.13c-.575 0-1.044.47-1.044 1.044C7.13 23.53 7.6 24 8.173 24h8.348c.574 0 1.043-.47 1.043-1.043 0-.574-.469-1.044-1.043-1.044h-3.13v-1.63c4.115-.517 7.304-4.032 7.304-8.284V9.913c0-.574-.47-1.044-1.044-1.044"}),Object(o.a)("path",{fill:t,d:"M10.26 4.174c0-1.147.94-2.087 2.088-2.087 1.147 0 2.087.94 2.087 2.087v7.825c0 1.149-.94 2.087-2.087 2.087a2.092 2.092 0 0 1-2.087-2.087V4.174zm2.088 11.999a4.178 4.178 0 0 0 4.174-4.174V4.174A4.178 4.178 0 0 0 12.348 0a4.178 4.178 0 0 0-4.174 4.174v7.825a4.178 4.178 0 0 0 4.174 4.174z"})))};function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var P=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",S({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:t,"fill-rule":"evenodd"},Object(o.a)("path",{d:"M21 3.283v12.434a.285.285 0 0 1-.291.276H3.291A.285.285 0 0 1 3 15.717V3.283c0-.152.131-.276.291-.276h17.418c.16 0 .291.124.291.276M23 1H1a1.001 1.001 0 0 0 0 2h.001L1 3.044v12.912c0 1.128.962 2.046 2.144 2.046h6.088l-2.096 3.52a.961.961 0 0 0-.102.748c.07.258.237.472.472.605a1.014 1.014 0 0 0 1.357-.358l2.688-4.515h.898l2.689 4.516c.185.311.521.485.865.484.168 0 .337-.04.491-.127a.983.983 0 0 0 .472-.603.968.968 0 0 0-.103-.752l-2.095-3.518h6.089c1.182 0 2.143-.918 2.143-2.046V3.044L22.999 3H23a1.001 1.001 0 0 0 0-2"}),Object(o.a)("path",{d:"M18.972 5.024h-.001a.99.99 0 0 0-.708.295l-4.406 5.288-4.092-3.26-.008-.01v-.024l-.052-.029a.981.981 0 0 0-1.38.006L4.26 11.354a.976.976 0 1 0 .691 1.67.981.981 0 0 0 .693-.285l3.41-3.41 4.22 3.371.013.012c.19.19.44.292.7.292h.008c.284-.01.526-.1.774-.366l4.91-5.902a1.004 1.004 0 0 0-.708-1.712"})))};function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var B=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",M({"xmlns:xlink":"http://www.w3.org/1999/xlink"},n,{viewBox:"0 0 24 24"}),Object(o.a)("defs",null,Object(o.a)("path",{id:"a",d:"M0 1V0h20v2H0V1z"})),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",{fill:t,d:"M3 11h14c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1"}),Object(o.a)("g",{transform:"translate(2 5)"},Object(o.a)("mask",{id:"b",fill:"#fff"},Object(o.a)("use",{"xlink:href":"#a"})),Object(o.a)("path",{fill:t,d:"M1 2h18c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1s.45 1 1 1",mask:"url(#b)"})),Object(o.a)("path",{fill:t,d:"M21 13H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1M17 17H3c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1"})))};function L(){return(L=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var H=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",L({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M21.914 15.535l-4.467-3.188 4.467-3.189v6.378zm-7.305 2.03c0 .573-.468 1.042-1.043 1.042H3.131a1.046 1.046 0 0 1-1.043-1.043V7.13c0-.573.47-1.043 1.043-1.043h10.435c.575 0 1.043.47 1.043 1.043v10.435zm8.825-11.36a1.044 1.044 0 0 0-1.083.077l-5.656 4.037V7.13A3.13 3.13 0 0 0 13.565 4H3.13A3.132 3.132 0 0 0 0 7.13v10.435a3.132 3.132 0 0 0 3.13 3.13h10.435a3.13 3.13 0 0 0 3.13-3.13v-3.189l5.656 4.037a1.028 1.028 0 0 0 1.082.08c.345-.177.567-.536.567-.927V7.131c0-.39-.215-.75-.567-.926h.001z"})))};function N(){return(N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var T=function(e){e.bgColor,e.fgColor,e.size;var t=function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]);return Object(o.a)("svg",N({},t,{viewBox:"0 0 198 182"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",{fill:"#FFCC4C",d:"M72.75 49h52.5c.966 0 1.75.784 1.75 1.75v31.5a1.75 1.75 0 0 1-1.75 1.75h-52.5A1.75 1.75 0 0 1 71 82.25v-31.5c0-.966.784-1.75 1.75-1.75z"}),Object(o.a)("path",{fill:"#F63",d:"M1.067 78.751l16.659-28.876A1.75 1.75 0 0 1 19.242 49H55.25c.966 0 1.75.784 1.75 1.75v31.5A1.75 1.75 0 0 1 55.25 84H4.098a3.5 3.5 0 0 1-3.031-5.249z"}),Object(o.a)("path",{fill:"#E1E2EB",d:"M141 82.25v-31.5c0-.966.784-1.75 1.75-1.75h36.008a1.75 1.75 0 0 1 1.516.875l16.66 28.876A3.5 3.5 0 0 1 193.901 84H142.75a1.75 1.75 0 0 1-1.75-1.75z"}),Object(o.a)("path",{fill:"#F63",d:"M85 1.75v31.5A1.75 1.75 0 0 1 83.25 35H29.338a1.75 1.75 0 0 1-1.516-2.625L42.459 7.004A14 14 0 0 1 54.586 0H83.25C84.216 0 85 .784 85 1.75z"}),Object(o.a)("path",{fill:"#FFCC4C",d:"M100.75 0h42.664a14 14 0 0 1 12.127 7.004l14.637 25.371A1.75 1.75 0 0 1 168.662 35H100.75A1.75 1.75 0 0 1 99 33.25V1.75c0-.966.784-1.75 1.75-1.75z"}),Object(o.a)("path",{fill:"#6C79D9",d:"M42.46 174.996l-14.638-25.371A1.75 1.75 0 0 1 29.338 147H97.25c.966 0 1.75.784 1.75 1.75v31.5a1.75 1.75 0 0 1-1.75 1.75H54.586a14 14 0 0 1-12.127-7.004z"}),Object(o.a)("path",{fill:"#12B3B3",d:"M114.75 147h53.912a1.75 1.75 0 0 1 1.516 2.625l-14.637 25.371A14 14 0 0 1 143.414 182H114.75a1.75 1.75 0 0 1-1.75-1.75v-31.5c0-.966.784-1.75 1.75-1.75z"}),Object(o.a)("path",{fill:"#6C79D9",d:"M71 99.75v31.5a1.75 1.75 0 0 1-1.75 1.75H19.242a1.75 1.75 0 0 1-1.516-.875l-16.66-28.876A3.5 3.5 0 0 1 4.099 98H69.25c.966 0 1.75.784 1.75 1.75z"}),Object(o.a)("path",{fill:"#12B3B3",d:"M86.75 98h107.152a3.5 3.5 0 0 1 3.031 5.249l-16.659 28.876a1.75 1.75 0 0 1-1.516.875H86.75a1.75 1.75 0 0 1-1.75-1.75v-31.5c0-.966.784-1.75 1.75-1.75z"})))};function V(){return(V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var I=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",V({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16.9 19.8l8.6-11.2-11.2 8.6a1.82 1.82 0 0 0-.1 2.7 1.91 1.91 0 0 0 2.7-.1zM19.4 4a11.8 11.8 0 0 0-2-.4l-.2 1.9 1.7.3zm-5.5 1.7l-.4-1.9a6 6 0 0 0-1.9.6l.7 1.8a4.28 4.28 0 0 1 1.6-.5zM24.6 7A10.1 10.1 0 0 0 23 5.7l-1 1.6a6.89 6.89 0 0 1 1.3 1.1zm-15.3.9L8.1 6.4a9.27 9.27 0 0 0-1.4 1.4L8.1 9a12 12 0 0 1 1.2-1.1zM27.8 12a9.82 9.82 0 0 0-.8-1.8l-1.7.9a7.74 7.74 0 0 1 .7 1.6zm-21.5-.1l-1.8-.7a7 7 0 0 0-.6 1.9l1.9.5a6.87 6.87 0 0 1 .5-1.7zM28.5 16h-1.9a9.7 9.7 0 0 1-.1 1.7l1.9.3c0-.7.1-1.3.1-2zM5.8 18.5c-.1-.5-.2-1.1-.3-1.7l-1.9.2c.1.7.2 1.3.3 2zM27 21.8l-1.7-.9c-.3.5-.6 1-.9 1.4l1.5 1.2a8.16 8.16 0 0 0 1.1-1.7zM8.1 23a7.1 7.1 0 0 1-1-1.4l-1.6 1c.4.6.8 1.1 1.2 1.6zM16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 30a16 16 0 1 1 16-16 16 16 0 0 1-16 16z","data-name":"path-1"}))};function F(){return(F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var R=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",F({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M4 20.125h16v-11H4v11zm16-17.5h-.938V1h-2v1.625H6.937V1h-2v1.625H4a2 2 0 0 0-2 2v15.5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-15.5a2 2 0 0 0-2-2z"}),Object(o.a)("path",{d:"M6.292 13.125h11.416v-2H6.292zM6.292 17.458h9v-2h-9z"}))))};function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var U=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",D({"data-name":"Layer 1"},n,{viewBox:"0 0 32 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M28 28H4a2 2 0 0 1-2-2V14h28v12a2 2 0 0 1-2 2zM4 6h24a2 2 0 0 1 2 2v4H2V8a2 2 0 0 1 2-2zm8-3a.94.94 0 0 1 1-1h6a.94.94 0 0 1 1 1v1h-8zm16 1h-6V1a.94.94 0 0 0-1-1H11a.94.94 0 0 0-1 1v3H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4z","data-name":"Fill-1"}))};function W(){return(W=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var q=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",W({"data-name":"Layer 1"},n,{viewBox:"0 0 32 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30 26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2zM12 3a.94.94 0 0 1 1-1h6a.94.94 0 0 1 1 1v1h-8zm16 1h-6V1a.94.94 0 0 0-1-1H11a.94.94 0 0 0-1 1v3H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4z","data-name":"Page-1"}))};function Y(){return(Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var $=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Y({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M19.292 6.29L8.998 16.584 4.703 12.29a1.004 1.004 0 0 0-1.412 0 1.002 1.002 0 0 0 0 1.413l5 5a.995.995 0 0 0 1.411 0l11-11a.99.99 0 0 0 0-1.413 1.001 1.001 0 0 0-1.41 0z"})))};function J(){return(J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var G=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",J({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1"}),Object(o.a)("path",{fill:t,stroke:t,d:"M16.05 8.161l-5.718 5.608-2.386-2.275a.558.558 0 0 0-.784 0 .557.557 0 0 0 0 .785l2.777 2.778a.553.553 0 0 0 .784 0l6.11-6.11a.55.55 0 0 0 0-.786.556.556 0 0 0-.783 0z"})))};function Z(){return(Z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Q=function(e){var t=e.bgColor,n=e.fgColor,r=(e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Z({},r,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("circle",{cx:"11",cy:"11",r:"11",fill:t,transform:"translate(1 1)"}),Object(o.a)("path",{d:"M6 6h12v12H6z"}),Object(o.a)("path",{fill:n,stroke:n,d:"M16.05 8.161l-5.718 5.608-2.386-2.275a.558.558 0 0 0-.784 0 .557.557 0 0 0 0 .785l2.777 2.778a.553.553 0 0 0 .784 0l6.11-6.11a.55.55 0 0 0 0-.786.556.556 0 0 0-.783 0z"})))};function X(){return(X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var K=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",X({},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M24.946 12.938a1.34 1.34 0 0 0 0-1.884 1.339 1.339 0 0 0-1.884 0l-7.06 7.059-7.059-7.059a1.34 1.34 0 0 0-1.884 0 1.329 1.329 0 0 0 0 1.883l8 8a1.323 1.323 0 0 0 1.885 0l8.002-7.999z"}))};function ee(){return(ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var te=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ee({},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M19.062 24.946a1.34 1.34 0 0 0 1.884 0 1.339 1.339 0 0 0 0-1.884l-7.059-7.06 7.059-7.059a1.34 1.34 0 0 0 0-1.884 1.329 1.329 0 0 0-1.883 0l-8 8a1.323 1.323 0 0 0 0 1.885l7.999 8.002z"}))};function ne(){return(ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var oe=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ne({},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M12.938 7.054a1.34 1.34 0 0 0-1.884 0 1.339 1.339 0 0 0 0 1.884l7.059 7.06-7.059 7.059a1.34 1.34 0 0 0 0 1.884 1.329 1.329 0 0 0 1.883 0l8-8a1.323 1.323 0 0 0 0-1.885l-7.999-8.002z"}))};function re(){return(re=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var le=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",re({},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M7.054 19.062a1.34 1.34 0 0 0 0 1.884 1.339 1.339 0 0 0 1.884 0l7.06-7.059 7.059 7.059a1.34 1.34 0 0 0 1.884 0 1.329 1.329 0 0 0 0-1.883l-8-8a1.323 1.323 0 0 0-1.885 0l-8.002 7.999z"}))};function ie(){return(ie=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ae=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ie({},n,{viewBox:"0 0 24 24"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M13.414 11.998l5.296-5.294a1.005 1.005 0 0 0 0-1.413 1.005 1.005 0 0 0-1.414 0L12 10.585 6.704 5.291a1.006 1.006 0 0 0-1.413 0 1.004 1.004 0 0 0 0 1.413l5.296 5.294-5.296 5.295a.999.999 0 1 0 1.413 1.413l5.295-5.295 5.296 5.295a.999.999 0 0 0 1.413 0 1.005 1.005 0 0 0 0-1.413l-5.296-5.295h.002z"}))};function se(){return(se=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ce=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",se({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1"}),Object(o.a)("path",{d:"M15.536 14.121l-2.122-2.12 2.122-2.122a1.003 1.003 0 0 0 0-1.414 1.002 1.002 0 0 0-1.415 0L12 10.586l-2.121-2.12a1 1 0 0 0-1.414 1.413L10.585 12l-2.12 2.121a1 1 0 0 0 1.414 1.414l2.12-2.12 2.122 2.12c.39.39 1.026.39 1.415 0a1.003 1.003 0 0 0 0-1.414"}))))};function ue(){return(ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var de=function(e){var t=e.bgColor,n=e.fgColor,r=(e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ue({},r,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("circle",{cx:"11",cy:"11",r:"11",fill:t,transform:"translate(1 1)"}),Object(o.a)("path",{fill:n,d:"M15.536 14.121l-2.122-2.12 2.122-2.122a1.003 1.003 0 0 0 0-1.414 1.002 1.002 0 0 0-1.415 0L12 10.586l-2.121-2.12a1 1 0 0 0-1.414 1.413L10.585 12l-2.12 2.121a1 1 0 0 0 1.414 1.414l2.12-2.12 2.122 2.12c.39.39 1.026.39 1.415 0a1.003 1.003 0 0 0 0-1.414"})))};function fe(){return(fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var be=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",fe({"data-name":"a2a1a4ef-b4e5-4856-808b-15912bee1329"},n,{viewBox:"0 0 31.98 23.96"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M23 21.96H9a7 7 0 0 1 0-14h.1a7 7 0 0 1 6.9-6 6.9 6.9 0 0 1 6.7 5 7.51 7.51 0 0 1 .3 15m1.1-16.9a9 9 0 0 0-16.6 1 9.1 9.1 0 0 0-7.5 8.9 9 9 0 0 0 9 9h14a9.53 9.53 0 0 0 1.1-18.9","data-name":"ab2e5896-d1c7-47c5-af04-4ac482a776f5"}))};function pe(){return(pe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var me=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",pe({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30 12H8v-2a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2zm0 16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V14h22zM28 6H10a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4zM4 2h18a2 2 0 0 1 2 2h2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4v-2a2 2 0 0 1-2-2V8h2V6H2V4a2 2 0 0 1 2-2z","data-name":"Page-1"}))};function he(){return(he=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ve=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",he({"data-name":"Layer 1"},n,{viewBox:"0 0 32 28.6"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16 13a3 3 0 1 0 3 3 3 3 0 0 0-3-3m0-7.4a10.34 10.34 0 0 0-7 18l1-1.8A8.25 8.25 0 0 1 7.6 16a8.4 8.4 0 0 1 16.8 0 8.25 8.25 0 0 1-2.4 5.8l1 1.8a10.34 10.34 0 0 0-7-18M32 16a16 16 0 0 1-6.1 12.6l-1-1.8A13.67 13.67 0 0 0 30 16a14 14 0 0 0-28 0 13.81 13.81 0 0 0 5.1 10.8l-1 1.8A16 16 0 1 1 32 16","data-name":"Fill-1"}))};function ye(){return(ye=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ge=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ye({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M19 20c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2h1c.55 0 1 .45 1 1v14zM9 3h6v2H9V2.998 3zm9 0h-1c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2H6C4.344 3 3 4.344 3 6v14c0 1.656 1.344 3 3 3h12c1.656 0 3-1.344 3-3V6c0-1.656-1.344-3-3-3z"}),Object(o.a)("path",{fill:t,d:"M13 13v-2c0-.55-.45-1-1-1s-1 .45-1 1v2H9c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2z"})))};function je(){return(je=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Oe=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",je({"data-name":"Layer 1"},n,{viewBox:"0 0 32.1 32.1"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M19.9 19.4a14 14 0 0 0-4 6.5 15.8 15.8 0 0 0-4.1-6.6A17.29 17.29 0 0 0 6.2 16a16.13 16.13 0 0 0 6-3.5 15.33 15.33 0 0 0 3.7-6.2 15.15 15.15 0 0 0 4.6 7.1 15.14 15.14 0 0 0 5.2 2.7 13.8 13.8 0 0 0-5.8 3.3M31.1 15c-3.8-.3-7-1.3-9.3-3.2-2.9-2.3-4.5-6-4.8-10.9a1 1 0 0 0-1-.9 1.06 1.06 0 0 0-1 .9c-.4 4.4-1.8 7.9-4.2 10.2S5.1 14.7.9 15a1 1 0 0 0 0 2 15 15 0 0 1 9.5 3.8c2.5 2.3 4 5.8 4.6 10.4a1.06 1.06 0 0 0 1 .9 1.06 1.06 0 0 0 1-.9c.3-4.5 1.7-7.9 4.3-10.2 2.2-2.1 5.6-3.4 9.9-3.8a1.06 1.06 0 0 0 .9-1c-.1-.7-.5-1.2-1-1.2","data-name":"Fill-1"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M10.4 24.9a3.25 3.25 0 0 1-2.4-1 3.41 3.41 0 0 1-.8-2.3.5.5 0 0 0-1 0 3.88 3.88 0 0 1-1.1 2.5 3.68 3.68 0 0 1-2.1.8.5.5 0 0 0 0 1 5.28 5.28 0 0 1 2.2.8 3.36 3.36 0 0 1 1.1 2.4.47.47 0 0 0 .5.5.47.47 0 0 0 .5-.5 3.34 3.34 0 0 1 .9-2.3 4 4 0 0 1 2.4-1 .47.47 0 0 0 .5-.5 1.27 1.27 0 0 0-.7-.4","data-name":"Fill-4"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M21.6 7.1a3.73 3.73 0 0 1 2.3 1 3.52 3.52 0 0 1 .9 2.3.47.47 0 0 0 .5.5.47.47 0 0 0 .5-.5 3.34 3.34 0 0 1 .9-2.3 3.69 3.69 0 0 1 2.4-1 .5.5 0 0 0 0-1 2.94 2.94 0 0 1-2.2-.9 3 3 0 0 1-1-2.4.5.5 0 0 0-1 0 3.77 3.77 0 0 1-1 2.4 3.28 3.28 0 0 1-2.2.9.47.47 0 0 0-.5.5c-.1.3.1.5.4.5","data-name":"Fill-6"}))};function _e(){return(_e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ae=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",_e({"data-name":"Layer 1"},n,{viewBox:"0 0 30 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M5 9a7 7 0 1 1 7 7 7 7 0 0 1-7-7m11.4 7.8A9 9 0 1 0 3 9a8.92 8.92 0 0 0 4.6 7.8A12.14 12.14 0 0 0 0 28v2h2v-2a10 10 0 0 1 16.9-7.2l.1-.8h1.9a12 12 0 0 0-4.5-3.2M29 24h-3v-3a1 1 0 0 0-2 0v3h-3a1 1 0 0 0 0 2h3v3a1 1 0 0 0 2 0v-3h3a1 1 0 0 0 0-2","data-name":"Page-1"}))};function we(){return(we=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ce=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",we({"data-name":"ffe51f9d-3a5d-4cc4-bfad-3c8131365f10"},n,{viewBox:"0 0 31.51 31.51"}),Object(o.a)("path",{fill:t,d:"M25.63 5.82a12.23 12.23 0 0 1 1.66 3.92 9.3 9.3 0 0 1 2.26 6 9.81 9.81 0 0 1-6.13 8.87h1.21v2.95L21 25.37a11.89 11.89 0 0 1-5.14-.13 17.38 17.38 0 0 1-3.52.36h-.73a13.47 13.47 0 0 0 7.13 2 14 14 0 0 0 2.05-.15l5.82 4.06v-6.43a11.49 11.49 0 0 0 4.92-9.32 11.64 11.64 0 0 0-5.88-9.94M9.38 21.15l-2.49 1.49v-2.59A9.65 9.65 0 0 1 2 11.8C2 6.36 6.82 2 12.8 2s10.83 4.36 10.83 9.8-4.85 9.85-10.83 9.85a11.33 11.33 0 0 1-3.42-.5m16.22-9.33C25.6 5.29 19.87 0 12.8 0S0 5.29 0 11.82a11.51 11.51 0 0 0 4.92 9.32v5.45l4.72-3.3a14.05 14.05 0 0 0 3.16.36c7.07 0 12.8-5.3 12.8-11.83","data-name":"aee4f716-9c84-424c-99e9-6eca3aec5305"}))};function xe(){return(xe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ze=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",xe({"data-name":"Layer 1"},n,{viewBox:"0 0 24 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M22 21.3c-2.3 1.8-5.7 2.7-10 2.7s-7.7-.9-10-2.7V24c0 1.1 1 2 2.9 2.8A18.83 18.83 0 0 0 12 28a18.83 18.83 0 0 0 7.1-1.2C21 26 22 25.1 22 24zm0-6c-2.3 1.8-5.7 2.7-10 2.7s-7.7-.9-10-2.7V18c0 1.1 1 2 2.9 2.8A18.83 18.83 0 0 0 12 22a18.83 18.83 0 0 0 7.1-1.2C21 20 22 19.1 22 18zm0-6c-2.3 1.8-5.7 2.7-10 2.7s-7.7-.9-10-2.7V12c0 1.1 1 2 2.9 2.8A18.83 18.83 0 0 0 12 16a18.83 18.83 0 0 0 7.1-1.2C21 14 22 13.1 22 12zM22 6c0-1.1-1-2-2.9-2.8A18.83 18.83 0 0 0 12 2a18.83 18.83 0 0 0-7.1 1.2C3 4 2 4.9 2 6s1 2 2.9 2.8A18.83 18.83 0 0 0 12 10a18.83 18.83 0 0 0 7.1-1.2C21 8 22 7.1 22 6zm2 19.1c-.5 1.4-1.8 2.6-4.1 3.5A21.42 21.42 0 0 1 12 30a21.42 21.42 0 0 1-7.9-1.4C1.8 27.7.4 26.5 0 25.1V6c0-1.7 1.2-3.1 3.5-4.2A18.41 18.41 0 0 1 12 0a19.8 19.8 0 0 1 8.5 1.7C22.8 2.9 24 4.3 24 6z","data-name":"Fill-1"}))};function Ee(){return(Ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ke=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Ee({"data-name":"Layer 1"},n,{viewBox:"0 0 28 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M23 18H9a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zm3 5a.94.94 0 0 1-1 1H7a.94.94 0 0 1-1-1V3a.94.94 0 0 1 1-1h18a.94.94 0 0 1 1 1zm0-23H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-3 12H9a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zM9 8h8a.94.94 0 0 0 1-1 .94.94 0 0 0-1-1H9a.94.94 0 0 0-1 1 .94.94 0 0 0 1 1zM2 4a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2H2z","data-name":"path-1"}))};function Se(){return(Se=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Pe=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Se({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M15.023.049H.976A.978.978 0 0 0 0 1.025C0 1.56.44 2 .976 2h14.046a.978.978 0 0 0 .976-.975.979.979 0 0 0-.975-.976",mask:"url(#mask-2)",transform:"translate(4 19.5)"}),Object(o.a)("path",{fill:t,d:"M11.408 17.73a.77.77 0 0 0 .59.27c.23 0 .451-.101.591-.27l5.25-6.283a.652.652 0 0 0 .084-.733.76.76 0 0 0-.675-.393h-2.527V3H9.388v7.321H6.75a.76.76 0 0 0-.675.393.638.638 0 0 0-.075.306c0 .152.052.305.16.427l5.25 6.283z"})))};function Me(){return(Me=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Be=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Me({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M20 19H4c-.55 0-1-.45-1-1V7.919l8.425 5.9c.175.119.375.181.575.181.2 0 .4-.063.575-.181L21 7.919V18c0 .55-.45 1-1 1zM4 5h16c.394 0 .731.225.894.556L12 11.781 3.106 5.556A.99.99 0 0 1 4 5zm19 .981A3.004 3.004 0 0 0 20 3H4a3 3 0 0 0-3 2.981V18c0 1.656 1.344 3 3 3h16c1.656 0 3-1.344 3-3V5.981z"})))};function Le(){return(Le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var He=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Le({"data-name":"Layer 1"},n,{viewBox:"0 0 26.08 32.1"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M3.84 15h5.9a.91.91 0 0 1 .8.4.78.78 0 0 1 .2.8l-1.7 12.3 13.2-11.4h-5.9a.91.91 0 0 1-.8-.4.78.78 0 0 1-.2-.8l1.7-12.3zm3.9 17.1a.9.9 0 0 1-.5-.1.88.88 0 0 1-.5-1l1.9-13.8h-7.6a1.2 1.2 0 0 1-1-.7 1.07 1.07 0 0 1 .3-1.1l17.3-15a1.12 1.12 0 0 1 1.3-.3.88.88 0 0 1 .5 1L17.54 15h7.5a1.2 1.2 0 0 1 1 .7 1.07 1.07 0 0 1-.3 1.1l-17.3 15a1.08 1.08 0 0 1-.7.3z","data-name":"Fill-1"}))};function Ne(){return(Ne=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Te=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Ne({"data-name":"Layer 1"},n,{viewBox:"0 0 32 26"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M24.5 24h-17a1 1 0 0 0 0 2h17a1 1 0 0 0 0-2","data-name":"Fill-4"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M2 3a.94.94 0 0 1 1-1h26a.94.94 0 0 1 1 1v17H2zm28-3H2a2 2 0 0 0-2 2v19a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z","data-name":"Fill-1"}))};function Ve(){return(Ve=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ie=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Ve({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M9.7.291a1.003 1.003 0 0 0-1.414 0L2.992 5.585V1.997c0-.55-.45-1-1-1s-1 .45-1 1v6.066a.926.926 0 0 0 .07.3V8.376s0 .006.005.006c.037.094.094.175.156.256l.006.006.006.005.006.006v.006c.025.026.044.051.07.07h.005l.006.005s.006 0 .006.006h.006l.006.007a.875.875 0 0 0 .25.155H1.608c.1.044.213.07.325.075h6.042c.55 0 1-.45 1-1 0-.549-.45-1-1-1H4.387l5.294-5.293a.968.968 0 0 0 .012-1.4L9.7.29z",mask:"url(#mask-2)",transform:"translate(12 3)"}),Object(o.a)("g",null,Object(o.a)("path",{fill:t,d:"M8.918.609s0-.006-.006-.006V.59a1.016 1.016 0 0 0-.15-.244L8.756.34 8.75.336 8.744.33 8.738.323C8.713.298 8.694.273 8.67.255L8.663.249 8.657.242 8.651.236 8.645.23 8.64.224a1.222 1.222 0 0 0-.213-.137h-.012A.977.977 0 0 0 8.008 0H1.996c-.55 0-1 .449-1 1 0 .549.45 1 1 1h3.588L.29 7.294a1.005 1.005 0 0 0 0 1.413C.484 8.9.74 9 .996 9c.256 0 .513-.101.706-.294l5.294-5.294V7c0 .549.45 1 1 1s1-.451 1-1V1a.99.99 0 0 0-.075-.388L8.918.609z",mask:"url(#mask-4)",transform:"translate(2 14)"}))))};function Fe(){return(Fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Re=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Fe({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M18 11.977c-.55 0-1 .45-1 1v6c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-11c0-.55.45-1 1-1h6c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.656 0-3 1.344-3 3v11c0 1.656 1.344 3 3 3h11c1.656 0 3-1.344 3-3v-6c0-.55-.45-1-1-1"}),Object(o.a)("path",{d:"M22 2.94v-.03a.939.939 0 0 0-.069-.3v-.012s0-.006-.006-.006a1.104 1.104 0 0 0-.156-.256l-.006-.006-.006-.006-.006-.006v-.006c-.025-.025-.044-.05-.069-.069h-.006l-.006-.006s-.006 0-.006-.006h-.006l-.006-.006a.812.812 0 0 0-.256-.156H21.378a.966.966 0 0 0-.3-.069H15.01c-.55 0-1 .45-1 1s.45 1 1 1h3.588l-9.3 9.275a1.005 1.005 0 0 0 0 1.413.999.999 0 0 0 1.412 0l9.294-9.294v3.588c0 .55.45 1 1 1s1-.45 1-1V2.945L22 2.94z"}))))};function De(){return(De=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ue=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",De({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M19.36 12.358c-2.287 2.418-4.762 3.643-7.36 3.643-2.599 0-5.075-1.225-7.362-3.643a18.752 18.752 0 0 1-2.5-3.355 18.847 18.847 0 0 1 2.5-3.354C6.925 3.23 9.4 2.005 12 2.005c2.6 0 5.075 1.225 7.361 3.644a18.935 18.935 0 0 1 2.5 3.354c-.4.675-1.25 2.024-2.5 3.355m4.531-3.805c-.044-.087-1.087-2.155-3.037-4.236C18.205 1.5 15.144.005 12 .005 8.856.005 5.794 1.5 3.144 4.323 1.194 6.403.151 8.471.108 8.56a.979.979 0 0 0 0 .894c.044.087 1.086 2.155 3.036 4.235C5.794 16.506 8.856 18 12 18c3.144 0 6.206-1.494 8.855-4.318 1.95-2.08 2.993-4.148 3.037-4.235a.973.973 0 0 0 0-.894",mask:"url(#mask-2)",transform:"translate(0 2.994)"}),Object(o.a)("path",{fill:t,d:"M12 13.996c-1.1 0-2-.899-2-1.999s.9-1.999 2-1.999 2 .9 2 2-.9 1.998-2 1.998m0-5.998c-2.206 0-4 1.794-4 4a4.004 4.004 0 0 0 4 3.998 4.003 4.003 0 0 0 3.999-3.999A4.003 4.003 0 0 0 12 7.998"})))};function We(){return(We=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var qe=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",We({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M10.139 4.708a7.894 7.894 0 0 1 1.844-.213h.024c2.6 0 5.074 1.225 7.355 3.643a18.854 18.854 0 0 1 2.493 3.35 17.653 17.653 0 0 1-1.8 2.574.993.993 0 0 0 .119 1.405c.189.156.419.237.645.237.28 0 .568-.119.76-.356a19.908 19.908 0 0 0 2.3-3.386.992.992 0 0 0 .013-.925c-.044-.087-1.087-2.155-3.037-4.237-2.65-2.812-5.711-4.304-8.855-4.304h-.025c-.793 0-1.594.093-2.318.268a.996.996 0 0 0-.731 1.206c.138.537.675.87 1.212.738zM12.001 18.492c-2.6 0-5.074-1.231-7.36-3.643a18.654 18.654 0 0 1-2.494-3.35A17.567 17.567 0 0 1 5.99 6.895l2.55 2.549a4.022 4.022 0 0 0-.612 2.125 4.004 4.004 0 0 0 4 3.999 4.04 4.04 0 0 0 2.124-.612l2.324 2.324a8.918 8.918 0 0 1-4.374 1.212zm-1.975-7.554l2.531 2.53a2.005 2.005 0 0 1-2.531-2.53zm13.178 10.347l-4.549-4.55-.024-.024L2.21.29a1.004 1.004 0 0 0-1.412 0 1.002 1.002 0 0 0 0 1.413L4.57 5.477a19.7 19.7 0 0 0-4.448 5.536 1.01 1.01 0 0 0-.019.925c.044.087 1.087 2.156 3.043 4.236 2.65 2.825 5.71 4.318 8.86 4.318h.02a10.913 10.913 0 0 0 5.797-1.755l3.962 3.962a.995.995 0 0 0 1.411 0 .985.985 0 0 0 .006-1.413l.002-.001z"}))))};function Ye(){return(Ye=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var $e=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Ye({"data-name":"Layer 1"},n,{viewBox:"0 0 16.62 32"}),Object(o.a)("path",{fill:t,d:"M16.62.23v5.08h-3c-2.37 0-2.81 1.13-2.81 2.77v3.63h5.63l-.74 5.69h-4.91V32H4.91V17.4H0v-5.69h4.91V7.52c0-4.87 3-7.52 7.32-7.52a37.12 37.12 0 0 1 4.39.23z"}))};function Je(){return(Je=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ge=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Je({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,d:"M26 0a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-3.92V19.6h4.15l.62-4.83h-4.77v-3.08c0-1.4.38-2.34 2.4-2.34h2.54V5a33.75 33.75 0 0 0-3.71-.19c-3.69 0-6.23 2.25-6.23 6.38v3.56h-4.16v4.85h4.16V32H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6z"}))};function Ze(){return(Ze=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Qe=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Ze({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-30a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 6A10 10 0 0 0 6 16h2a8 8 0 0 1 16 0h2A10 10 0 0 0 16 6zm-2 19h2v-2h-2zm6.5-10.9a1 1 0 0 0-1.4.4L15.5 21H15a3 3 0 1 0 3 3 2.79 2.79 0 0 0-.8-2l3.6-6.5a1 1 0 0 0-.3-1.4z","data-name":"Page-1"}))};function Xe(){return(Xe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ke=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Xe({"data-name":"Layer 1"},n,{viewBox:"0 0 32 24"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30 16l-.8-4H22v2.1a4.14 4.14 0 0 1 1-.1 4.93 4.93 0 0 1 4 2zm-8-6h6.8L28 6h-6zm4 9a3 3 0 0 0-5.1-2.1 3 3 0 1 0 4.2 4.2A2.88 2.88 0 0 0 26 19zm-16 0a2.88 2.88 0 0 0-.9-2.1 2.9 2.9 0 0 0-4.2 0 2.9 2.9 0 0 0 0 4.2 2.9 2.9 0 0 0 4.2 0A2.88 2.88 0 0 0 10 19zm10-4V3a1.08 1.08 0 0 0-.3-.7.91.91 0 0 0-.7-.3H3a.91.91 0 0 0-.7.3A1.08 1.08 0 0 0 2 3v12c0 .7.3 1 1 1a4.93 4.93 0 0 1 4-2 4.93 4.93 0 0 1 4 2h8a4.74 4.74 0 0 1 1-1zm12 2a1.08 1.08 0 0 1-.3.7.91.91 0 0 1-.7.3h-3.1a4.14 4.14 0 0 1 .1 1 4.54 4.54 0 0 1-1.5 3.5A4.85 4.85 0 0 1 23 24a4.69 4.69 0 0 1-3.5-1.5A4.85 4.85 0 0 1 18 19v-.2h-6v.2a4.54 4.54 0 0 1-1.5 3.5A4.85 4.85 0 0 1 7 24a4.69 4.69 0 0 1-3.5-1.5A4.85 4.85 0 0 1 2 19v-.2a2 2 0 0 1-1.4-.6 2 2 0 0 1-.6-1.5V2.1A2 2 0 0 1 .6.6 2 2 0 0 1 2 0h18a2 2 0 0 1 1.4.6 2 2 0 0 1 .6 1.5V4h7c.7 0 1 .3 1 1z","data-name":"Page-1"}))};function et(){return(et=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var tt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",et({},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"nonzero",d:"M26.906 6.581A.996.996 0 0 0 26 6H6a.996.996 0 0 0-.906.581 1.01 1.01 0 0 0 .144 1.069L13 16.825V23c0 .381.213.725.55.894l4 2A1 1 0 0 0 19 25v-8.175l7.763-9.181a.999.999 0 0 0 .144-1.062l-.001-.001zm-9.669 9.232c-.15.181-.237.406-.237.644v6.925l-2-1v-5.925a.98.98 0 0 0-.237-.644L8.157 8.001h15.687l-6.606 7.812h-.001z"}))};function nt(){return(nt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ot=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",nt({"data-name":"Layer 1"},n,{viewBox:"0 0 26 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M2 30h22V2H2zM24 0H2a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z","data-name":"Fill-1"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M6 10.7h14v-5H6zm-2 2h18v-9H4z","data-name":"Fill-3"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M6 18.3h2v-2H6v2z","data-name":"Fill-4"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M10 18.3h2v-2h-2v2z","data-name":"Fill-5"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M14 18.3h2v-2h-2v2z","data-name":"Fill-6"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M18 18.3h2v-2h-2v2z","data-name":"Fill-7"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M6 22.3h2v-2H6v2z","data-name":"Fill-8"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M10 22.3h2v-2h-2v2z","data-name":"Fill-9"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M14 22.3h2v-2h-2v2z","data-name":"Fill-10"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M18 22.3h2v-2h-2v2z","data-name":"Fill-11"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M6 26.3h2v-2H6v2z","data-name":"Fill-12"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M10 26.3h2v-2h-2v2z","data-name":"Fill-13"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M14 26.3h2v-2h-2v2z","data-name":"Fill-14"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M18 26.3h2v-2h-2v2z","data-name":"Fill-15"}))};function rt(){return(rt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var lt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",rt({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M22 2.94v-.03a.939.939 0 0 0-.069-.3v-.012s0-.006-.006-.006a1.104 1.104 0 0 0-.156-.256l-.006-.006-.006-.006-.006-.006v-.006c-.025-.025-.044-.05-.069-.069h-.006l-.006-.006s-.006 0-.006-.006h-.006l-.006-.006a.812.812 0 0 0-.256-.156H21.378a.939.939 0 0 0-.3-.069H15.01c-.55 0-1 .45-1 1s.45 1 1 1h3.588l-5.294 5.294a1.005 1.005 0 0 0 0 1.413.999.999 0 0 0 1.412 0l5.287-5.313v3.588c0 .55.45 1 1 1s1-.45 1-1V2.945L22 2.94z"}),Object(o.a)("path",{fill:t,d:"M7.294 1.297L2 6.591V3.003c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .138.025.27.075.387 0 0 0 .006.006.006v.011a.96.96 0 0 0 .15.244l.006.006.006.007.006.006.006.006c.025.025.044.05.069.07l.006.005.006.006.006.006.006.006.006.006c.075.063.15.106.231.144h.012c.106.044.225.075.35.081h6.042c.55 0 1-.45 1-1s-.45-1-1-1H3.408l5.294-5.294a1.005 1.005 0 0 0 0-1.413.992.992 0 0 0-1.413 0l.005.004z",mask:"url(#mask-2)",transform:"translate(2 11.974)"})))};function it(){return(it=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var at=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",it({},n,{viewBox:"0 0 24 28"}),Object(o.a)("path",{fill:t,d:"M12 2c6.625 0 12 5.375 12 12 0 5.297-3.437 9.797-8.203 11.391-.609.109-.828-.266-.828-.578 0-.391.016-1.687.016-3.297 0-1.125-.375-1.844-.812-2.219 2.672-.297 5.484-1.313 5.484-5.922 0-1.313-.469-2.375-1.234-3.219.125-.313.531-1.531-.125-3.187-1-.313-3.297 1.234-3.297 1.234a11.28 11.28 0 0 0-6 0S6.704 6.656 5.704 6.969c-.656 1.656-.25 2.875-.125 3.187-.766.844-1.234 1.906-1.234 3.219 0 4.594 2.797 5.625 5.469 5.922-.344.313-.656.844-.766 1.609-.688.313-2.438.844-3.484-1-.656-1.141-1.844-1.234-1.844-1.234-1.172-.016-.078.734-.078.734.781.359 1.328 1.75 1.328 1.75.703 2.141 4.047 1.422 4.047 1.422 0 1 .016 1.937.016 2.234 0 .313-.219.688-.828.578C3.439 23.796.002 19.296.002 13.999c0-6.625 5.375-12 12-12zM4.547 19.234c.031-.063-.016-.141-.109-.187-.094-.031-.172-.016-.203.031-.031.063.016.141.109.187.078.047.172.031.203-.031zm.484.532c.063-.047.047-.156-.031-.25-.078-.078-.187-.109-.25-.047-.063.047-.047.156.031.25.078.078.187.109.25.047zm.469.703c.078-.063.078-.187 0-.297-.063-.109-.187-.156-.266-.094-.078.047-.078.172 0 .281s.203.156.266.109zm.656.656c.063-.063.031-.203-.063-.297-.109-.109-.25-.125-.313-.047-.078.063-.047.203.063.297.109.109.25.125.313.047zm.891.391c.031-.094-.063-.203-.203-.25-.125-.031-.266.016-.297.109s.063.203.203.234c.125.047.266 0 .297-.094zm.984.078c0-.109-.125-.187-.266-.172-.141 0-.25.078-.25.172 0 .109.109.187.266.172.141 0 .25-.078.25-.172zm.906-.156c-.016-.094-.141-.156-.281-.141-.141.031-.234.125-.219.234.016.094.141.156.281.125s.234-.125.219-.219z"}))};function st(){return(st=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ct=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",st({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M12 1c1.996 0 3.836.492 5.521 1.475a10.95 10.95 0 0 1 4.004 4.004C22.508 8.164 23 10.004 23 12s-.492 3.836-1.475 5.521a10.95 10.95 0 0 1-4.004 4.004C15.836 22.508 13.996 23 12 23s-3.836-.492-5.521-1.475a10.95 10.95 0 0 1-4.004-4.004C1.492 15.836 1 13.996 1 12s.492-3.836 1.475-5.521A10.95 10.95 0 0 1 6.48 2.475C8.164 1.492 10.004 1 12 1zm3.924 7.462a.81.81 0 0 0-.136.136c-.071.081-.136.127-.193.136.02 0 .04-.023.065-.071.023-.048.047-.1.071-.158a.44.44 0 0 1 .05-.1c.058-.067.163-.139.315-.215.134-.057.382-.114.745-.172.325-.076.568-.024.73.158-.018-.02.027-.081.137-.186.11-.105.179-.163.207-.172.029-.02.1-.04.215-.065.115-.024.186-.06.215-.107l.029-.315c-.115.01-.198-.024-.251-.1a.606.606 0 0 1-.093-.301c0 .019-.029.057-.086.114 0-.067-.021-.105-.064-.114a.344.344 0 0 0-.165.014c-.067.02-.11.024-.13.014a.562.562 0 0 1-.214-.107.472.472 0 0 1-.114-.236 4.073 4.073 0 0 0-.058-.215.428.428 0 0 0-.136-.158.508.508 0 0 1-.136-.143 1.553 1.553 0 0 1-.036-.079 1.75 1.75 0 0 0-.043-.093.302.302 0 0 0-.057-.079.11.11 0 0 0-.079-.035c-.028 0-.062.023-.1.071a2.798 2.798 0 0 0-.107.143c-.034.048-.055.072-.065.072a.117.117 0 0 0-.086-.022.456.456 0 0 0-.064.015.241.241 0 0 0-.065.043.4.4 0 0 1-.193.093.936.936 0 0 0-.122.029c.143-.048.139-.1-.014-.158a.452.452 0 0 0-.23-.043c.087-.038.122-.095.108-.172a.345.345 0 0 0-.122-.2h.072c-.01-.039-.05-.08-.122-.122a1.756 1.756 0 0 0-.25-.122 1.233 1.233 0 0 1-.187-.086c-.076-.048-.238-.093-.487-.136-.248-.043-.405-.045-.472-.007-.048.057-.07.107-.065.15a.97.97 0 0 0 .058.2c.033.092.05.151.05.18.01.057-.017.12-.08.186-.061.067-.092.124-.092.172 0 .067.067.14.2.222.134.081.182.184.144.308-.03.076-.105.153-.23.23a.96.96 0 0 0-.229.17.3.3 0 0 0-.021.266c.033.1.083.179.15.236.02.02.026.038.022.058-.005.019-.022.04-.05.064a.641.641 0 0 1-.08.057 1.425 1.425 0 0 1-.092.05l-.043.03c-.105.047-.203.018-.294-.087a.926.926 0 0 1-.193-.372c-.067-.239-.144-.382-.23-.43-.22-.076-.358-.072-.415.014-.048-.124-.243-.248-.587-.372-.239-.086-.516-.105-.83-.057.056-.01.056-.081 0-.215-.068-.143-.158-.2-.273-.172a.72.72 0 0 0 .057-.25c.01-.11.015-.175.015-.194a.73.73 0 0 1 .172-.33 2.746 2.746 0 0 0 .236-.315c.033-.057.036-.086.007-.086.334.039.573-.014.716-.157.048-.048.103-.129.165-.244.062-.114.112-.195.15-.243.086-.057.153-.084.2-.079a.641.641 0 0 1 .208.079c.091.048.16.072.208.072.134.01.208-.043.222-.158a.31.31 0 0 0-.107-.286c.114.01.129-.072.043-.244a.311.311 0 0 0-.115-.129c-.114-.038-.243-.014-.387.072-.076.038-.066.076.03.114-.01-.01-.056.04-.137.15-.081.11-.16.194-.236.251-.077.058-.153.034-.23-.071a1.156 1.156 0 0 1-.078-.194c-.043-.119-.089-.183-.136-.193-.077 0-.153.072-.23.215.03-.076-.023-.148-.157-.215a1.03 1.03 0 0 0-.344-.115c.182-.114.143-.243-.114-.386a.711.711 0 0 0-.294-.072c-.129-.01-.222.01-.28.057a.385.385 0 0 0-.078.165c-.005.043.019.081.072.115.052.033.102.06.15.079.048.019.103.038.165.057.062.019.102.033.121.043.134.095.172.162.115.2-.02.01-.06.027-.122.05l-.165.065c-.047.019-.076.038-.085.057-.03.038-.03.105 0 .2.028.096.019.163-.03.201a.634.634 0 0 1-.128-.25.913.913 0 0 0-.1-.237c.067.086-.053.115-.358.086l-.144-.014c-.038 0-.114.01-.229.028-.114.02-.212.024-.293.015a.266.266 0 0 1-.194-.115c-.038-.076-.038-.172 0-.286.01-.038.029-.048.058-.029a2.146 2.146 0 0 1-.158-.136 1.398 1.398 0 0 0-.143-.122c-.44.144-.888.34-1.347.588.058.01.115.004.172-.015.048-.019.11-.05.187-.093a4.83 4.83 0 0 1 .143-.079c.324-.133.525-.167.601-.1l.072-.072c.134.153.23.273.286.359-.066-.039-.21-.043-.43-.015-.19.058-.295.115-.314.172.066.115.09.2.071.258a2.237 2.237 0 0 1-.165-.143 1.136 1.136 0 0 0-.207-.158.572.572 0 0 0-.215-.071c-.153 0-.258.004-.315.014a9.038 9.038 0 0 0-3.366 3.18c.067.066.124.105.172.114.038.01.062.053.071.129.01.076.022.129.036.158.015.028.07.014.165-.043.086.076.1.167.043.272.01-.01.22.12.63.386.182.163.282.263.3.301.03.105-.018.191-.142.258a.732.732 0 0 0-.13-.129c-.076-.067-.119-.086-.128-.057-.029.048-.026.136.007.265s.084.188.15.179c-.066 0-.112.076-.136.229a3.308 3.308 0 0 0-.035.508c0 .187-.005.299-.015.337l.029.014c-.029.115-.002.28.079.495.08.214.183.307.308.279-.125.028-.029.234.286.616.057.076.096.12.115.129.028.019.086.055.172.107.085.053.157.1.214.143a.61.61 0 0 1 .144.15c.038.048.086.156.143.323.057.167.124.28.2.337-.019.057.027.152.136.286.11.134.16.243.15.33a.07.07 0 0 0-.035.014.07.07 0 0 1-.036.014c.029.067.103.134.222.2.12.067.194.13.222.187.01.028.02.076.029.143.01.067.024.12.043.158.019.038.057.047.114.028.02-.19-.095-.487-.343-.888a11.768 11.768 0 0 1-.244-.415.823.823 0 0 1-.079-.222c-.023-.1-.045-.17-.064-.208.019 0 .048.007.086.022.038.014.079.03.122.05a.73.73 0 0 1 .107.057c.029.02.038.033.029.043-.029.067-.02.15.028.25s.105.19.172.266a19.643 19.643 0 0 0 .416.458c.057.057.124.15.2.28.076.128.076.193 0 .193.086 0 .182.05.287.15.105.1.186.193.243.28.048.076.086.2.115.372.028.172.052.286.071.343.02.067.06.132.122.194a.71.71 0 0 0 .179.136l.23.114c.095.048.157.082.185.1.048.02.136.07.265.151.13.081.232.136.308.165a.66.66 0 0 0 .23.057.757.757 0 0 0 .207-.036c.081-.024.146-.04.194-.05.143-.019.281.053.415.215.134.162.234.263.3.3.344.182.607.235.788.158-.019.01-.016.046.008.108.023.062.062.136.114.222a14.04 14.04 0 0 0 .208.33c.048.057.134.128.258.214s.21.158.257.215c.058-.038.091-.081.1-.129-.028.076.006.172.101.286.095.115.181.163.258.144.133-.029.2-.182.2-.459-.296.144-.53.058-.701-.257a.28.28 0 0 0-.036-.08.913.913 0 0 1-.093-.243.203.203 0 0 1 0-.107c.01-.029.033-.043.071-.043.086 0 .134-.017.143-.05.01-.034 0-.093-.028-.18a2.887 2.887 0 0 1-.057-.185c-.01-.077-.063-.172-.158-.287a3.817 3.817 0 0 1-.172-.215c-.048.086-.124.124-.23.115-.104-.01-.18-.053-.228-.13 0 .01-.007.037-.022.08a.34.34 0 0 0-.021.093.817.817 0 0 1-.215-.015c.01-.028.021-.112.036-.25.014-.139.03-.246.05-.322a.796.796 0 0 1 .079-.172c.043-.077.078-.146.107-.208a.706.706 0 0 0 .057-.18c.01-.056-.012-.102-.064-.135-.053-.034-.136-.045-.25-.036-.182.01-.306.105-.373.287-.01.028-.024.078-.043.15a.485.485 0 0 1-.072.165.357.357 0 0 1-.129.1c-.066.029-.181.038-.343.029-.163-.01-.277-.034-.344-.072-.124-.076-.232-.215-.322-.415-.091-.201-.136-.378-.136-.53 0-.096.011-.222.035-.38.024-.158.039-.277.043-.358a.94.94 0 0 0-.078-.35.727.727 0 0 0 .128-.137.89.89 0 0 1 .144-.15c.019-.01.04-.017.064-.022a.146.146 0 0 1 .065 0c.019.005.038-.002.057-.021a.182.182 0 0 0 .043-.086.427.427 0 0 0-.057-.043c-.03-.029-.048-.043-.058-.043.067.028.203.021.408-.022.206-.043.337-.036.394.022.144.105.249.095.315-.029 0-.01-.011-.055-.035-.136-.024-.081-.027-.146-.008-.193.048.258.187.3.416.129.028.028.102.052.222.071.12.02.203.043.25.072.03.019.063.045.1.079a.966.966 0 0 0 .08.064c.014.01.038.007.071-.007a.432.432 0 0 0 .122-.093.954.954 0 0 1 .172.344c.105.381.196.592.272.63.067.028.12.038.157.028.039-.01.06-.055.065-.136a1.39 1.39 0 0 0 0-.2 3.56 3.56 0 0 0-.022-.18l-.014-.114v-.258l-.014-.114c-.143-.029-.232-.086-.265-.172a.307.307 0 0 1 .021-.265.972.972 0 0 1 .215-.265.468.468 0 0 1 .115-.05c.067-.024.14-.055.222-.093a.644.644 0 0 0 .179-.115c.2-.181.272-.348.215-.501.066 0 .119-.043.157-.13-.01 0-.033-.013-.071-.042a1.047 1.047 0 0 0-.108-.072.194.194 0 0 0-.064-.028c.086-.048.095-.124.028-.23.048-.028.084-.08.108-.157.024-.076.06-.124.107-.143.086.114.186.124.3.028.077-.076.082-.152.015-.229.048-.067.146-.117.294-.15.148-.034.236-.079.265-.136.067.019.105.01.114-.029a.763.763 0 0 0 .015-.172c0-.076.014-.133.043-.172a.488.488 0 0 1 .215-.129c.105-.038.167-.062.186-.071l.243-.158c.029-.038.029-.057 0-.057.172.02.32-.033.444-.158.096-.105.067-.2-.086-.286.029-.057.015-.103-.043-.136a.75.75 0 0 0-.214-.079.52.52 0 0 1 .164-.007c.081.005.132-.002.15-.021.144-.096.11-.172-.1-.23-.162-.047-.367.01-.616.172zM13.59 21.023c1.967-.343 3.643-1.246 5.027-2.707-.028-.028-.088-.05-.179-.064a.515.515 0 0 1-.179-.05 2.253 2.253 0 0 0-.344-.115.28.28 0 0 0-.035-.186.382.382 0 0 0-.115-.129 7.66 7.66 0 0 0-.18-.114 7.54 7.54 0 0 1-.157-.1 4.81 4.81 0 0 0-.2-.165 1.016 1.016 0 0 0-.108-.065c-.052-.029-.093-.038-.121-.029a.503.503 0 0 1-.144.015l-.043.014a.396.396 0 0 0-.078.036c-.024.014-.05.029-.08.043a.148.148 0 0 0-.056.043c-.01.014-.01.026 0 .036-.2-.163-.373-.268-.516-.315a.405.405 0 0 1-.158-.08 1.36 1.36 0 0 0-.15-.1.21.21 0 0 0-.143-.02.327.327 0 0 0-.165.1.342.342 0 0 0-.086.214c-.01.096-.019.158-.028.186-.067-.047-.067-.13 0-.25.066-.12.076-.208.028-.265-.028-.058-.079-.079-.15-.065a.48.48 0 0 0-.172.065c-.043.028-.098.069-.165.121-.067.053-.11.084-.129.094-.019.01-.06.035-.121.078a.482.482 0 0 0-.122.108.711.711 0 0 0-.086.172.867.867 0 0 1-.072.157c-.019-.038-.074-.069-.164-.093-.091-.024-.136-.05-.136-.079.019.096.038.263.057.502.019.238.043.42.071.544.067.296.01.525-.171.687-.258.24-.397.43-.416.573-.038.21.02.335.172.373 0 .067-.038.164-.115.293-.076.13-.11.232-.1.308 0 .058.01.134.029.23z"})))};function ut(){return(ut=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var dt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ut({"data-name":"Layer 1"},n,{viewBox:"0 0 30 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16 17v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0m-4 0v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0M2 17v10a.94.94 0 0 0 1 1 .94.94 0 0 0 1-1V17a.94.94 0 0 0-1-1 .94.94 0 0 0-1 1m27 13H1a1 1 0 0 0 0 2h28a1 1 0 0 0 0-2M6 17v10a.94.94 0 0 0 1 1 .94.94 0 0 0 1-1V17a.94.94 0 0 0-1-1 .94.94 0 0 0-1 1m-5-3h28a1 1 0 0 0 0-2H1a1 1 0 0 0 0 2m21 3v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0M15 6a5 5 0 0 1 4.9 4h2A6.89 6.89 0 0 0 16 4.1V1a1 1 0 0 0-2 0v3.1A6.79 6.79 0 0 0 8.1 10h2A5 5 0 0 1 15 6m11 11v10a1 1 0 0 0 2 0V17a1 1 0 0 0-2 0","data-name":"Page-1"}))};function ft(){return(ft=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var bt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ft({"data-name":"Layer 1"},n,{viewBox:"0 0 30 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M28 26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2zM10 4h10V2H10zm16 0h-4V0H8v4H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4z","data-name":"Fill-3"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M15 10a3 3 0 0 0-3 3v1h-1a3 3 0 0 0 0 6h1v1a3 3 0 0 0 6 0v-1h1a3 3 0 0 0 0-6h-1v-1a3 3 0 0 0-3-3m0 2a.94.94 0 0 1 1 1v2a.94.94 0 0 0 1 1h2a1 1 0 0 1 0 2h-2a.94.94 0 0 0-1 1v2a.94.94 0 0 1-1 1 .94.94 0 0 1-1-1v-2a.94.94 0 0 0-1-1h-2a1 1 0 0 1 0-2h2a.94.94 0 0 0 1-1v-2a.94.94 0 0 1 1-1","data-name":"Fill-1"}))};function pt(){return(pt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var mt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",pt({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M2 22l2-7v1h24v-1l2 7zm28 6H2v-4h28zM6 8h4v1a.94.94 0 0 0 1 1h10a.94.94 0 0 0 1-1V8h4l1.7 6H4.3zm6 0h8V6h-8zM6 3a.94.94 0 0 1 1-1h18a.94.94 0 0 1 1 1v2a.94.94 0 0 1-1 1h-3V5a.94.94 0 0 0-1-1H11a.94.94 0 0 0-1 1v1H7a.94.94 0 0 1-1-1zm25.6 19L28 6V2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4L.4 22H0v8h2v2h2v-2h24v2h2v-2h2v-8z","data-name":"Page-1"}))};function ht(){return(ht=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var vt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ht({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M8 0v6H0v26h32V6h-8V0zm2 6V2h12v28h-2v-6h-8v6h-2zm14 24h6V8h-6zM2 30h6V8H2zm12 0h4v-4h-4zM12 8h8V6h-8zm14 6h2v-2h-2zm-14 0h8v-2h-8zm-8 0h2v-2H4zm22 6h2v-2h-2zm-14 0h8v-2h-8zm-8 0h2v-2H4zm22 6h2v-2h-2zM4 26h2v-2H4z","data-name":"Page-1"}))};function yt(){return(yt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var gt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",yt({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1"}),Object(o.a)("path",{d:"M12 11c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1M12 7a1.001 1.001 0 0 0 0 2 1.001 1.001 0 0 0 0-2"}))))};function jt(){return(jt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ot=function(e){var t=e.bgColor,n=e.fgColor,r=(e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",jt({},r,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("circle",{cx:"11",cy:"11",r:"11",fill:t,transform:"translate(1 1)"}),Object(o.a)("path",{fill:n,d:"M12.706 8.706A1.001 1.001 0 0 1 12 9a1.003 1.003 0 0 1-1-1 1.007 1.007 0 0 1 1-1 1.003 1.003 0 0 1 1 1c0 .262-.107.518-.294.706zM13 16c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4z"})))};function _t(){return(_t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var At=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",_t({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M2 16a14 14 0 0 1 28 0zM16 0A16 16 0 0 0 0 16v2h14v8a6 6 0 0 0 12 0h-2a4 4 0 0 1-8 0v-8h16v-2A16 16 0 0 0 16 0z","data-name":"Page-1"}))};function wt(){return(wt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ct=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",wt({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30 12H8v-2a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2zm0 16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V14h22zM28 6H10a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4zM4 2a2 2 0 0 0-2 2v2h2v2H2v14a2 2 0 0 0 2 2v2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4h-2a2 2 0 0 0-2-2zm20.5 19v2h-4v4h-2v-4h-4v-2h4v-4h2v4z","data-name":"path-1"}))};function xt(){return(xt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var zt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",xt({"data-name":"Layer 1"},n,{viewBox:"0 0 32 30"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M28.5 13.5a1.56 1.56 0 0 0-2.6-1.1 1.37 1.37 0 0 0-.4 1.1v3a1.5 1.5 0 0 0 .4 1.1 1.37 1.37 0 0 0 1.1.4 1.5 1.5 0 0 0 1.1-.4 1.37 1.37 0 0 0 .4-1.1zM20 27c0-.7-.3-1-1-1h-2c-.7 0-1 .3-1 1s.3 1 1 1h2c.7 0 1-.3 1-1zM6.5 13.5a1.5 1.5 0 0 0-.4-1.1A1.5 1.5 0 0 0 5 12a1.5 1.5 0 0 0-1.1.4 1.37 1.37 0 0 0-.4 1.1v3a1.5 1.5 0 0 0 .4 1.1A1.5 1.5 0 0 0 5 18a1.5 1.5 0 0 0 1.1-.4 1.37 1.37 0 0 0 .4-1.1zm25.2-1.2a.91.91 0 0 1 .3.7v4c0 .7-.3 1-1 1h-.8a3.31 3.31 0 0 1-2.4 1.9 11.37 11.37 0 0 1-5.8 7.7 3.2 3.2 0 0 1-3 2.4h-2a3 3 0 0 1 0-6h2a2.79 2.79 0 0 1 2.6 1.5 8.88 8.88 0 0 0 4.1-5.8 3.05 3.05 0 0 1-2.2-3.2v-3a3.32 3.32 0 0 1 .7-2.1 3 3 0 0 1 1.7-1.2 8.92 8.92 0 0 0-3.2-5.8A8.94 8.94 0 0 0 16.5 2h-1a9.33 9.33 0 0 0-6.2 2.3 9.65 9.65 0 0 0-3.2 5.8 3 3 0 0 1 1.7 1.2 3.77 3.77 0 0 1 .7 2.1v3a3.49 3.49 0 0 1-.8 2.2 3.74 3.74 0 0 1-2 1.2 2.81 2.81 0 0 1-2.2-.1A3.32 3.32 0 0 1 1.9 18H1c-.7 0-1-.3-1-1v-4c0-.7.3-1 1-1h.9a3.45 3.45 0 0 1 2.2-1.9 10.69 10.69 0 0 1 3.8-7.2A11.09 11.09 0 0 1 15.5 0h1a11.52 11.52 0 0 1 7.7 2.9 11.12 11.12 0 0 1 3.8 7.2 3.19 3.19 0 0 1 2.2 1.9h.8a1.08 1.08 0 0 1 .7.3z","data-name":"Page-1"}))};function Et(){return(Et=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var kt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Et({"data-name":"Layer 1"},n,{viewBox:"0 0 32 24.38"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M23.5 20.88a.91.91 0 0 1-.7-.3 1 1 0 0 1 0-1.4l6.8-6.8-6.8-6.8a1 1 0 1 1 1.4-1.4l7.5 7.5a1 1 0 0 1 0 1.4l-7.5 7.5a1.08 1.08 0 0 1-.7.3zm-15 0a.91.91 0 0 1-.7-.3l-7.5-7.5a1 1 0 0 1 0-1.4l7.5-7.5a1 1 0 1 1 1.4 1.4l-6.8 6.8 6.8 6.8a1 1 0 0 1 0 1.4.91.91 0 0 1-.7.3zm2.3 3.5a.6.6 0 0 1-.4-.1 1 1 0 0 1-.5-1.3L20.2.58a1 1 0 0 1 1.8.8l-10.3 22.4a.87.87 0 0 1-.9.6z","data-name":"path-1"}))};function St(){return(St=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Pt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",St({"data-name":"Layer 1"},n,{viewBox:"0 0 32.02 28.73"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M.9.42H8a.94.94 0 0 1 1 1v26a1 1 0 0 1-.9 1H.9a.92.92 0 0 1-.9-1v-26a.92.92 0 0 1 .9-1zM2 26.52h5v-2H2zm0-22.1h5v-2H2zm0 18h5v-16H2zm8.9-22H18a.94.94 0 0 1 1 1v26a1 1 0 0 1-.9 1H11a.92.92 0 0 1-.9-1v-26a.81.81 0 0 1 .8-1zm1.1 26.1h5v-2h-5zm0-22.1h5v-2h-5zm0 18h5v-16h-5zm7.8-21.3l7-1.1a1 1 0 0 1 1.1.8l4.1 25.7a1 1 0 0 1-.8 1.1l-7 1.1a1 1 0 0 1-1.1-.8L19 2.32a1 1 0 0 1 .8-1.2zm5.1 25.6l4.9-.8-.3-2-4.9.8zm-3.4-21.8l4.9-.8-.3-2-4.9.8zm2.8 17.8l4.9-.8-2.5-15.8-4.9.8z","data-name":"path-1"}))};function Mt(){return(Mt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Bt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Mt({"data-name":"Layer 1"},n,{viewBox:"0 0 32.01 31.98"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16.03 23.38c-.1 0-.1 0-.2.1a9.29 9.29 0 0 0-1 .5l-6.7-6.7a5.9 5.9 0 0 1 .4-.8.52.52 0 0 0 .2-.4 39.83 39.83 0 0 1 7.4-10.2c4.8-4.9 11.5-3.8 13.4-3.3.4 1.9 1.5 8.7-3.2 13.4a38.3 38.3 0 0 1-10.3 7.4m3.1 4a8.28 8.28 0 0 1-2.7 1.7 13.21 13.21 0 0 0 1-4.2c.8-.4 1.9-1 3-1.7a6 6 0 0 1-1.3 4.2m-16.1-11.7a11.1 11.1 0 0 1 1.7-2.7 5.85 5.85 0 0 1 4.1-1.3c-.7 1.1-1.3 2.2-1.7 3a12.15 12.15 0 0 0-4.1 1m28.3-14.3c.1.4 2.9 9.5-3.6 16a41.85 41.85 0 0 1-5.5 4.6c0 .1 0 .1.1.1 0 .2.7 4.2-1.8 6.7a14.1 14.1 0 0 1-6.4 3.2h-.2a1.05 1.05 0 0 1-.9-.5 1.06 1.06 0 0 1 .2-1.2 7.75 7.75 0 0 0 2.1-4.4 1.24 1.24 0 0 0-.3.2c-.1 0-.2.1-.3.1a.91.91 0 0 1-.7-.3l-7.7-7.7a1.13 1.13 0 0 1-.3-1.1.77.77 0 0 1 .1-.3 7.48 7.48 0 0 0-4.4 2.1.91.91 0 0 1-.7.3.9.9 0 0 1-.5-.1 1 1 0 0 1-.5-1.1 15.33 15.33 0 0 1 3.2-6.4c2.4-2.4 6.5-1.8 6.7-1.8h.1a41.85 41.85 0 0 1 4.6-5.5c6.5-6.5 15.6-3.7 16-3.6a1.2 1.2 0 0 1 .7.7zm-8.5 4a4.3 4.3 0 0 0-2.8 1.1 3.55 3.55 0 0 0-1.1 2.8 4.3 4.3 0 0 0 1.1 2.8 3.84 3.84 0 0 0 2.8 1.1 4.3 4.3 0 0 0 2.8-1.1 3.92 3.92 0 0 0 0-5.5 3.78 3.78 0 0 0-2.8-1.2zm1.4 5.2a2 2 0 0 1-2.7 0 1.82 1.82 0 0 1-.6-1.4 2 2 0 0 1 .6-1.4 1.82 1.82 0 0 1 1.4-.6 2 2 0 0 1 1.4.6 2.25 2.25 0 0 1-.1 2.8zm-19.5 12a3.394 3.394 0 1 1 4.8 4.8c-1.1 1.1-4.4 1.6-5.4 1.7h-.1a.91.91 0 0 1-.7-.3 1.14 1.14 0 0 1-.3-.8c.1-1 .6-4.3 1.7-5.4zm3.4 3.3a1.39 1.39 0 0 0 0-1.9 1.28 1.28 0 0 0-1-.4 1.28 1.28 0 0 0-1 .4 7.51 7.51 0 0 0-.9 2.9 9.18 9.18 0 0 0 2.9-1z","data-name":"path-1"}))};function Lt(){return(Lt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ht=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Lt({"data-name":"Layer 1"},n,{viewBox:"0 0 26 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M4.2 24.8h10.9v-2H5.8a39 39 0 0 1 3.8-3.3l-1.2-1.6C4.3 21 0 25.1 0 32h2a8.08 8.08 0 0 1 .1-1.6v.1h16v-2H2.5a14 14 0 0 1 1.7-3.7","data-name":"Fill-1"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M21.7 7.3H11.1v2H20a29.24 29.24 0 0 1-3.8 3.2l1.2 1.6C21.7 11.1 26 7 26 0h-2a8.08 8.08 0 0 1-.1 1.6H8.1v2h15.4a11.58 11.58 0 0 1-1.8 3.7","data-name":"Fill-3"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M13.6 15.2C7.6 11.2 2 7.5 2 0H0c0 8.5 6.3 12.8 12.4 16.8S24 24.5 24 32h2c0-8.5-6.3-12.8-12.4-16.8","data-name":"Fill-6"}))};function Nt(){return(Nt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Tt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Nt({"data-name":"Layer 1"},n,{viewBox:"0 0 32 30.59"}),Object(o.a)("path",{fill:t,d:"M7.27 9.94v20.64H.4V9.94zm.44-6.38a3.56 3.56 0 0 1-3.88 3.56A3.57 3.57 0 1 1 3.87 0a3.55 3.55 0 0 1 3.84 3.56zM32 18.75v11.83h-6.85v-11c0-2.77-1-4.67-3.48-4.67a3.75 3.75 0 0 0-3.52 2.5 5.12 5.12 0 0 0-.23 1.69v11.48h-6.86c.09-18.71 0-20.64 0-20.64h6.86v3h-.05a6.81 6.81 0 0 1 6.23-3.48c4.53 0 7.9 3 7.9 9.29z"}))};function Vt(){return(Vt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var It=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Vt({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,d:"M4.94 26.79h4.81V12.33H4.94zm5.12-18.92a2.5 2.5 0 0 0-2.69-2.5 2.51 2.51 0 1 0-.06 5 2.51 2.51 0 0 0 2.75-2.5zm12.19 18.92h4.81V18.5c0-4.44-2.37-6.5-5.54-6.5a4.74 4.74 0 0 0-4.35 2.44v-2.11H12.4s.06 1.36 0 14.46h4.81v-8.08a3.51 3.51 0 0 1 .14-1.17 2.67 2.67 0 0 1 2.48-1.75c1.73 0 2.42 1.31 2.42 3.27v7.73zM32 6v20a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6z"}))};function Ft(){return(Ft=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Rt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Ft({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M20 20c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v7zM8 7c0-2.206 1.794-4 4-4s4 1.794 4 4v3H8V7zm11 3h-1V7c0-3.306-2.694-6-6-6a6.01 6.01 0 0 0-6 6v3H5c-1.656 0-3 1.344-3 3v7c0 1.656 1.344 3 3 3h14c1.656 0 3-1.344 3-3v-7c0-1.656-1.344-3-3-3z"})))};function Dt(){return(Dt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ut=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Dt({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M24 0v4h-4V0h-2v4h-4V0h-2v4H8V0H6v4H4v2H0v2h4v4H0v2h4v4H0v2h4v4H0v2h4v2h2v4h2v-4h4v4h2v-4h4v4h2v-4h4v4h2v-4h2v-2h4v-2h-4v-4h4v-2h-4v-4h4v-2h-4V8h4V6h-4V4h-2V0zM6 24V6h20v20H6z","data-name":"Page-1"}))};function Wt(){return(Wt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var qt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Wt({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t,"fill-rule":"nonzero"},Object(o.a)("path",{d:"M12 0C6.488 0 2 4.488 2 10c0 1.769.513 3.606 1.531 5.463.787 1.444 1.881 2.906 3.244 4.35 2.3 2.431 4.575 3.956 4.669 4.019a1 1 0 0 0 1.112 0c.094-.063 2.369-1.587 4.669-4.019 1.369-1.444 2.456-2.906 3.244-4.35C21.481 13.607 22 11.763 22 10c0-5.512-4.488-10-10-10zm0 21.769C10.1 20.363 4 15.413 4 10c0-4.413 3.588-8 8-8s8 3.588 8 8c0 5.412-6.106 10.362-8 11.769z"}),Object(o.a)("path",{d:"M12 6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"}))))};function Yt(){return(Yt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var $t=function(e){var t=e.bgColor,n=e.fgColor,r=(e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Yt({},r,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{"fill-rule":"nonzero"},Object(o.a)("path",{fill:t,d:"M12 0C6.488 0 2 4.488 2 10c0 1.769.513 3.606 1.531 5.463.787 1.444 1.881 2.906 3.244 4.35 2.3 2.431 4.575 3.956 4.669 4.019a1 1 0 0 0 1.112 0c.094-.063 2.369-1.587 4.669-4.019 1.369-1.444 2.456-2.906 3.244-4.35C21.481 13.607 22 11.763 22 10c0-5.512-4.488-10-10-10z"}),Object(o.a)("path",{fill:n,d:"M12 6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"}))))};function Jt(){return(Jt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Gt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Jt({"data-name":"Layer 1"},n,{viewBox:"0 0 31.9 28"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30 21a.94.94 0 0 1-1 1l-3-.5v-17l3-.5a.94.94 0 0 1 1 1zM3 18a.94.94 0 0 1-1-1V9a.94.94 0 0 1 1-1l21-3.2v16.5zm11 7.8l-6-1.5v-3.4l6 .9zM30 0v2L2 6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2l4 .6V25a.94.94 0 0 0 1 1l7.7 2h.5a1 1 0 0 0 .7-.9v-5l14 2v2h2V0z","data-name":"Page-1"}))};function Zt(){return(Zt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Qt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Zt({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30.3 8.8H28a13.68 13.68 0 0 1 2 7.2A14 14 0 1 1 16 2a14.48 14.48 0 0 1 7.4 2.1V1.8A15.29 15.29 0 0 0 16 0a16 16 0 1 0 16 16 15.6 15.6 0 0 0-1.7-7.2","data-name":"Fill-1"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16 8a8.15 8.15 0 0 1 3.1.6l1.5-1.5A10.39 10.39 0 0 0 16 6a10 10 0 1 0 10 10 9.39 9.39 0 0 0-1.2-4.7l-1.5 1.5A8.76 8.76 0 0 1 24 16a8 8 0 1 1-8-8","data-name":"Fill-4"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16 16.5a.5.5 0 1 1 .5-.5.47.47 0 0 1-.5.5zm.9-2.8a2.92 2.92 0 0 0-.9-.2 2.5 2.5 0 1 0 2.5 2.5 2.39 2.39 0 0 0-.2-.9L25.4 8H30V6h-2.6l1.8-1.8-1.4-1.4L26 4.5V2h-2v4.6z","data-name":"Fill-6"}))};function Xt(){return(Xt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Kt=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Xt({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M21 11H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1M3 6h18c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1M21 18H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1"}))))};function en(){return(en=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var tn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",en({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1"}),Object(o.a)("path",{d:"M16 11H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1"}))))};function nn(){return(nn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var on=function(e){var t=e.bgColor,n=e.fgColor,r=(e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",nn({},r,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("circle",{cx:"11",cy:"11",r:"11",fill:t,transform:"translate(1 1)"}),Object(o.a)("path",{fill:n,d:"M16 11H8c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1"})))};function rn(){return(rn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ln=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",rn({"data-name":"Layer 1"},n,{viewBox:"0 0 20 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M8.6 27.4a1.72 1.72 0 0 1-.2-2.4 1.7 1.7 0 0 1 2.3-.7 1.71 1.71 0 0 1 1.2 2.1c-.1 1-.7 1.5-1.8 1.6a1.75 1.75 0 0 1-1.5-.6zM18 22H2v6a1.68 1.68 0 0 0 .6 1.4A2.25 2.25 0 0 0 4 30h12a1.68 1.68 0 0 0 1.4-.6A2.25 2.25 0 0 0 18 28zm0-18a1.68 1.68 0 0 0-.6-1.4A2.25 2.25 0 0 0 16 2H4a1.68 1.68 0 0 0-1.4.6A2.25 2.25 0 0 0 2 4v16h16V4zm2 0v24a4.1 4.1 0 0 1-4 4H4a3.78 3.78 0 0 1-2.8-1.2A3.78 3.78 0 0 1 0 28V4a3.78 3.78 0 0 1 1.2-2.8A3.78 3.78 0 0 1 4 0h12a3.78 3.78 0 0 1 2.8 1.2A3.78 3.78 0 0 1 20 4z","data-name":"Page-1"}))};function an(){return(an=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var sn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",an({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M14.07 12a2 2 0 1 1-4.002-.001 2 2 0 0 1 4.001.001M6 12A2 2 0 1 1 2 11.999 2 2 0 0 1 6 12M22.139 12a2 2 0 1 1-4.002-.001A2 2 0 0 1 22.14 12"}))))};function cn(){return(cn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var un=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",cn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 29.3"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M21.9 27.3a8.39 8.39 0 0 1-4.4-1.3 10.6 10.6 0 0 0 2.7-6.7 10.06 10.06 0 0 0 5.7-7.1 8.07 8.07 0 0 1-4 15.1M2 19.2a8.16 8.16 0 0 1 4.1-7 10.06 10.06 0 0 0 5.7 7.1 9.45 9.45 0 0 0 2.7 6.7 8.39 8.39 0 0 1-4.4 1.3A8.13 8.13 0 0 1 2 19.2M16 1.9a8.14 8.14 0 0 1 8.1 7.3 7.84 7.84 0 0 0-2.2-.2 10.13 10.13 0 0 0-5.9 1.9A10.13 10.13 0 0 0 10.1 9a16.35 16.35 0 0 0-2.2.2A8.22 8.22 0 0 1 16 1.9m0 16.3a7.61 7.61 0 0 1-2.1-.3 8.7 8.7 0 0 1 2.1-4.3 8.31 8.31 0 0 1 2.1 4.3 15.17 15.17 0 0 1-2.1.3m-8-6.9a7.61 7.61 0 0 1 2.1-.3 8.39 8.39 0 0 1 4.4 1.3 10.08 10.08 0 0 0-2.5 4.8 8.14 8.14 0 0 1-4-5.8m8 13.4a8.23 8.23 0 0 1-2.2-4.8 7.84 7.84 0 0 0 2.2.2 16.35 16.35 0 0 0 2.2-.2 8.23 8.23 0 0 1-2.2 4.8m4-7.6a10.12 10.12 0 0 0-2.5-4.8 8.39 8.39 0 0 1 4.4-1.3 7.61 7.61 0 0 1 2.1.3 8.14 8.14 0 0 1-4 5.8m6.1-7.1a10.1 10.1 0 0 0-20.2 0A10.11 10.11 0 1 0 16 27.4 10.11 10.11 0 1 0 26.1 10","data-name":"path-1"}))};function dn(){return(dn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var fn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",dn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M25.4 16.9a9.75 9.75 0 0 0 3.4-3.3A8.14 8.14 0 0 0 30 9a8.32 8.32 0 0 0-2.7-6.3A8.32 8.32 0 0 0 21 0a8.31 8.31 0 0 0-4.4 1.2 8.66 8.66 0 0 0-3.2 3.1 1.69 1.69 0 0 0 .2.5c.2.5.3.8.4 1a2.18 2.18 0 0 0 .4.5c.2.1.3.1.5-.1a5 5 0 0 0 .4-1.3A6.88 6.88 0 0 1 21 2a6.51 6.51 0 0 1 4.9 2.1A6.51 6.51 0 0 1 28 9a6.88 6.88 0 0 1-1.7 4.6 6.56 6.56 0 0 1-4.3 2.3 6.16 6.16 0 0 1-.6 2.6c5.8 1 8.6 3.5 8.6 7.4h2q0-6.6-6.6-9zm-9.5 3A6.66 6.66 0 0 0 18 15a6.51 6.51 0 0 0-2.1-4.9A6.51 6.51 0 0 0 11 8a6.51 6.51 0 0 0-4.9 2.1A6.51 6.51 0 0 0 4 15a6.51 6.51 0 0 0 2.1 4.9A6.66 6.66 0 0 0 11 22a6.51 6.51 0 0 0 4.9-2.1zM20 32a7 7 0 0 0-2.3-5.3 9.81 9.81 0 0 0-6.7-2.2c-3.1 0-5.4.7-6.8 2.1A7 7 0 0 0 2 32H0a9.06 9.06 0 0 1 1.8-5.5 10.68 10.68 0 0 1 4.9-3.6 9.75 9.75 0 0 1-3.4-3.3A8.21 8.21 0 0 1 2 15a8.32 8.32 0 0 1 2.7-6.3A8.32 8.32 0 0 1 11 6a8.32 8.32 0 0 1 6.3 2.7A8.63 8.63 0 0 1 20 15a8.81 8.81 0 0 1-4.6 7.9c4.4 1.6 6.6 4.7 6.6 9.1z","data-name":"Page-1"}))};function bn(){return(bn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var pn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",bn({},n,{viewBox:"0 0 24 24"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M19.276 7.329l-2.61-2.61c1.44-1.44 2.469-2.75 3.92-1.31 1.44 1.45.129 2.48-1.31 3.92zm-12.4 12.4c-1.44 1.44-3.92 1.31-3.92 1.31s-.13-2.48 1.309-3.92l8.485-8.485 2.61 2.61-8.484 8.485zM17.97 8.633L16.666 9.94l-2.611-2.611 1.306-1.305 2.609 2.61zm3.915-6.526c-2.16-2.16-4.36-.86-6.53 1.301l-12.4 12.4c-2.16 2.17-1.95 7.18-1.95 7.18s5.01.21 7.18-1.95l12.4-12.4c2.16-2.17 3.46-4.37 1.3-6.53z"}))};function mn(){return(mn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var hn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",mn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 28"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16 0L0 8l16 8 16-8zM4 7.8L16 2l12 5.8L16 14zM27.5 14L16 20 4.5 14H0l16 8 16-8zm0 6L16 26 4.5 20H0l16 8 16-8z","data-name":"Page-1"}))};function vn(){return(vn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var yn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",vn({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M19.651 8.87c-.573 0-1.043.47-1.043 1.043V12a6.271 6.271 0 0 1-6.26 6.261c-3.45 0-6.26-2.81-6.26-6.26V9.912c0-.574-.47-1.044-1.044-1.044C4.47 8.87 4 9.34 4 9.913V12c0 4.252 3.188 7.767 7.304 8.283v1.631h-3.13c-.575 0-1.044.47-1.044 1.044C7.13 23.53 7.6 24 8.173 24h8.348c.574 0 1.043-.47 1.043-1.043 0-.574-.469-1.044-1.043-1.044h-3.13v-1.63c4.115-.517 7.304-4.032 7.304-8.284V9.913c0-.574-.47-1.044-1.044-1.044"}),Object(o.a)("path",{fill:t,d:"M10.26 4.174c0-1.147.94-2.087 2.088-2.087 1.147 0 2.087.94 2.087 2.087v7.825c0 1.149-.94 2.087-2.087 2.087a2.092 2.092 0 0 1-2.087-2.087V4.174zm2.088 11.999a4.178 4.178 0 0 0 4.174-4.174V4.174A4.178 4.178 0 0 0 12.348 0a4.178 4.178 0 0 0-4.174 4.174v7.825a4.178 4.178 0 0 0 4.174 4.174z"})))};function gn(){return(gn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var jn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",gn({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M21 16c0 .55-.45 1-1 1h-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v3H4c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5zM7 21h10v-6H7v6zM7 8h10V3H7v5zm13 0h-1V2c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v6H4c-1.656 0-3 1.344-3 3v5c0 1.656 1.344 3 3 3h1v3c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3h1c1.656 0 3-1.344 3-3v-5c0-1.656-1.344-3-3-3z"})))};function On(){return(On=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var _n=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",On({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M15 23.5h2v-10h-2zm2.2-13.8a1.1 1.1 0 1 1-1.9-.8 1.23 1.23 0 0 1 .8-.4.91.91 0 0 1 .8.4 1.14 1.14 0 0 1 .3.8zM30 16a13.51 13.51 0 0 0-4.1-9.9A13.51 13.51 0 0 0 16 2a13.51 13.51 0 0 0-9.9 4.1A13.51 13.51 0 0 0 2 16a13.51 13.51 0 0 0 4.1 9.9A13.51 13.51 0 0 0 16 30a13.51 13.51 0 0 0 9.9-4.1A13.51 13.51 0 0 0 30 16zm2 0a15.48 15.48 0 0 1-4.7 11.3A15.48 15.48 0 0 1 16 32a15.48 15.48 0 0 1-11.3-4.7A15.48 15.48 0 0 1 0 16 15.48 15.48 0 0 1 4.7 4.7 15.48 15.48 0 0 1 16 0a15.48 15.48 0 0 1 11.3 4.7A15.48 15.48 0 0 1 32 16z","data-name":"Page-1"}))};function An(){return(An=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var wn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",An({"data-name":"Layer 1"},n,{viewBox:"0 0 25.9 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M11.9 19.3v10.1l-10-5.1V14.2zm12-5.1v10.1l-10 5.1V19.3zm2 10.8v.2c0 .1-.1.1-.1.2s-.1.1-.1.2-.1.1-.2.1l-.1.1-12 6.1a1.09 1.09 0 0 1-.5.1.6.6 0 0 1-.4-.1l-12-6.1-.1-.1c-.1 0-.1-.1-.2-.1a.35.35 0 0 1-.1-.2c0-.1-.1-.1-.1-.2V12.6a.37.37 0 0 1 .1-.3v-.1c0-.1.1-.2.2-.3l.2-.2 8.7-5a.88.88 0 0 1 1.3.4 1 1 0 0 1-.4 1.4L3 12.6l9.9 5 9.9-5-7-4a1.11 1.11 0 0 1-.4-1.4.92.92 0 0 1 1.3-.4l8.6 4.9a.22.22 0 0 1 .2.2c.1.1.1.2.2.3v.1c0 .1.1.2.1.3v12.3zM10.2 5.2a1 1 0 0 1-1.4-1.4L12.2.3c.1-.1.2-.2.3-.2a.37.37 0 0 1 .3-.1h.1a.6.6 0 0 1 .4.1.22.22 0 0 1 .2.2h.1L17 3.8a1 1 0 0 1 0 1.4 1 1 0 0 1-1.4 0l-1.7-1.8v7.7a.94.94 0 0 1-1 1 1 1 0 0 1-1-1V3.4z","data-name":"path-1"}))};function Cn(){return(Cn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var xn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Cn({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t,"fill-rule":"nonzero"},Object(o.a)("path",{d:"M24 4.5c0-.55-.45-1-1-1s-1 .45-1 1v3.687l-2.944-2.769a9.939 9.939 0 0 0-7.062-2.919 9.9 9.9 0 0 0-5.806 1.863 10.09 10.09 0 0 0-3.619 4.8 1 1 0 0 0 1.881.681 8.164 8.164 0 0 1 2.9-3.85 7.923 7.923 0 0 1 4.644-1.494c2.138 0 4.15.831 5.656 2.344a.094.094 0 0 0 .025.019l2.8 2.631H17c-.55 0-1 .45-1 1s.45 1 1 1h6.099a.86.86 0 0 0 .262-.063.969.969 0 0 0 .369-.25.984.984 0 0 0 .206-.331c0-.006 0-.006.006-.012v-.006-.006-.006-.006c0-.006 0-.006.006-.012.025-.075.044-.162.05-.244v-.006-.006-.012-.012-.012-.006-6L24 4.5zM20.813 14.625a1 1 0 0 0-1.281.6 8.035 8.035 0 0 1-7.525 5.275 7.93 7.93 0 0 1-5.656-2.344c-.006-.006-.012-.012-.025-.019l-2.8-2.637h3.475c.55 0 1-.45 1-1s-.45-1-1-1h-6a.975.975 0 0 0-.425.094s-.006 0-.006.006c0 0-.006 0-.006.006-.006 0-.006.006-.012.006a1.16 1.16 0 0 0-.225.156l-.006.006s-.006 0-.006.006l-.006.006-.006.006-.006.006c-.025.025-.044.05-.069.075a.866.866 0 0 0-.125.206c0 .006 0 .006-.006.012 0 0 0 .006-.006.006v.012s0 .006-.006.006c-.038.1-.063.213-.069.325v6.042c0 .55.45 1 1 1s1-.45 1-1v-3.687l2.944 2.769a9.939 9.939 0 0 0 7.062 2.919c4.194 0 7.975-2.65 9.406-6.594a1.008 1.008 0 0 0-.612-1.269l-.003.005z"}))))};function zn(){return(zn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var En=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",zn({"data-name":"Layer 1"},n,{viewBox:"0 0 26 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M17.9.4l3.4 4.2a1 1 0 0 1-.2 1.4 1.42 1.42 0 0 1-.6.2.91.91 0 0 1-.8-.4l-1.8-2.3A17.12 17.12 0 0 1 1 18.2a1 1 0 0 1 0-2A15.18 15.18 0 0 0 16 3.3l-2.4 1.9a1 1 0 0 1-1.2-1.6L16.6.2a.1.1 0 0 0 .1-.1c.1 0 .1-.1.2-.1h.5c.1 0 .1 0 .2.1a.1.1 0 0 1 .1.1.22.22 0 0 1 .2.2zM1 24.3a.94.94 0 0 1 1 1V31a.94.94 0 0 1-1 1 .94.94 0 0 1-1-1v-5.7a1 1 0 0 1 1-1zm8-4.8a.94.94 0 0 1 1 1V31a1 1 0 0 1-2 0V20.5a.94.94 0 0 1 1-1zm8-3.5a.94.94 0 0 1 1 1v14a1 1 0 0 1-2 0V17a.94.94 0 0 1 1-1zm8-5.2a.94.94 0 0 1 1 1V31a1 1 0 0 1-2 0V11.8a1 1 0 0 1 1-1z","data-name":"path-1"}))};function kn(){return(kn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Sn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",kn({"data-name":"Layer 1"},n,{viewBox:"0 0 30 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M28 29a.94.94 0 0 1-1 1H16V11.4l6 2.6a2 2 0 0 0 2-2V7h3a.94.94 0 0 1 1 1zM22 4.4V11a.94.94 0 0 1-1 1l-4.4-2.2zM8.6 2.3l-.1-.1A.76.76 0 0 1 9 2h12a.76.76 0 0 1 .5.2c-.1 0-.1.1-.2.1L15 8.6zM14 30H3a.94.94 0 0 1-1-1V8a.94.94 0 0 1 1-1h3v5a2 2 0 0 0 2 2l6-2.6zM8 4.4l5.4 5.4L9 12a.94.94 0 0 1-1-1zM28 5h-4V2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v3H2a2 2 0 0 0-2 2v23a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM18 20h8v-2h-8z","data-name":"Page-1"}))};function Pn(){return(Pn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Mn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Pn({"data-name":"Layer 1"},n,{viewBox:"0 0 32.1 32.2"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M20 15h2v-2h-2zm0-4h-2v6h6v-6h-4zm-10 4h2v-2h-2zm4 2v-6H8v6h6zm-3 6h10v-2H11zm17.1 0a3.08 3.08 0 0 1-3 3H7a2.88 2.88 0 0 1-2.1-.9A2.88 2.88 0 0 1 4 23V9a2.88 2.88 0 0 1 .9-2.1A2.88 2.88 0 0 1 7 6h18.1a2.88 2.88 0 0 1 2.1.9 2.88 2.88 0 0 1 .9 2.1zM12 30.2h8v-2h-8zm19.7-19.4a.91.91 0 0 0-.7-.3h-1V9a4.54 4.54 0 0 0-1.5-3.5A4.85 4.85 0 0 0 25 4h-8V2h1a1.08 1.08 0 0 0 .7-.3.91.91 0 0 0 .3-.7.91.91 0 0 0-.3-.7A1.08 1.08 0 0 0 18 0h-4.1a1.08 1.08 0 0 0-.7.3.91.91 0 0 0-.3.7.91.91 0 0 0 .3.7 1.33 1.33 0 0 0 .7.3h1v2H7a4.54 4.54 0 0 0-3.5 1.5A4.54 4.54 0 0 0 2 9v1H1c-.7 0-1 .3-1 1v8c0 .7.3 1 1 1h1v3a4.54 4.54 0 0 0 1.5 3.5A4.85 4.85 0 0 0 7 28h3v4.2h12V28h3.1a4.54 4.54 0 0 0 3.5-1.5 4.85 4.85 0 0 0 1.5-3.5v-3h1a1.08 1.08 0 0 0 .7-.3.91.91 0 0 0 .3-.7v-7.6a2.09 2.09 0 0 0-.4-.6z","data-name":"Page-1"}))};function Bn(){return(Bn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Ln=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Bn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 31.8"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30 2H2v3.9h28zm0-2a1.68 1.68 0 0 1 1.4.6A2.51 2.51 0 0 1 32 2v3.9a1.68 1.68 0 0 1-.6 1.4 2.25 2.25 0 0 1-1.4.6H2a1.68 1.68 0 0 1-1.4-.6A2.25 2.25 0 0 1 0 5.9V2A2 2 0 0 1 .6.6 1.82 1.82 0 0 1 2 0zm-4 14H6v3.9h20zm0-2a1.68 1.68 0 0 1 1.4.6A2.51 2.51 0 0 1 28 14v3.9a1.68 1.68 0 0 1-.6 1.4 2.51 2.51 0 0 1-1.4.6H6a1.68 1.68 0 0 1-1.4-.6 2.25 2.25 0 0 1-.6-1.4V14a2 2 0 0 1 .6-1.4A1.82 1.82 0 0 1 6 12zm-4 13.9H10v3.9h12zm0-2a1.68 1.68 0 0 1 1.4.6 2.51 2.51 0 0 1 .6 1.4v3.9a2.05 2.05 0 0 1-2 2H10a1.68 1.68 0 0 1-1.4-.6 2.23 2.23 0 0 1-.6-1.3V26a1.68 1.68 0 0 1 .6-1.4A2.51 2.51 0 0 1 10 24h12z"}))};function Hn(){return(Hn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Nn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Hn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M16 27v-1h2v1h6v-3h3V8h-3V5H8v3H5v6h1v2H5v8h3v3zm8-27h8v8h-3v16h3v8h-8v-3H8v3H0v-8h3V8H0V0h8v3h16zm2 5v1h4V2h-4v3zM2 2v4h4V2zm24 27v1h4v-4h-4v3zM2 26v4h4v-4H2zm6-12h2v2H8zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z","data-name":"path-1"}))};function Tn(){return(Tn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Vn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Tn({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M9.518 15.035A5.524 5.524 0 0 1 4 9.517 5.524 5.524 0 0 1 9.518 4a5.524 5.524 0 0 1 5.518 5.517 5.524 5.524 0 0 1-5.518 5.518m12.189 5.258l-6.221-6.222a7.469 7.469 0 0 0 1.55-4.554C17.036 5.372 13.664 2 9.518 2S2 5.372 2 9.517c0 4.145 3.372 7.518 7.518 7.518a7.471 7.471 0 0 0 4.554-1.55l6.22 6.222a1 1 0 0 0 1.415-1.414"})))};function In(){return(In=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Fn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",In({"data-name":"Layer 1"},n,{viewBox:"0 0 28.01 30.01"}),Object(o.a)("path",{fill:t,d:"M22 18a6 6 0 0 0-4.77 2.4l-5.38-3.1A6.16 6.16 0 0 0 12 16a5.94 5.94 0 0 0-.29-1.75l6.41-3.71A5.93 5.93 0 0 0 22 12a6 6 0 1 0-6-6 6.38 6.38 0 0 0 .11 1.08L9.32 11A6 6 0 1 0 6 22a5.91 5.91 0 0 0 3.71-1.32L16 24.34A6 6 0 1 0 22 18zm0-14a2 2 0 1 1-2 2 2 2 0 0 1 2-2zM6 18a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm16 8a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"}))};function Rn(){return(Rn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Dn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Rn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M23.7 18a6.82 6.82 0 0 0 0-4h6.1a13.55 13.55 0 0 1 .2 2 13.55 13.55 0 0 1-.2 2zM20 29.4v-6.5a8.06 8.06 0 0 0 2.9-2.9h6.5a13.87 13.87 0 0 1-9.4 9.4zm-2 .4a13.55 13.55 0 0 1-2 .2 13.55 13.55 0 0 1-2-.2v-6.1a6.82 6.82 0 0 0 4 0zm-6-.4A13.87 13.87 0 0 1 2.6 20h6.5a8.06 8.06 0 0 0 2.9 2.9zM2 16a13.55 13.55 0 0 1 .2-2h6.1a6.82 6.82 0 0 0 0 4H2.2a13.55 13.55 0 0 1-.2-2zM12 2.6v6.5A8.06 8.06 0 0 0 9.1 12H2.6A13.87 13.87 0 0 1 12 2.6zm2-.4a13.55 13.55 0 0 1 2-.2 13.55 13.55 0 0 1 2 .2v6.1a6.82 6.82 0 0 0-4 0zM22 16a6 6 0 1 1-6-6 6 6 0 0 1 6 6zM20 2.6a13.87 13.87 0 0 1 9.4 9.4h-6.5A8.06 8.06 0 0 0 20 9.1zM16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0z","data-name":"path-1"}))};function Un(){return(Un=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Wn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Un({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M10.5 4.7a5.57 5.57 0 0 1 11 0H29a3 3 0 0 1 3 3V29a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V7.7a3 3 0 0 1 3-3zm0 2H3a.94.94 0 0 0-1 1V29a.94.94 0 0 0 1 1h26a.94.94 0 0 0 1-1V7.7a.94.94 0 0 0-1-1h-7.5v2a.94.94 0 0 1-1 1h-9.1a.94.94 0 0 1-1-1v-2zm2 1h7.1V5.5A3.48 3.48 0 0 0 16.1 2a3.54 3.54 0 0 0-3.5 3.5v2.2zm5.1 19.4H5.8a.94.94 0 0 1-1-1v-1.3a2.79 2.79 0 0 1 1.5-2.4l2.1-1.3a3.86 3.86 0 0 1-1.1-2.7l-.1-2.6a4.23 4.23 0 0 1 4.2-4.2h.6a4.14 4.14 0 0 1 4.2 4.1l-.1 2.7a3.86 3.86 0 0 1-1.1 2.7l2.1 1.3a2.79 2.79 0 0 1 1.5 2.4v1.3a1.08 1.08 0 0 1-1 1zm-10.8-2h9.7v-.3a.68.68 0 0 0-.4-.6.1.1 0 0 1-.1-.1L12.7 22a1.05 1.05 0 0 1-.5-.9 1 1 0 0 1 .6-.9 2.3 2.3 0 0 0 1.3-2l.1-2.6a2.2 2.2 0 0 0-2.2-2.1h-.7a2.2 2.2 0 0 0-2.2 2.1l.1 2.6a2.19 2.19 0 0 0 1.3 2 1.06 1.06 0 0 1 0 1.8l-3.4 2.1a.1.1 0 0 0-.1.1.68.68 0 0 0-.4.6v.3zm17.5-9.2h-2.7a1 1 0 0 1 0-2h2.7a.94.94 0 0 1 1 1 1.08 1.08 0 0 1-1 1zm3 4.4h-5.7a1 1 0 0 1 0-2h5.7a.94.94 0 0 1 1 1 1 1 0 0 1-1 1zm0 4.4h-5.7a1 1 0 0 1 0-2h5.7a.94.94 0 0 1 1 1 1 1 0 0 1-1 1z","data-name":"path-1"}))};function qn(){return(qn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Yn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",qn({"data-name":"Layer 1"},n,{viewBox:"0 0 32.02 32.2"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M25.41 24.5a1.14 1.14 0 0 0-1.2.6l-1.3 3.5-2.9-5.2a11.61 11.61 0 0 0 5.7-4.3l3.4 6.2zm-9.4-2.4a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm-6.9 6.5l-1.3-3.5a.93.93 0 0 0-1.2-.6l-3.7.8 3.4-6.2a11.77 11.77 0 0 0 5.6 4.2zm22.8-2.3l-5-9.3a11.81 11.81 0 0 0 1.1-5 12 12 0 0 0-12-12 12.19 12.19 0 0 0-12 12.1 12.63 12.63 0 0 0 1.1 5.1l-5 9.2a.92.92 0 0 0 .1 1 1 1 0 0 0 1 .4l5-1.1 1.7 4.8a1.11 1.11 0 0 0 .9.7h.1a1.05 1.05 0 0 0 .9-.5l4.1-7.7a14.92 14.92 0 0 0 2.1.2 12.31 12.31 0 0 0 2-.2l4.2 7.7a1.05 1.05 0 0 0 .9.5h.1a1.07 1.07 0 0 0 .9-.7l1.7-4.8 5 1.1a1 1 0 0 0 1-.4 1.07 1.07 0 0 0 .1-1.1z","data-name":"path-1"}))};function $n(){return($n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Jn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",$n({"data-name":"Layer 1"},n,{viewBox:"0 0 28 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M10 6h8V4h-8zm16 2H2V3a.94.94 0 0 1 1-1h22a.94.94 0 0 1 1 1zm0 11v1H2V10h24zm-2 7a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm-3.4 0H7.4a4.66 4.66 0 0 0 .6-2 3.61 3.61 0 0 0-.6-2h13.1a4.66 4.66 0 0 0-.6 2 4.79 4.79 0 0 0 .7 2zM4 26a2 2 0 1 1 2-2 2 2 0 0 1-2 2zM26 0H2a2 2 0 0 0-2 2v22a3.76 3.76 0 0 0 2 3.4V31a.94.94 0 0 0 1 1 .94.94 0 0 0 1-1v-3h20v3a1 1 0 0 0 2 0v-3.6a4 4 0 0 0 2-3.4V2a2 2 0 0 0-2-2z","data-name":"Page-1"}))};function Gn(){return(Gn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Zn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Gn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 25.99"}),Object(o.a)("path",{fill:t,d:"M32 3.09a13.94 13.94 0 0 1-3.29 3.39v.85C28.73 16 22.13 26 10.07 26A18.51 18.51 0 0 1 0 23.05a13.82 13.82 0 0 0 1.58.08 13.14 13.14 0 0 0 8.15-2.8 6.58 6.58 0 0 1-6.14-4.55 8.52 8.52 0 0 0 1.24.1 7.07 7.07 0 0 0 1.73-.22A6.56 6.56 0 0 1 1.3 9.22v-.08a6.55 6.55 0 0 0 3 .83 6.58 6.58 0 0 1-2-8.77 18.64 18.64 0 0 0 13.53 6.86 7.41 7.41 0 0 1-.17-1.5A6.56 6.56 0 0 1 22.15 0a6.49 6.49 0 0 1 4.79 2.08A13.07 13.07 0 0 0 31.11.49a6.56 6.56 0 0 1-2.89 3.61 13 13 0 0 0 3.78-1z"}))};function Qn(){return(Qn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Xn=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Qn({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,d:"M26.67 10a9 9 0 0 1-2.52.71 4.43 4.43 0 0 0 1.93-2.44 8.49 8.49 0 0 1-2.79 1.06 4.38 4.38 0 0 0-7.56 3 4.09 4.09 0 0 0 .1 1 12.4 12.4 0 0 1-9-4.58A4.51 4.51 0 0 0 6.19 11a4.32 4.32 0 0 0 1.89 3.65A5.27 5.27 0 0 1 6 14.1v.05a4.46 4.46 0 0 0 3.6 4.29 3.73 3.73 0 0 1-1.06.16 5.56 5.56 0 0 1-.81-.08 4.39 4.39 0 0 0 4.08 3 8.79 8.79 0 0 1-5.44 1.88 8.93 8.93 0 0 1-1-.07A12.46 12.46 0 0 0 24.5 12.87a5.33 5.33 0 0 0 0-.56A8.46 8.46 0 0 0 26.67 10zM32 6v20a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6z"}))};function Kn(){return(Kn=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var eo=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",Kn({},n,{viewBox:"0 0 24 24"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M20.001 20.006c0 .55-.45 1-1 1h-14c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v7zm-1-10h-11V7c0-2.206 1.794-4 4-4a4.012 4.012 0 0 1 3.912 3.175.997.997 0 0 0 1.181.775c.537-.113.888-.644.775-1.181-.575-2.763-3.05-4.77-5.875-4.77-3.306 0-6 2.695-6 6.007v3H5c-1.656 0-3 1.344-3 3v7c0 1.656 1.344 3 3 3h14c1.656 0 3-1.344 3-3v-7c0-1.656-1.344-3-3-3h.001z"}))};function to(){return(to=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var no=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",to({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M19.023 19.549H4.975a.978.978 0 0 0-.975.976c0 .536.439.975.975.975h14.048a.979.979 0 0 0 .976-.975.979.979 0 0 0-.976-.976M6.75 10.679h2.526v7.32h5.334v-7.32h2.64a.76.76 0 0 0 .674-.393A.637.637 0 0 0 18 9.98a.64.64 0 0 0-.16-.428L12.59 3.27A.767.767 0 0 0 12 3a.773.773 0 0 0-.59.27L6.16 9.554a.652.652 0 0 0-.085.733.76.76 0 0 0 .675.393"}))))};function oo(){return(oo=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var ro=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",oo({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M19.02 17.61a8.332 8.332 0 0 0-4.29-3.43 4.84 4.84 0 0 0 2.13-4.02A4.867 4.867 0 0 0 12 5.3a4.867 4.867 0 0 0-4.86 4.86 4.84 4.84 0 0 0 2.13 4.02 8.332 8.332 0 0 0-4.29 3.43A8.914 8.914 0 0 1 3 12c0-4.96 4.04-9 9-9s9 4.04 9 9c0 2.12-.74 4.07-1.98 5.61m-9.88-7.45A2.866 2.866 0 0 1 12 7.3a2.859 2.859 0 1 1 0 5.72 2.859 2.859 0 0 1-2.86-2.86M12 21c-2.1 0-4.03-.72-5.56-1.93 1.05-2 3.15-3.36 5.56-3.36 2.41 0 4.51 1.36 5.56 3.36A8.926 8.926 0 0 1 12 21m0-20C5.94 1 1 5.94 1 12c0 2.95 1.17 5.63 3.07 7.6a9.59 9.59 0 0 0 1.72 1.46 10.904 10.904 0 0 0 12.42 0 9.59 9.59 0 0 0 1.72-1.46A10.908 10.908 0 0 0 23 12c0-6.06-4.94-11-11-11"})))};function lo(){return(lo=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var io=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",lo({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M20 26h6v-8h-6zm-2 2h10V16H18zM6 10h20V6H6zm-2 2h24V4H4zM30 0H2a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 29a.94.94 0 0 1-1 1H3a.94.94 0 0 1-1-1V3a.94.94 0 0 1 1-1h26a.94.94 0 0 1 1 1zM6 26h6v-8H6zm-2 2h10V16H4z","data-name":"path-1"}))};function ao(){return(ao=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var so=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ao({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("path",{fill:t,d:"M21.914 15.535l-4.467-3.188 4.467-3.189v6.378zm-7.305 2.03c0 .573-.468 1.042-1.043 1.042H3.131a1.046 1.046 0 0 1-1.043-1.043V7.13c0-.573.47-1.043 1.043-1.043h10.435c.575 0 1.043.47 1.043 1.043v10.435zm8.825-11.36a1.044 1.044 0 0 0-1.083.077l-5.656 4.037V7.13A3.13 3.13 0 0 0 13.565 4H3.13A3.132 3.132 0 0 0 0 7.13v10.435a3.132 3.132 0 0 0 3.13 3.13h10.435a3.13 3.13 0 0 0 3.13-3.13v-3.189l5.656 4.037a1.028 1.028 0 0 0 1.082.08c.345-.177.567-.536.567-.927V7.131c0-.39-.215-.75-.567-.926h.001z"})))};function co(){return(co=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var uo=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",co({"data-name":"Layer 1"},n,{viewBox:"0 0 31.9 23.9"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M22 12a5.45 5.45 0 0 0-1.8-4.2A5.45 5.45 0 0 0 16 6a5.45 5.45 0 0 0-4.2 1.8A5.45 5.45 0 0 0 10 12a5.45 5.45 0 0 0 1.8 4.2A5.76 5.76 0 0 0 16 18a5.6 5.6 0 0 0 4.2-1.8A5.45 5.45 0 0 0 22 12m2 0a8.06 8.06 0 0 1-13.7 5.7A8.061 8.061 0 0 1 21.7 6.3 8.1 8.1 0 0 1 24 12m0 6.5c1-.9 2.1-1.9 3.1-3s1.7-1.9 2.1-2.4A5.94 5.94 0 0 0 30 12l-.8-1a19.86 19.86 0 0 0-2.1-2.5A29.3 29.3 0 0 0 24 5.6a15.35 15.35 0 0 0-3.9-2.5 9.87 9.87 0 0 0-4.2-1 10.11 10.11 0 0 0-4.2 1.1A13.65 13.65 0 0 0 8 5.5c-1 .9-2.1 1.9-3.1 3s-1.7 1.9-2.1 2.4A5.94 5.94 0 0 0 2 12l.8 1a19.86 19.86 0 0 0 2.1 2.5A21.65 21.65 0 0 0 8 18.4a21.71 21.71 0 0 0 3.9 2.5 9.87 9.87 0 0 0 4.2 1 10.11 10.11 0 0 0 4.2-1.1 13.65 13.65 0 0 0 3.7-2.3m1.4-14.3a24 24 0 0 1 3.5 3.6 27.21 27.21 0 0 1 2.2 2.9 11.65 11.65 0 0 1 .8 1.3l-.8 1.2a30.6 30.6 0 0 1-2.3 3c-1 1.2-2.2 2.3-3.4 3.5a17.68 17.68 0 0 1-4.5 3 11.8 11.8 0 0 1-5 1.2 10.65 10.65 0 0 1-5-1.3 21 21 0 0 1-4.4-2.9A24 24 0 0 1 3 16.1a27.21 27.21 0 0 1-2.2-2.9 11.65 11.65 0 0 1-.8-1.3l.8-1.2a30.6 30.6 0 0 1 2.3-3c1-1.2 2.2-2.3 3.4-3.5a17.68 17.68 0 0 1 4.5-3A11.8 11.8 0 0 1 16 0a10.65 10.65 0 0 1 5 1.3 18.65 18.65 0 0 1 4.4 2.9","data-name":"Page-1"}))};function fo(){return(fo=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var bo=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",fo({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t},Object(o.a)("path",{d:"M20.869 19.976H3.13a1.046 1.046 0 0 1-.891-1.566L11.11 3.6l.006-.006c.197-.308.524-.492.89-.492.367 0 .702.19.898.505l8.856 14.797c.09.157.137.34.137.524a1.043 1.043 0 0 1-1.028 1.048zm2.698-2.634l-.007-.006-8.87-14.817c0-.006-.006-.006-.006-.013A3.137 3.137 0 0 0 11.999 1a3.127 3.127 0 0 0-2.691 1.526L.432 17.343s0 .007-.006.007A3.15 3.15 0 0 0 0 18.928a3.154 3.154 0 0 0 3.106 3.144h17.783a3.155 3.155 0 0 0 3.11-3.144c0-.556-.15-1.107-.43-1.585l-.002-.001z"}),Object(o.a)("path",{d:"M12 7.4c-.578 0-1.049.471-1.049 1.047v4.192c0 .577.471 1.05 1.048 1.05.576 0 1.048-.473 1.048-1.05V8.447c0-.576-.472-1.048-1.048-1.048M12 15.784a1.049 1.049 0 0 0 0 2.095 1.05 1.05 0 0 0 1.047-1.048A1.049 1.049 0 0 0 12 15.784"}))))};function po(){return(po=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var mo=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",po({},n,{viewBox:"0 0 24 24"}),Object(o.a)("g",{fill:"none","fill-rule":"evenodd"},Object(o.a)("path",null),Object(o.a)("g",{fill:t,"fill-rule":"nonzero"},Object(o.a)("path",{d:"M20 12c0-2.288-.963-4.35-2.506-5.813l-.319-3.469a2.987 2.987 0 0 0-2.988-2.719H9.831A2.998 2.998 0 0 0 6.843 2.73l-.312 3.438a7.987 7.987 0 0 0-.012 11.656l.319 3.456a2.987 2.987 0 0 0 2.988 2.719h4.344a2.994 2.994 0 0 0 2.988-2.731l.312-3.438a7.966 7.966 0 0 0 2.531-5.831L20 12zM8.838 2.913a.998.998 0 0 1 .994-.912h4.356c.519 0 .95.387.994.9l.169 1.831a8 8 0 0 0-3.35-.731 8.014 8.014 0 0 0-3.331.725l.169-1.812-.001-.001zM6 12c0-1.831.825-3.481 2.125-4.581l.012-.012a6.013 6.013 0 0 1 3.862-1.406c3.306 0 6 2.694 6 6s-2.694 6-6 6a6.01 6.01 0 0 1-6-6L6 12zm9.162 9.087a.998.998 0 0 1-.994.912H9.824a.989.989 0 0 1-.994-.906l-.169-1.831a7.965 7.965 0 0 0 3.338.731 8.034 8.034 0 0 0 3.331-.725l-.169 1.819h.001z"}),Object(o.a)("path",{d:"M12.794 14.206a.999.999 0 0 0 1.412 0 1.005 1.005 0 0 0 0-1.413L13 11.587V8.999c0-.55-.45-1-1-1s-1 .45-1 1v3a1 1 0 0 0 .294.706l1.5 1.5v.001z"}))))};function ho(){return(ho=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var vo=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",ho({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M30 18h-4.7l2 2H30v3c0 .7-.3 1-1 1H3c-.7 0-1-.3-1-1v-3h7.7a9 9 0 0 1-1.9-2H2V3c0-.7.3-1 1-1h26c.7 0 1 .3 1 1zM12 30h8v-4h-8zM31.4.6A1.68 1.68 0 0 0 30 0H2A1.68 1.68 0 0 0 .6.6 2.25 2.25 0 0 0 0 2v22a1.68 1.68 0 0 0 .6 1.4A2.25 2.25 0 0 0 2 26h8v4H8v2h16v-2h-2v-4h8a1.68 1.68 0 0 0 1.4-.6A2.25 2.25 0 0 0 32 24V2a1.68 1.68 0 0 0-.6-1.4z","data-name":"Page-1"}),Object(o.a)("path",{fill:t,"fill-rule":"evenodd",d:"M15.5 18a5.5 5.5 0 1 1 5.5-5.5 5.42 5.42 0 0 1-5.5 5.5m6-.9a7.34 7.34 0 0 0 1.6-4.6A7.64 7.64 0 0 0 15.5 5a7.5 7.5 0 1 0 4.6 13.4l4.2 4.2a1.08 1.08 0 0 0 .7.3.91.91 0 0 0 .7-.3 1 1 0 0 0 0-1.4z","data-name":"Fill-1"}))};function yo(){return(yo=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var go=function(e){var t=e.bgColor,n=(e.fgColor,e.size,function(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},l=Object.keys(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)n=l[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(e,["bgColor","fgColor","size"]));return Object(o.a)("svg",yo({"data-name":"Layer 1"},n,{viewBox:"0 0 32 32"}),Object(o.a)("path",{fill:"none",d:"M0 0h32v32H0z"}),Object(o.a)("path",{fill:t,d:"M12.9 19.88L21 15.7l-8.1-4.24zM16 5.45c6.31 0 10.5.3 10.5.3a4.26 4.26 0 0 1 3 1.28 5.26 5.26 0 0 1 1.19 3 39.8 39.8 0 0 1 .3 4.85v2.28A39.8 39.8 0 0 1 30.7 22a5.36 5.36 0 0 1-1.19 3 4.31 4.31 0 0 1-3 1.26s-4.19.32-10.5.32c-7.8-.07-10.2-.3-10.2-.3A5.08 5.08 0 0 1 2.49 25a5.36 5.36 0 0 1-1.19-3 39.8 39.8 0 0 1-.3-4.86v-2.28A39.8 39.8 0 0 1 1.3 10a5.26 5.26 0 0 1 1.19-3 4.26 4.26 0 0 1 3-1.28s4.19-.3 10.5-.3z"}))};n.d(t,"Academy",function(){return l}),n.d(t,"AddOpen",function(){return a}),n.d(t,"AddSolid",function(){return c}),n.d(t,"Agile",function(){return d}),n.d(t,"AppDevelopment",function(){return b}),n.d(t,"AppExchange",function(){return m}),n.d(t,"ArrowLeft",function(){return v}),n.d(t,"AssetData",function(){return g}),n.d(t,"AssetInfographic",function(){return O}),n.d(t,"AssetInteractive",function(){return A}),n.d(t,"AssetLink",function(){return C}),n.d(t,"AssetMedia",function(){return z}),n.d(t,"AssetPodcast",function(){return k}),n.d(t,"AssetPresentation",function(){return P}),n.d(t,"AssetText",function(){return B}),n.d(t,"AssetVideo",function(){return H}),n.d(t,"BoltLogoColored",function(){return T}),n.d(t,"BrandOperations",function(){return I}),n.d(t,"Calendar",function(){return R}),n.d(t,"Careers",function(){return U}),n.d(t,"CaseManagement",function(){return q}),n.d(t,"Check",function(){return $}),n.d(t,"CheckCircle",function(){return G}),n.d(t,"CheckSolid",function(){return Q}),n.d(t,"ChevronDown",function(){return K}),n.d(t,"ChevronLeft",function(){return te}),n.d(t,"ChevronRight",function(){return oe}),n.d(t,"ChevronUp",function(){return le}),n.d(t,"Close",function(){return ae}),n.d(t,"CloseOpen",function(){return ce}),n.d(t,"CloseSolid",function(){return de}),n.d(t,"Cloud",function(){return be}),n.d(t,"CoBrowse",function(){return me}),n.d(t,"Communications",function(){return ve}),n.d(t,"CopyToClipboard",function(){return ge}),n.d(t,"CustomerDecisionHub",function(){return Oe}),n.d(t,"CustomerOnboarding",function(){return Ae}),n.d(t,"CustomerService",function(){return Ce}),n.d(t,"DataIntegrations",function(){return ze}),n.d(t,"Documentation",function(){return ke}),n.d(t,"Download",function(){return Pe}),n.d(t,"Email",function(){return Be}),n.d(t,"Energy",function(){return He}),n.d(t,"Entertainment",function(){return Te}),n.d(t,"ExitFullScreen",function(){return Ie}),n.d(t,"ExternalLink",function(){return Re}),n.d(t,"Eye",function(){return Ue}),n.d(t,"EyeOff",function(){return qe}),n.d(t,"Facebook",function(){return $e}),n.d(t,"FacebookSolid",function(){return Ge}),n.d(t,"FieldService",function(){return Qe}),n.d(t,"FieldServiceGray",function(){return Ke}),n.d(t,"Filter",function(){return tt}),n.d(t,"Financial",function(){return ot}),n.d(t,"FullScreen",function(){return lt}),n.d(t,"Github",function(){return at}),n.d(t,"Global",function(){return ct}),n.d(t,"Government",function(){return dt}),n.d(t,"Healthcare",function(){return bt}),n.d(t,"Hospitality",function(){return mt}),n.d(t,"Industries",function(){return vt}),n.d(t,"InfoOpen",function(){return gt}),n.d(t,"InfoSolid",function(){return Ot}),n.d(t,"Insurance",function(){return At}),n.d(t,"Integration",function(){return Ct}),n.d(t,"IntelligentVirtualAssistant",function(){return zt}),n.d(t,"Java",function(){return kt}),n.d(t,"Knowledgebase",function(){return Pt}),n.d(t,"Launchpad",function(){return Bt}),n.d(t,"LifeSciences",function(){return Ht}),n.d(t,"Linkedin",function(){return Tt}),n.d(t,"LinkedinSolid",function(){return It}),n.d(t,"Lock",function(){return Rt}),n.d(t,"Manufacturing",function(){return Ut}),n.d(t,"MapPin",function(){return qt}),n.d(t,"MapPinSolid",function(){return $t}),n.d(t,"Marketing",function(){return Gt}),n.d(t,"MarketingGray",function(){return Qt}),n.d(t,"Menu",function(){return Kt}),n.d(t,"MinusOpen",function(){return tn}),n.d(t,"MinusSolid",function(){return on}),n.d(t,"Mobility",function(){return ln}),n.d(t,"More",function(){return sn}),n.d(t,"OmniChannel",function(){return un}),n.d(t,"Partners",function(){return fn}),n.d(t,"Pencil",function(){return pn}),n.d(t,"Platform",function(){return hn}),n.d(t,"Podcast",function(){return yn}),n.d(t,"Print",function(){return jn}),n.d(t,"Product",function(){return _n}),n.d(t,"ProductDelivery",function(){return wn}),n.d(t,"Refresh",function(){return xn}),n.d(t,"Reporting",function(){return En}),n.d(t,"Retail",function(){return Sn}),n.d(t,"RoboAuto",function(){return Mn}),n.d(t,"SalesAutomation",function(){return Ln}),n.d(t,"Scalability",function(){return Nn}),n.d(t,"Search",function(){return Vn}),n.d(t,"Share",function(){return Fn}),n.d(t,"Support",function(){return Dn}),n.d(t,"SystemAdmin",function(){return Wn}),n.d(t,"Training",function(){return Yn}),n.d(t,"Transportation",function(){return Jn}),n.d(t,"Twitter",function(){return Zn}),n.d(t,"TwitterSolid",function(){return Xn}),n.d(t,"Unlock",function(){return eo}),n.d(t,"Upload",function(){return no}),n.d(t,"User",function(){return ro}),n.d(t,"UserInterface",function(){return io}),n.d(t,"Video",function(){return so}),n.d(t,"Vision",function(){return uo}),n.d(t,"Warning",function(){return bo}),n.d(t,"Watch",function(){return mo}),n.d(t,"WorkforceIntelligence",function(){return vo}),n.d(t,"YoutubeSolid",function(){return go})},"./node_modules/@bolt/components-image/src/image.js":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/lazysizes/lazysizes.js"),r=n.n(o);n("./node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js"),n("./node_modules/lazysizes/plugins/progressive/ls.progressive.js"),n("./node_modules/lazysizes/plugins/respimg/ls.respimg.js"),Object.assign(r.a.cfg,{lazyClass:"js-lazyload",loadingClass:"is-lazyloading",loadedClass:"is-lazyloaded",preloadAfterLoad:!0})},"./node_modules/@bolt/components-image/src/image.scss":function(e,t,n){},"./node_modules/@bolt/components-link/src/link.scss":function(e,t,n){},"./node_modules/@bolt/components-list/index.scss":function(e,t,n){},"./node_modules/@bolt/components-logo/src/logo.scss":function(e,t,n){},"./node_modules/@bolt/components-nav-indicator/index.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(){n.e(37).then(n.bind(null,"./node_modules/@bolt/components-nav-indicator/nav-indicator.js"))})},"./node_modules/@bolt/components-nav-indicator/nav-indicator.scss":function(e,t,n){},"./node_modules/@bolt/components-nav-priority/index.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(){n.e(33).then(n.bind(null,"./node_modules/@bolt/components-nav-priority/nav-priority.js"))})},"./node_modules/@bolt/components-nav-priority/nav-priority.scss":function(e,t,n){},"./node_modules/@bolt/components-navbar/src/navbar.scss":function(e,t,n){},"./node_modules/@bolt/components-navlink/index.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(){n.e(34).then(n.bind(null,"./node_modules/@bolt/components-navlink/navlink.js"))})},"./node_modules/@bolt/components-navlink/navlink.scss":function(e,t,n){},"./node_modules/@bolt/components-share/index.scss":function(e,t,n){},"./node_modules/@bolt/components-site/site.scss":function(e,t,n){},"./node_modules/@bolt/components-smooth-scroll/src/smooth-scroll.js":function(e,t,n){"use strict";n.r(t),n.d(t,"smoothScroll",function(){return i}),n.d(t,"scrollOptions",function(){return a}),n.d(t,"getScrollTarget",function(){return s});var o=n("./node_modules/smooth-scroll/src/js/smooth-scroll.js"),r=n.n(o),l=n("./node_modules/@bolt/core/utils/index.js"),i=new r.a,a={ignore:"[data-scroll-ignore]",header:".js-bolt-smooth-scroll-offset",speed:750,easing:"easeInOutCubic",offset:function(e,t){var n=t.closest("[offset]");return n?n.getAttribute("offset"):0},updateURL:!0,popstate:!0,emitEvents:!0};function s(e){var t=e.getAttribute("href");return t=t.replace("#",""),document.getElementById(t)}for(var c=document.querySelectorAll('a[href^="#"]'),u=Array.from(c).filter(function(e){return Object(l.g)(e.getAttribute("href"))}),d=function(){var e=u[f],t=e.getAttribute("href");if(0!==document.querySelectorAll(t).length){var n=s(e);n&&e.addEventListener("click",function(t){i.animateScroll(n,e,a)})}},f=0,b=u.length;f<b;f++)d()},"./node_modules/@bolt/components-sticky/src/sticky.js":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/stickyfilljs/dist/stickyfill.js"),r=n.n(o),l=document.querySelectorAll(".js-bolt-sticky");r.a.add(l)},"./node_modules/@bolt/components-sticky/src/sticky.scss":function(e,t,n){},"./node_modules/@bolt/components-teaser/src/teaser.scss":function(e,t,n){},"./node_modules/@bolt/components-tooltip/src/tooltip.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){n.e(38).then(n.bind(null,"./node_modules/@bolt/components-tooltip/src/tooltip.standalone.js"))})},"./node_modules/@bolt/components-tooltip/src/tooltip.scss?308c":function(e,t,n){},"./node_modules/@bolt/components-unordered-list/src/unordered-list.scss":function(e,t,n){},"./node_modules/@bolt/components-video/src/video.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){n.e(39).then(n.bind(null,"./node_modules/@bolt/components-video/src/video.standalone.js"))})},"./node_modules/@bolt/components-video/src/video.scss":function(e,t,n){},"./node_modules/@bolt/core/data/image-sizes.js":function(e,t){e.exports.imageSizes=[50,100,200,320,480,640,800,1024,1366,1536,1920,2560,2880]},"./node_modules/@bolt/core/data/index.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/data/image-sizes.js");n.o(o,"polyfillLoader")&&n.d(t,"polyfillLoader",function(){return o.polyfillLoader}),n.o(o,"spacingSizes")&&n.d(t,"spacingSizes",function(){return o.spacingSizes});var r=n("./node_modules/@bolt/core/data/spacing-sizes.js");n.d(t,"spacingSizes",function(){return r.a})},"./node_modules/@bolt/core/data/spacing-sizes.js":function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o={xxsmall:"0.25rem",xsmall:"0.5rem",small:"1rem",medium:"2rem",large:"4rem",xlarge:"8rem",xxlarge:"16rem"}},"./node_modules/@bolt/core/elements/index.js":function(e,t,n){"use strict";n("./node_modules/@bolt/core/polyfills/index.js").a.then(function(e){window.customElements.get("replace-with-children")||Promise.resolve().then(n.bind(null,"./node_modules/@bolt/core/elements/replace-with-children/index.js"))})},"./node_modules/@bolt/core/elements/replace-with-children/index.js":function(e,t,n){"use strict";n.r(t),n.d(t,"ReplaceWithChildren",function(){return f});var o,r,l,i=n("./node_modules/@bolt/core/utils/index.js"),a=n("./node_modules/@bolt/core/renderers/renderer-hyperhtml.js");function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=Object(i.e)((l=r=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}(this,u(t).apply(this,arguments))}var n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,Object(a.b)()),n=t,(o=[{key:"connecting",value:function(){this.replaceElementWithChildren()}},{key:"replaceElementWithChildren",value:function(){var e=this.parentElement;for(e||Error("The <replace-with-children> element needs a parent element to append to!");this.firstChild;)e.appendChild(this.firstChild);e&&e.removeChild(this)}}])&&c(n.prototype,o),t}(),r.is="replace-with-children",o=l))||o},"./node_modules/@bolt/core/index.js":function(e,t,n){"use strict";(function(e){n("./node_modules/@bolt/core/elements/index.js");var o=n("./node_modules/@bolt/core/data/index.js");n.o(o,"polyfillLoader")&&n.d(t,"polyfillLoader",function(){return o.polyfillLoader});var r=n("./node_modules/@bolt/core/polyfills/index.js");function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,"polyfillLoader",function(){return r.a}),n("./node_modules/@bolt/core/renderers/index.js"),n("./node_modules/@bolt/core/utils/index.js"),"object"===l(e.hot)&&e.hot.accept(function(e){e&&console.error("Cannot apply HMR update.",e)})}).call(this,n("./node_modules/webpack/buildin/harmony-module.js")(e))},"./node_modules/@bolt/core/node_modules/core-js/modules/_a-function.js":function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},"./node_modules/@bolt/core/node_modules/core-js/modules/_add-to-unscopables.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("unscopables"),r=Array.prototype;void 0==r[o]&&n("./node_modules/@bolt/core/node_modules/core-js/modules/_hide.js")(r,o,{}),e.exports=function(e){r[o][e]=!0}},"./node_modules/@bolt/core/node_modules/core-js/modules/_an-object.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-object.js");e.exports=function(e){if(!o(e))throw TypeError(e+" is not an object!");return e}},"./node_modules/@bolt/core/node_modules/core-js/modules/_array-includes.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-iobject.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-length.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-absolute-index.js");e.exports=function(e){return function(t,n,i){var a,s=o(t),c=r(s.length),u=l(i,c);if(e&&n!=n){for(;c>u;)if((a=s[u++])!=a)return!0}else for(;c>u;u++)if((e||u in s)&&s[u]===n)return e||u||0;return!e&&-1}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_array-methods.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_ctx.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iobject.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-object.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-length.js"),a=n("./node_modules/@bolt/core/node_modules/core-js/modules/_array-species-create.js");e.exports=function(e,t){var n=1==e,s=2==e,c=3==e,u=4==e,d=6==e,f=5==e||d,b=t||a;return function(t,a,p){for(var m,h,v=l(t),y=r(v),g=o(a,p,3),j=i(y.length),O=0,_=n?b(t,j):s?b(t,0):void 0;j>O;O++)if((f||O in y)&&(h=g(m=y[O],O,v),e))if(n)_[O]=h;else if(h)switch(e){case 3:return!0;case 5:return m;case 6:return O;case 2:_.push(m)}else if(u)return!1;return d?-1:c||u?u:_}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_array-species-constructor.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-object.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-array.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("species");e.exports=function(e){var t;return r(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!r(t.prototype)||(t=void 0),o(t)&&null===(t=t[l])&&(t=void 0)),void 0===t?Array:t}},"./node_modules/@bolt/core/node_modules/core-js/modules/_array-species-create.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_array-species-constructor.js");e.exports=function(e,t){return new(o(e))(t)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_classof.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_cof.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("toStringTag"),l="Arguments"==o(function(){return arguments}());e.exports=function(e){var t,n,i;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),r))?n:l?o(t):"Object"==(i=o(t))&&"function"==typeof t.callee?"Arguments":i}},"./node_modules/@bolt/core/node_modules/core-js/modules/_cof.js":function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_core.js":function(e,t){var n=e.exports={version:"2.6.5"};"number"==typeof __e&&(__e=n)},"./node_modules/@bolt/core/node_modules/core-js/modules/_create-property.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-dp.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_property-desc.js");e.exports=function(e,t,n){t in e?o.f(e,t,r(0,n)):e[t]=n}},"./node_modules/@bolt/core/node_modules/core-js/modules/_ctx.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_a-function.js");e.exports=function(e,t,n){if(o(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,o){return e.call(t,n,o)};case 3:return function(n,o,r){return e.call(t,n,o,r)}}return function(){return e.apply(t,arguments)}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_defined.js":function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},"./node_modules/@bolt/core/node_modules/core-js/modules/_descriptors.js":function(e,t,n){e.exports=!n("./node_modules/@bolt/core/node_modules/core-js/modules/_fails.js")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},"./node_modules/@bolt/core/node_modules/core-js/modules/_dom-create.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-object.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_global.js").document,l=o(r)&&o(r.createElement);e.exports=function(e){return l?r.createElement(e):{}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_enum-bug-keys.js":function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},"./node_modules/@bolt/core/node_modules/core-js/modules/_export.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_global.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_core.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_hide.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_redefine.js"),a=n("./node_modules/@bolt/core/node_modules/core-js/modules/_ctx.js"),s=function e(t,n,s){var c,u,d,f,b=t&e.F,p=t&e.G,m=t&e.P,h=t&e.B,v=p?o:t&e.S?o[n]||(o[n]={}):(o[n]||{}).prototype,y=p?r:r[n]||(r[n]={}),g=y.prototype||(y.prototype={});for(c in p&&(s=n),s)d=((u=!b&&v&&void 0!==v[c])?v:s)[c],f=h&&u?a(d,o):m&&"function"==typeof d?a(Function.call,d):d,v&&i(v,c,d,t&e.U),y[c]!=d&&l(y,c,f),m&&g[c]!=d&&(g[c]=d)};o.core=r,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},"./node_modules/@bolt/core/node_modules/core-js/modules/_fails-is-regexp.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[o]=!1,!"/./"[e](t)}catch(e){}}return!0}},"./node_modules/@bolt/core/node_modules/core-js/modules/_fails.js":function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_function-to-string.js":function(e,t,n){e.exports=n("./node_modules/@bolt/core/node_modules/core-js/modules/_shared.js")("native-function-to-string",Function.toString)},"./node_modules/@bolt/core/node_modules/core-js/modules/_global.js":function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"./node_modules/@bolt/core/node_modules/core-js/modules/_has.js":function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_hide.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-dp.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_property-desc.js");e.exports=n("./node_modules/@bolt/core/node_modules/core-js/modules/_descriptors.js")?function(e,t,n){return o.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},"./node_modules/@bolt/core/node_modules/core-js/modules/_html.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_global.js").document;e.exports=o&&o.documentElement},"./node_modules/@bolt/core/node_modules/core-js/modules/_ie8-dom-define.js":function(e,t,n){e.exports=!n("./node_modules/@bolt/core/node_modules/core-js/modules/_descriptors.js")&&!n("./node_modules/@bolt/core/node_modules/core-js/modules/_fails.js")(function(){return 7!=Object.defineProperty(n("./node_modules/@bolt/core/node_modules/core-js/modules/_dom-create.js")("div"),"a",{get:function(){return 7}}).a})},"./node_modules/@bolt/core/node_modules/core-js/modules/_iobject.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_cof.js");e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==o(e)?e.split(""):Object(e)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_is-array-iter.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iterators.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("iterator"),l=Array.prototype;e.exports=function(e){return void 0!==e&&(o.Array===e||l[r]===e)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_is-array.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_cof.js");e.exports=Array.isArray||function(e){return"Array"==o(e)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_is-object.js":function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.exports=function(e){return"object"===n(e)?null!==e:"function"==typeof e}},"./node_modules/@bolt/core/node_modules/core-js/modules/_is-regexp.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-object.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_cof.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("match");e.exports=function(e){var t;return o(e)&&(void 0!==(t=e[l])?!!t:"RegExp"==r(e))}},"./node_modules/@bolt/core/node_modules/core-js/modules/_iter-call.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_an-object.js");e.exports=function(e,t,n,r){try{return r?t(o(n)[0],n[1]):t(n)}catch(t){var l=e.return;throw void 0!==l&&o(l.call(e)),t}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_iter-create.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-create.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_property-desc.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_set-to-string-tag.js"),i={};n("./node_modules/@bolt/core/node_modules/core-js/modules/_hide.js")(i,n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=o(i,{next:r(1,n)}),l(e,t+" Iterator")}},"./node_modules/@bolt/core/node_modules/core-js/modules/_iter-define.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_library.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_export.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_redefine.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_hide.js"),a=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iterators.js"),s=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iter-create.js"),c=n("./node_modules/@bolt/core/node_modules/core-js/modules/_set-to-string-tag.js"),u=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-gpo.js"),d=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("iterator"),f=!([].keys&&"next"in[].keys()),b=function(){return this};e.exports=function(e,t,n,p,m,h,v){s(n,t,p);var y,g,j,O=function(e){if(!f&&e in C)return C[e];switch(e){case"keys":case"values":return function(){return new n(this,e)}}return function(){return new n(this,e)}},_=t+" Iterator",A="values"==m,w=!1,C=e.prototype,x=C[d]||C["@@iterator"]||m&&C[m],z=x||O(m),E=m?A?O("entries"):z:void 0,k="Array"==t&&C.entries||x;if(k&&(j=u(k.call(new e)))!==Object.prototype&&j.next&&(c(j,_,!0),o||"function"==typeof j[d]||i(j,d,b)),A&&x&&"values"!==x.name&&(w=!0,z=function(){return x.call(this)}),o&&!v||!f&&!w&&C[d]||i(C,d,z),a[t]=z,a[_]=b,m)if(y={values:A?z:O("values"),keys:h?z:O("keys"),entries:E},v)for(g in y)g in C||l(C,g,y[g]);else r(r.P+r.F*(f||w),t,y);return y}},"./node_modules/@bolt/core/node_modules/core-js/modules/_iter-detect.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("iterator"),r=!1;try{var l=[7][o]();l.return=function(){r=!0},Array.from(l,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!r)return!1;var n=!1;try{var l=[7],i=l[o]();i.next=function(){return{done:n=!0}},l[o]=function(){return i},e(l)}catch(e){}return n}},"./node_modules/@bolt/core/node_modules/core-js/modules/_iter-step.js":function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_iterators.js":function(e,t){e.exports={}},"./node_modules/@bolt/core/node_modules/core-js/modules/_library.js":function(e,t){e.exports=!1},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-assign.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-keys.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-gops.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-pie.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-object.js"),a=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iobject.js"),s=Object.assign;e.exports=!s||n("./node_modules/@bolt/core/node_modules/core-js/modules/_fails.js")(function(){var e={},t={},n=Symbol(),o="abcdefghijklmnopqrst";return e[n]=7,o.split("").forEach(function(e){t[e]=e}),7!=s({},e)[n]||Object.keys(s({},t)).join("")!=o})?function(e,t){for(var n=i(e),s=arguments.length,c=1,u=r.f,d=l.f;s>c;)for(var f,b=a(arguments[c++]),p=u?o(b).concat(u(b)):o(b),m=p.length,h=0;m>h;)d.call(b,f=p[h++])&&(n[f]=b[f]);return n}:s},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-create.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_an-object.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-dps.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_enum-bug-keys.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_shared-key.js")("IE_PROTO"),a=function(){},s=function(){var e,t=n("./node_modules/@bolt/core/node_modules/core-js/modules/_dom-create.js")("iframe"),o=l.length;for(t.style.display="none",n("./node_modules/@bolt/core/node_modules/core-js/modules/_html.js").appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),s=e.F;o--;)delete s.prototype[l[o]];return s()};e.exports=Object.create||function(e,t){var n;return null!==e?(a.prototype=o(e),n=new a,a.prototype=null,n[i]=e):n=s(),void 0===t?n:r(n,t)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-dp.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_an-object.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_ie8-dom-define.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-primitive.js"),i=Object.defineProperty;t.f=n("./node_modules/@bolt/core/node_modules/core-js/modules/_descriptors.js")?Object.defineProperty:function(e,t,n){if(o(e),t=l(t,!0),o(n),r)try{return i(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-dps.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-dp.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_an-object.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-keys.js");e.exports=n("./node_modules/@bolt/core/node_modules/core-js/modules/_descriptors.js")?Object.defineProperties:function(e,t){r(e);for(var n,i=l(t),a=i.length,s=0;a>s;)o.f(e,n=i[s++],t[n]);return e}},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-gops.js":function(e,t){t.f=Object.getOwnPropertySymbols},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-gpo.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_has.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-object.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_shared-key.js")("IE_PROTO"),i=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=r(e),o(e,l)?e[l]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?i:null}},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-keys-internal.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_has.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-iobject.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_array-includes.js")(!1),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_shared-key.js")("IE_PROTO");e.exports=function(e,t){var n,a=r(e),s=0,c=[];for(n in a)n!=i&&o(a,n)&&c.push(n);for(;t.length>s;)o(a,n=t[s++])&&(~l(c,n)||c.push(n));return c}},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-keys.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-keys-internal.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_enum-bug-keys.js");e.exports=Object.keys||function(e){return o(e,r)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_object-pie.js":function(e,t){t.f={}.propertyIsEnumerable},"./node_modules/@bolt/core/node_modules/core-js/modules/_property-desc.js":function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},"./node_modules/@bolt/core/node_modules/core-js/modules/_redefine.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_global.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_hide.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_has.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_uid.js")("src"),a=n("./node_modules/@bolt/core/node_modules/core-js/modules/_function-to-string.js"),s=(""+a).split("toString");n("./node_modules/@bolt/core/node_modules/core-js/modules/_core.js").inspectSource=function(e){return a.call(e)},(e.exports=function(e,t,n,a){var c="function"==typeof n;c&&(l(n,"name")||r(n,"name",t)),e[t]!==n&&(c&&(l(n,i)||r(n,i,e[t]?""+e[t]:s.join(String(t)))),e===o?e[t]=n:a?e[t]?e[t]=n:r(e,t,n):(delete e[t],r(e,t,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[i]||a.call(this)})},"./node_modules/@bolt/core/node_modules/core-js/modules/_set-to-string-tag.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-dp.js").f,r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_has.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("toStringTag");e.exports=function(e,t,n){e&&!r(e=n?e:e.prototype,l)&&o(e,l,{configurable:!0,value:t})}},"./node_modules/@bolt/core/node_modules/core-js/modules/_shared-key.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_shared.js")("keys"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_uid.js");e.exports=function(e){return o[e]||(o[e]=r(e))}},"./node_modules/@bolt/core/node_modules/core-js/modules/_shared.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_core.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_global.js"),l=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(e.exports=function(e,t){return l[e]||(l[e]=void 0!==t?t:{})})("versions",[]).push({version:o.version,mode:n("./node_modules/@bolt/core/node_modules/core-js/modules/_library.js")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"./node_modules/@bolt/core/node_modules/core-js/modules/_strict-method.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_fails.js");e.exports=function(e,t){return!!e&&o(function(){t?e.call(null,function(){},1):e.call(null)})}},"./node_modules/@bolt/core/node_modules/core-js/modules/_string-context.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-regexp.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_defined.js");e.exports=function(e,t,n){if(o(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(r(e))}},"./node_modules/@bolt/core/node_modules/core-js/modules/_to-absolute-index.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-integer.js"),r=Math.max,l=Math.min;e.exports=function(e,t){return(e=o(e))<0?r(e+t,0):l(e,t)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_to-integer.js":function(e,t){var n=Math.ceil,o=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?o:n)(e)}},"./node_modules/@bolt/core/node_modules/core-js/modules/_to-iobject.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iobject.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_defined.js");e.exports=function(e){return o(r(e))}},"./node_modules/@bolt/core/node_modules/core-js/modules/_to-length.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-integer.js"),r=Math.min;e.exports=function(e){return e>0?r(o(e),9007199254740991):0}},"./node_modules/@bolt/core/node_modules/core-js/modules/_to-object.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_defined.js");e.exports=function(e){return Object(o(e))}},"./node_modules/@bolt/core/node_modules/core-js/modules/_to-primitive.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-object.js");e.exports=function(e,t){if(!o(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!o(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!o(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},"./node_modules/@bolt/core/node_modules/core-js/modules/_uid.js":function(e,t){var n=0,o=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+o).toString(36))}},"./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_shared.js")("wks"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_uid.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_global.js").Symbol,i="function"==typeof l;(e.exports=function(e){return o[e]||(o[e]=i&&l[e]||(i?l:r)("Symbol."+e))}).store=o},"./node_modules/@bolt/core/node_modules/core-js/modules/core.get-iterator-method.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_classof.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_wks.js")("iterator"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iterators.js");e.exports=n("./node_modules/@bolt/core/node_modules/core-js/modules/_core.js").getIteratorMethod=function(e){if(void 0!=e)return e[r]||e["@@iterator"]||l[o(e)]}},"./node_modules/@bolt/core/node_modules/core-js/modules/es6.array.for-each.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_export.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_array-methods.js")(0),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_strict-method.js")([].forEach,!0);o(o.P+o.F*!l,"Array",{forEach:function(e){return r(this,e,arguments[1])}})},"./node_modules/@bolt/core/node_modules/core-js/modules/es6.array.from.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_ctx.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_export.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-object.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iter-call.js"),a=n("./node_modules/@bolt/core/node_modules/core-js/modules/_is-array-iter.js"),s=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-length.js"),c=n("./node_modules/@bolt/core/node_modules/core-js/modules/_create-property.js"),u=n("./node_modules/@bolt/core/node_modules/core-js/modules/core.get-iterator-method.js");r(r.S+r.F*!n("./node_modules/@bolt/core/node_modules/core-js/modules/_iter-detect.js")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,r,d,f=l(e),b="function"==typeof this?this:Array,p=arguments.length,m=p>1?arguments[1]:void 0,h=void 0!==m,v=0,y=u(f);if(h&&(m=o(m,p>2?arguments[2]:void 0,2)),void 0==y||b==Array&&a(y))for(n=new b(t=s(f.length));t>v;v++)c(n,v,h?m(f[v],v):f[v]);else for(d=y.call(f),n=new b;!(r=d.next()).done;v++)c(n,v,h?i(d,m,[r.value,v],!0):r.value);return n.length=v,n}})},"./node_modules/@bolt/core/node_modules/core-js/modules/es6.array.iterator.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_add-to-unscopables.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iter-step.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iterators.js"),i=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-iobject.js");e.exports=n("./node_modules/@bolt/core/node_modules/core-js/modules/_iter-define.js")(Array,"Array",function(e,t){this._t=i(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,r(1)):r(0,"keys"==t?n:"values"==t?e[n]:[n,e[n]])},"values"),l.Arguments=l.Array,o("keys"),o("values"),o("entries")},"./node_modules/@bolt/core/node_modules/core-js/modules/es6.object.assign.js":function(e,t,n){var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_export.js");o(o.S+o.F,"Object",{assign:n("./node_modules/@bolt/core/node_modules/core-js/modules/_object-assign.js")})},"./node_modules/@bolt/core/node_modules/core-js/modules/es6.string.starts-with.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_export.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_to-length.js"),l=n("./node_modules/@bolt/core/node_modules/core-js/modules/_string-context.js"),i="".startsWith;o(o.P+o.F*n("./node_modules/@bolt/core/node_modules/core-js/modules/_fails-is-regexp.js")("startsWith"),"String",{startsWith:function(e){var t=l(this,e,"startsWith"),n=r(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),o=String(e);return i?i.call(t,o,n):t.slice(n,n+o.length)===o}})},"./node_modules/@bolt/core/node_modules/core-js/modules/es7.array.includes.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/node_modules/core-js/modules/_export.js"),r=n("./node_modules/@bolt/core/node_modules/core-js/modules/_array-includes.js")(!0);o(o.P,"Array",{includes:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),n("./node_modules/@bolt/core/node_modules/core-js/modules/_add-to-unscopables.js")("includes")},"./node_modules/@bolt/core/polyfills/custom-event-polyfill.js":function(e,t){try{var n=new window.CustomEvent("test",{cancelable:!0});if(n.preventDefault(),!0!==n.defaultPrevented)throw new Error("Could not prevent default")}catch(e){var o=function(e,t){var n,o;return t=t||{bubbles:!1,cancelable:!1,detail:void 0},(n=document.createEvent("CustomEvent")).initCustomEvent(e,t.bubbles,t.cancelable,t.detail),o=n.preventDefault,n.preventDefault=function(){o.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(e){this.defaultPrevented=!0}},n};o.prototype=window.Event.prototype,window.CustomEvent=o}},"./node_modules/@bolt/core/polyfills/index.js":function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n("./node_modules/es6-promise/auto.js"),n("./node_modules/element-closest/element-closest.js"),n("./node_modules/mdn-polyfills/Node.prototype.prepend.js"),n("./node_modules/@bolt/core/node_modules/core-js/modules/es6.array.iterator.js"),n("./node_modules/@bolt/core/node_modules/core-js/modules/es6.array.from.js"),n("./node_modules/@bolt/core/node_modules/core-js/modules/es6.string.starts-with.js"),n("./node_modules/@bolt/core/node_modules/core-js/modules/es7.array.includes.js"),n("./node_modules/@bolt/core/node_modules/core-js/modules/es6.array.for-each.js"),n("./node_modules/@bolt/core/node_modules/core-js/modules/es6.object.assign.js"),n("./node_modules/@bolt/core/polyfills/custom-event-polyfill.js"),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach);var o=[];(!("attachShadow"in Element.prototype&&"getRootNode"in Element.prototype)||window.ShadyDOM&&window.ShadyDOM.force)&&o.push("sd"),window.customElements&&!window.customElements.forcePolyfill||o.push("ce"),"content"in document.createElement("template")&&window.Promise&&Array.from&&document.createDocumentFragment().cloneNode()instanceof DocumentFragment||(o=["lite"]);var r=new Promise(function(e){o.includes("lite")?Promise.all([n.e(0).then(n.t.bind(null,"./node_modules/document-register-element/build/document-register-element.js",7))]).then(function(){e()}):o.includes("sd")&&o.includes("ce")?Promise.all([n.e(1).then(n.bind(null,"./node_modules/@webcomponents/shadydom/src/shadydom.js")),n.e(0).then(n.t.bind(null,"./node_modules/document-register-element/build/document-register-element.js",7))]).then(function(){e()}):o.includes("sd")?Promise.all([n.e(1).then(n.bind(null,"./node_modules/@webcomponents/shadydom/src/shadydom.js"))]).then(function(){e()}):o.includes("ce")?(Promise.all([n.e(1).then(n.bind(null,"./node_modules/@webcomponents/shadydom/src/shadydom.js"))]).then(function(){e()}),n.e(0).then(n.t.bind(null,"./node_modules/document-register-element/build/document-register-element.js",7)).then(function(){e()})):n.e(30).then(n.t.bind(null,"./node_modules/@webcomponents/custom-elements/src/native-shim.js",7)).then(function(){e()})})},"./node_modules/@bolt/core/renderers/bolt-base.js":function(e,t,n){"use strict";n.d(t,"a",function(){return f});var o=n("./node_modules/skatejs/dist/esnext/index.js"),r=n("./node_modules/@bolt/core/utils/environment.js"),l=n("./node_modules/@bolt/core/utils/find-parent-tag.js");function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e,t,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=u(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return function(t){function n(){var e,t;!function(e,t){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this);for(var o=arguments.length,r=new Array(o),l=0;l<o;l++)r[l]=arguments[l];return(t=s(this,(e=u(n)).call.apply(e,[this].concat(r))))._wasInitiallyRendered=!1,t}var i,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(n,e),i=n,(f=[{key:"connectedCallback",value:function(){this.setupSlots(),0!==Object.keys(this.props).length&&0===Object.keys(this._props).length&&this.updated()}},{key:"setupSlots",value:function(){var e=this.querySelector('[is="shadow-root"]');e&&e.childNodes&&e.childNodes?this.slots=this._checkSlots(e.childNodes):this.slots=this._checkSlots()}},{key:"setupShadow",value:function(){!1===this.useShadow||Object(l.a)(this,"FORM")||null!==this.getAttribute("no-shadow")?this.useShadow=!1:this.useShadow=r.a}},{key:"addStyles",value:function(e){var t=Array.from(e);if(t=t.join(" "),this.useShadow&&this.renderStyles)return this.renderStyles(t)}},{key:"_checkSlots",value:function(){var e={default:[]};return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.childNodes).forEach(function(t,n,o){var r=t.getAttribute?t.getAttribute("slot"):null;r?e[r]?e[r].push(t):(e[r]=[],e[r].push(t)):e.default.push(t)}),e}},{key:"disconnectedCallback",value:function(){this.disconnecting&&this.disconnecting(),this.disconnected&&this.disconnected()}},{key:"rendered",value:function(){this._wasInitiallyRendered||(this._wasInitiallyRendered=!0,this.dispatchEvent(new CustomEvent("ready",{detail:{name:this.tagName.toLowerCase(),shadowDom:!!this.useShadow},bubbles:!0}))),this.dispatchEvent(new CustomEvent("rendered",{detail:{name:this.tagName.toLowerCase(),shadowDom:!!this.useShadow},bubbles:!0}))}},{key:"renderRoot",get:function(){return this.setupShadow(),this.setupSlots(),r.a&&!0===this.useShadow?c(u(n.prototype),"renderRoot",this)||Object(o.d)(this):this}}])&&a(i.prototype,f),n}()}},"./node_modules/@bolt/core/renderers/index.js":function(e,t,n){"use strict";var o=n("./node_modules/@bolt/core/renderers/renderer-hyperhtml.js"),r=n("./node_modules/skatejs/dist/esnext/index.js");function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=function(){},a={},s=[],c=[];function u(e,t){var n,o,r,l,u=c;for(l=arguments.length;l-- >2;)s.push(arguments[l]);for(t&&null!=t.children&&(s.length||s.push(t.children),delete t.children);s.length;)if((o=s.pop())&&void 0!==o.pop)for(l=o.length;l--;)s.push(o[l]);else"boolean"==typeof o&&(o=null),(r="function"!=typeof e)&&(null==o?o="":"number"==typeof o?o=String(o):"string"!=typeof o&&(r=!1)),r&&n?u[u.length-1]+=o:u===c?u=[o]:u.push(o),n=r;var d=new i;return d.nodeName=e,d.children=u,d.attributes=null==t?void 0:t,d.key=null==t?void 0:t.key,void 0!==a.vnode&&a.vnode(d),d}function d(e,t){for(var n in t)e[n]=t[n];return e}var f="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,b=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,p=[];function m(e){!e._dirty&&(e._dirty=!0)&&1==p.push(e)&&(a.debounceRendering||f)(h)}function h(){var e,t=p;for(p=[];e=t.pop();)e._dirty&&L(e)}function v(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function y(e){var t=d({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function g(e){var t=e.parentNode;t&&t.removeChild(e)}function j(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),o&&o(e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"===l(o)){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===b.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var a=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,O,a):e.removeEventListener(t,O,a),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e){try{e[t]=null==o?"":o}catch(e){}null!=o&&!1!==o||"spellcheck"==t||e.removeAttribute(t)}else{var s=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?s?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(s?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function O(e){return this._listeners[e.type](a.event&&a.event(e)||e)}var _=[],A=0,w=!1,C=!1;function x(){for(var e;e=_.pop();)a.afterMount&&a.afterMount(e),e.componentDidMount&&e.componentDidMount()}function z(e,t,n,o,r,l){A++||(w=null!=r&&void 0!==r.ownerSVGElement,C=null!=e&&!("__preactattr_"in e));var i=function e(t,n,o,r,l){var i=t,a=w;if(null!=n&&"boolean"!=typeof n||(n=""),"string"==typeof n||"number"==typeof n)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||l)?t.nodeValue!=n&&(t.nodeValue=n):(i=document.createTextNode(n),t&&(t.parentNode&&t.parentNode.replaceChild(i,t),E(t,!0))),i.__preactattr_=!0,i;var s,c,u=n.nodeName;if("function"==typeof u)return function(e,t,n,o){for(var r=e&&e._component,l=r,i=e,a=r&&e._componentConstructor===t.nodeName,s=a,c=y(t);r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;return r&&s&&(!o||r._component)?(B(r,c,3,n,o),e=r.base):(l&&!a&&(H(l),e=i=null),r=P(t.nodeName,c,n),e&&!r.nextBase&&(r.nextBase=e,i=null),B(r,c,1,n,o),e=r.base,i&&e!==i&&(i._component=null,E(i,!1))),e}(t,n,o,r);if(w="svg"===u||"foreignObject"!==u&&w,u=String(u),(!t||!v(t,u))&&(s=u,(c=w?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s)).normalizedNodeName=s,i=c,t)){for(;t.firstChild;)i.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(i,t),E(t,!0)}var d=i.firstChild,f=i.__preactattr_,b=n.children;if(null==f){f=i.__preactattr_={};for(var p=i.attributes,m=p.length;m--;)f[p[m].name]=p[m].value}return!C&&b&&1===b.length&&"string"==typeof b[0]&&null!=d&&void 0!==d.splitText&&null==d.nextSibling?d.nodeValue!=b[0]&&(d.nodeValue=b[0]):(b&&b.length||null!=d)&&function(t,n,o,r,l){var i,a,s,c,u,d,f,b,p=t.childNodes,m=[],h={},y=0,j=0,O=p.length,_=0,A=n?n.length:0;if(0!==O)for(var w=0;w<O;w++){var C=p[w],x=C.__preactattr_,z=A&&x?C._component?C._component.__key:x.key:null;null!=z?(y++,h[z]=C):(x||(void 0!==C.splitText?!l||C.nodeValue.trim():l))&&(m[_++]=C)}if(0!==A)for(var w=0;w<A;w++){c=n[w],u=null;var z=c.key;if(null!=z)y&&void 0!==h[z]&&(u=h[z],h[z]=void 0,y--);else if(j<_)for(i=j;i<_;i++)if(void 0!==m[i]&&(d=a=m[i],b=l,"string"==typeof(f=c)||"number"==typeof f?void 0!==d.splitText:"string"==typeof f.nodeName?!d._componentConstructor&&v(d,f.nodeName):b||d._componentConstructor===f.nodeName)){u=a,m[i]=void 0,i===_-1&&_--,i===j&&j++;break}u=e(u,c,o,r),s=p[w],u&&u!==t&&u!==s&&(null==s?t.appendChild(u):u===s.nextSibling?g(s):t.insertBefore(u,s))}if(y)for(var w in h)void 0!==h[w]&&E(h[w],!1);for(;j<=_;)void 0!==(u=m[_--])&&E(u,!1)}(i,b,o,r,C||null!=f.dangerouslySetInnerHTML),function(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||j(e,o,n[o],n[o]=void 0,w);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||j(e,o,n[o],n[o]=t[o],w)}(i,n.attributes,f),w=a,i}(e,t,n,o,l);return r&&i.parentNode!==r&&r.appendChild(i),--A||(C=!1,l||x()),i}function E(e,t){var n=e._component;n?H(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||g(e),k(e))}function k(e){for(e=e.lastChild;e;){var t=e.previousSibling;E(e,!0),e=t}}var S=[];function P(e,t,n){var o,r=S.length;for(e.prototype&&e.prototype.render?(o=new e(t,n),N.call(o,t,n)):((o=new N(t,n)).constructor=e,o.render=M);r--;)if(S[r].constructor===e)return o.nextBase=S[r].nextBase,S.splice(r,1),o;return o}function M(e,t,n){return this.constructor(e,n)}function B(e,t,n,o,r){e._disable||(e._disable=!0,e.__ref=t.ref,e.__key=t.key,delete t.ref,delete t.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o)),o&&o!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=o),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===a.syncComponentUpdates&&e.base?m(e):L(e,1,r)),e.__ref&&e.__ref(e))}function L(e,t,n,o){if(!e._disable){var r,l,i,s=e.props,c=e.state,u=e.context,f=e.prevProps||s,b=e.prevState||c,p=e.prevContext||u,m=e.base,h=e.nextBase,v=m||h,g=e._component,j=!1,O=p;if(e.constructor.getDerivedStateFromProps&&(c=d(d({},c),e.constructor.getDerivedStateFromProps(s,c)),e.state=c),m&&(e.props=f,e.state=b,e.context=p,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(s,c,u)?j=!0:e.componentWillUpdate&&e.componentWillUpdate(s,c,u),e.props=s,e.state=c,e.context=u),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!j){r=e.render(s,c,u),e.getChildContext&&(u=d(d({},u),e.getChildContext())),m&&e.getSnapshotBeforeUpdate&&(O=e.getSnapshotBeforeUpdate(f,b));var w,C,k=r&&r.nodeName;if("function"==typeof k){var S=y(r);(l=g)&&l.constructor===k&&S.key==l.__key?B(l,S,1,u,!1):(w=l,e._component=l=P(k,S,u),l.nextBase=l.nextBase||h,l._parentComponent=e,B(l,S,0,u,!1),L(l,1,n,!0)),C=l.base}else i=v,(w=g)&&(i=e._component=null),(v||1===t)&&(i&&(i._component=null),C=z(i,r,u,n||!m,v&&v.parentNode,!0));if(v&&C!==v&&l!==g){var M=v.parentNode;M&&C!==M&&(M.replaceChild(C,v),w||(v._component=null,E(v,!1)))}if(w&&H(w),e.base=C,C&&!o){for(var N=e,T=e;T=T._parentComponent;)(N=T).base=C;C._component=N,C._componentConstructor=N.constructor}}for(!m||n?_.unshift(e):j||(e.componentDidUpdate&&e.componentDidUpdate(f,b,O),a.afterUpdate&&a.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);A||o||x()}}function H(e){a.beforeUnmount&&a.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?H(n):t&&(t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),e.nextBase=t,g(t),S.push(e),k(t)),e.__ref&&e.__ref(null)}function N(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function T(e,t,n){return z(n,e,{},!1,t,!1)}d(N.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=d(d({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),m(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),L(this,2)},render:function(){}});var V={h:u,createElement:u,cloneElement:function(e,t){return u(e.nodeName,d(d({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)},Component:N,render:T,rerender:h,options:a},I=n("./node_modules/@bolt/core/renderers/bolt-base.js");function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function U(e,t,n){return t&&D(e.prototype,t),n&&D(e,n),e}function W(e,t,n){return(W="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=$(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function q(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Y(e,t){return!t||"object"!==F(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function $(e){return($=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function J(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}var G,Z="__preactNodeName";function Q(e){var t=e.nodeName;if(t&&t.prototype instanceof HTMLElement){if(!t[Z]){var n=t.name;customElements.define(t[Z]=Object(r.b)(n),function(e){function n(){return q(this,n),Y(this,$(n).apply(this,arguments))}return J(n,t),n}())}e.nodeName=t[Z]}return e}function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return function(t){function n(){var e;q(this,n);for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];return Y(this,(e=$(n)).call.apply(e,[this].concat(o)))}return J(n,Object(r.e)(Object(I.a)(e))),U(n,[{key:"props",get:function(){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){R(e,t,n[t])})}return e}({},W($(n.prototype),"props",this))}}]),U(n,[{key:"renderStyles",value:function(e){if(e)return this.useShadow&&u("style",null,e)}},{key:"renderer",value:function(e,t){G=V.options.vnode,V.options.vnode=Q,this._renderRoot=e,this._preactDom=T(t(),e,this._preactDom||e.children[0]),V.options.vnode=G}},{key:"disconnectedCallback",value:function(){W($(n.prototype),"disconnectedCallback",this)&&W($(n.prototype),"disconnectedCallback",this).call(this),this._preactDom=T(null,this._renderRoot,this._preactDom),this._renderRoot=null}}]),n}()}n.d(t,"b",function(){return o.a}),n.d(t,"c",function(){return o.b}),n.d(t,"a",function(){return u}),n.d(t,"d",function(){return X})},"./node_modules/@bolt/core/renderers/renderer-hyperhtml.js":function(e,t,n){"use strict";n.d(t,"b",function(){return v});var o=n("./node_modules/hyperhtml/cjs/index.js"),r=n("./node_modules/@bolt/core/utils/index.js"),l=n("./node_modules/@bolt/core/renderers/bolt-base.js");function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(){var e=f(["\n             ","\n          "]);return a=function(){return e},e}function s(){var e=f(["\n             ","\n          "]);return s=function(){return e},e}function c(){var e=f(['\n            <slot name="','" />\n          ']);return c=function(){return e},e}function u(){var e=f(["\n            <slot />\n          "]);return u=function(){return e},e}function d(){var e=f(["\n          <style>","</style>\n        "]);return d=function(){return e},e}function f(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return t=e=function(e){function t(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return p(this,(e=m(t)).call.apply(e,[this].concat(o)))}var i,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(t,Object(r.p)(Object(l.a)(n))),i=t,(f=[{key:"renderStyles",value:function(e){if(e)return Object(o.wire)(this)(d(),e)}},{key:"slot",value:function(e){return this.useShadow&&r.f?"default"===e?Object(o.wire)(this)(u()):Object(o.wire)(this)(c(),e):"default"===e?Object(o.wire)(this)(s(),this.slots.default):this.slots[e]?Object(o.wire)(this)(a(),this.slots[e]):void console.log("The ".concat(e," slot doesn't appear to exist..."))}},{key:"renderer",value:function(e,t){this.html=this.html||Object(o.bind)(e),t()}}])&&b(i.prototype,f),t}(),e.props={onClick:r.i.string,onClickTarget:r.i.string},t}n.d(t,"a",function(){return o.wire})},"./node_modules/@bolt/core/utils/environment.js":function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o=!!("attachShadow"in Element.prototype&&"getRootNode"in Element.prototype||window.ShadyDOM)},"./node_modules/@bolt/core/utils/find-parent-tag.js":function(e,t,n){"use strict";function o(e,t){for(;e.parentNode;)if((e=e.parentNode).tagName===t)return e;return null}n.d(t,"a",function(){return o})},"./node_modules/@bolt/core/utils/index.js":function(e,t,n){"use strict";function o(e){function t(e){return"#"===e.charAt(0)?e.substring(1,7):e}return(299*parseInt(t(e).substring(0,2),16)+587*function(e){return parseInt(t(e).substring(2,4),16)}(e)+114*function(e){return parseInt(t(e).substring(4,6),16)}(e))/1e3>130?"#000000":"#ffffff"}function r(e,t){return e.filter(function(e){return t.indexOf(e)>-1}).length>0}function l(){for(var e=[],t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];for(var r=0,l=n;r<l.length;r++){var i=l[r];if(i)if("string"==typeof i)e.push(i);else for(var a in i)i[a]&&e.push(a)}return e.join(" ")}function i(e){var t=e.props.onClick,n=e.props.onClickTarget;if(t)if(n){var o=document.querySelectorAll(".".concat(n));o&&o.forEach(function(e){e[t]&&e[t]()})}else e[t]&&e[t]()}var a=n("./node_modules/@bolt/core/utils/environment.js");function s(e){return null!==/^(?:#([A-Za-z][-A-Za-z0-9_:.]+)|(\w+)|\.([\w-]+))$/.exec(e)}function c(e){if(-1===e.search("rgb"))return e;var t=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);function n(e){return(0+parseInt(e,10).toString(16)).slice(-2)}return"#".concat(n(t[1])).concat(n(t[2])).concat(n(t[3]))}function u(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["c-bolt-"];return Array.from(n).forEach(function(n){t=e.className.split(" ").filter(function(e){return 0!==e.lastIndexOf(n,0)})}),t.join(" ").trim()}n("./node_modules/@bolt/core/utils/find-parent-tag.js");var d=window.CSS&&CSS.supports("color","var(--primary)"),f=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){return f=!0,!0}}))}catch(e){}var b=f;function p(){var e,t=document.createElement("fakeelement"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in n)if(void 0!==t.style[e])return n[e]}function m(e){return e.replace(/[A-Z]/gi,"").split(", ").map(parseFloat)}var h=function(e,t,n){var o,r,l,i,a=(o=t,l=(r=window.getComputedStyle(o)).transitionProperty.split(", "),i=m(r.transitionDelay),l[m(r.transitionDuration).map(function(e,t){return e+i[t]}).reduce(function(e,t,n){return e.val>t&&(e.val=t,e.i=n),e},{val:-1/0,i:0}).i]);return function(o){o.propertyName===a&&n(e,t,o)}};function v(e){return new MutationObserver(function(t){t.forEach(function(t){if(t.removedNodes.length>0){for(var n=[].slice.call(t.removedNodes),o=0;o<e.slots.length;o++)if(r(e.slots[slot[o]],n))for(var l=function(t){var o=n[t];e.slots[slot]=e.slots[slot].filter(function(e){return e!==o})},i=0;i<n.length;i++)l(i)}else for(var a=[].slice.call(t.addedNodes),s=0;s<a.length;s++){var c=a[s],u=c.getAttribute?c.getAttribute("slot"):null;u?e.slots[u]?e.slots[u].push(c):(e.slots[u]=[],e.slots[u].push(c)):e.slots.default.push(c)}e.triggerUpdate()})})}var y=n("./node_modules/@polymer/polymer/lib/utils/render-status.js"),g=n("./node_modules/skatejs/dist/esnext/index.js");n.d(t,"b",function(){return o}),n.d(t,"c",function(){return l}),n.d(t,"d",function(){return i}),n.d(t,"f",function(){return a.a}),n.d(t,"g",function(){return s}),n.d(t,"j",function(){return c}),n.d(t,"k",function(){return u}),n.d(t,"l",function(){return d}),n.d(t,"h",function(){return b}),n.d(t,"o",function(){return p}),n.d(t,"m",function(){return h}),n.d(t,"n",function(){return v}),n.d(t,"a",function(){return y.a}),n.d(t,"p",function(){return g.e}),n.d(t,"i",function(){return g.c}),n.d(t,"e",function(){return g.a})},"./node_modules/@bolt/global/styles/05-objects/objects-ratio/ratio.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!0)).push([e.i,".o-bolt-ratio,\nbolt-ratio {\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  width: 100%;\n  height: 0;\n  font-size: 0;\n  overflow: hidden;\n  --aspect-ratio-width: 1;\n  --aspect-ratio-height: 1\n}\n@supports (--custom:property) {\n  .o-bolt-ratio,\n  bolt-ratio {\n    padding-top: calc(var(--aspect-ratio-height,1)/ var(--aspect-ratio-width,1) * 100%)\n  }\n}\n.o-bolt-ratio__inner,\nbolt-ratio > *,\nbolt-ratio img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  min-width: 100%;\n  min-height: 100%\n}\n.o-bolt-ratio__inner ::slotted(*) {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  min-width: 100%;\n  min-height: 100%\n}","",{version:3,sources:["/home/rhuser/bamboo/bamboo-home/xml-data/build-dir/5275649/PDND7-PDND8-JOB1/source/docroot/themes/custom/pegawww_theme/node_modules/@bolt/global/styles/05-objects/objects-ratio/ratio.scss"],names:[],mappings:"AAAA;;EAEE,sBAAqB;EACrB,mBAAkB;EAClB,uBAAsB;EACtB,YAAW;EACX,UAAS;EACT,aAAY;EACZ,iBAAgB;EAChB,wBAAuB;EACvB,wBAAA;CACF;AACA;EACE;;IAEE,mFAAA;GACF;CACF;AACA;;;EAGE,mBAAkB;EAClB,OAAM;EACN,QAAO;EACP,YAAW;EACX,aAAY;EACZ,gBAAe;EACf,gBAAA;CACF;AACA;EACE,mBAAkB;EAClB,OAAM;EACN,QAAO;EACP,YAAW;EACX,aAAY;EACZ,gBAAe;EACf,gBAAA;CACF",file:"ratio.scss",sourcesContent:[".o-bolt-ratio,\nbolt-ratio {\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  width: 100%;\n  height: 0;\n  font-size: 0;\n  overflow: hidden;\n  --aspect-ratio-width: 1;\n  --aspect-ratio-height: 1\n}\n@supports (--custom:property) {\n  .o-bolt-ratio,\n  bolt-ratio {\n    padding-top: calc(var(--aspect-ratio-height,1)/ var(--aspect-ratio-width,1) * 100%)\n  }\n}\n.o-bolt-ratio__inner,\nbolt-ratio > *,\nbolt-ratio img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  min-width: 100%;\n  min-height: 100%\n}\n.o-bolt-ratio__inner ::slotted(*) {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  min-width: 100%;\n  min-height: 100%\n}"],sourceRoot:""}])},"./node_modules/@bolt/global/styles/05-objects/objects-ratio/ratio.standalone.js":function(e,t,n){"use strict";n.r(t),n.d(t,"BoltRatio",function(){return b});var o=n("./node_modules/@bolt/core/utils/index.js"),r=n("./node_modules/@bolt/core/renderers/renderer-hyperhtml.js"),l=n("./node_modules/@bolt/global/styles/05-objects/objects-ratio/ratio.scss"),i=n.n(l);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(){var e=function(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n        ",'\n        <div class="','">\n          ',"\n        </div>\n      "]);return s=function(){return e},e}function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(){var e,t;return t=e=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),e=n=u(this,d(t).call(this,e)),n.useShadow=o.f,n.useCssVars=o.l,u(n,e)}var n,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,Object(r.b)()),n=t,(l=[{key:"_computeRatio",value:function(){var e=this.props.aspectRatioHeight&&this.props.aspectRatioHeight>0?this.props.aspectRatioHeight:1,t=this.props.aspectRatioWidth&&this.props.aspectRatioWidth>0?this.props.aspectRatioWidth:1;this.useCssVars?(this.style.setProperty("--aspect-ratio-height",e),this.style.setProperty("--aspect-ratio-width",t),this.style.paddingTop=""):(this.style.paddingTop="".concat(e/t*100,"%"),this.style.removeProperty("--aspect-ratio-height"),this.style.removeProperty("--aspect-ratio-width"))}},{key:"connecting",value:function(){this._computeRatio()}},{key:"render",value:function(){var e=Object(o.c)("o-".concat("bolt","-ratio__inner"));return this.html(s(),this.addStyles([i.a]),e,this.slot("default"))}}])&&c(n.prototype,l),t}(),e.props={aspectRatioHeight:o.i.number,aspectRatioWidth:o.i.number},t}},"./node_modules/@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!0)).push([e.i,".u-bolt-visuallyhidden {\n  border: 0!important;\n  clip: rect(0 0 0 0)!important;\n  -webkit-clip-path: inset(50%)!important;\n          clip-path: inset(50%)!important;\n  position: absolute!important;\n  width: 1px!important;\n  height: 1px!important;\n  margin: -1px!important;\n  padding: 0!important;\n  overflow: hidden!important;\n  white-space: nowrap!important\n}","",{version:3,sources:["/home/rhuser/bamboo/bamboo-home/xml-data/build-dir/5275649/PDND7-PDND8-JOB1/source/docroot/themes/custom/pegawww_theme/node_modules/@bolt/global/styles/07-utilities/_utilities-visuallyhidden.scss"],names:[],mappings:"AAAA;EACE,oBAAmB;EACnB,8BAA6B;EAC7B,wCAA+B;UAA/B,gCAA+B;EAC/B,6BAA4B;EAC5B,qBAAoB;EACpB,sBAAqB;EACrB,uBAAsB;EACtB,qBAAoB;EACpB,2BAA0B;EAC1B,6BAAA;CACF",file:"_utilities-visuallyhidden.scss",sourcesContent:[".u-bolt-visuallyhidden {\n  border: 0!important;\n  clip: rect(0 0 0 0)!important;\n  clip-path: inset(50%)!important;\n  position: absolute!important;\n  width: 1px!important;\n  height: 1px!important;\n  margin: -1px!important;\n  padding: 0!important;\n  overflow: hidden!important;\n  white-space: nowrap!important\n}"],sourceRoot:""}])},"./node_modules/@bolt/global/styles/index.js":function(e,t,n){"use strict";n.r(t),n("./node_modules/@bolt/core/index.js").polyfillLoader.then(function(){Promise.resolve().then(n.bind(null,"./node_modules/@bolt/global/styles/05-objects/objects-ratio/ratio.standalone.js")).then(function(e){customElements.define("".concat("bolt","-ratio"),e.BoltRatio())})})},"./node_modules/@bolt/global/styles/index.scss":function(e,t,n){},"./node_modules/@polymer/polymer/lib/utils/render-status.js":function(e,t,n){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/window.JSCompiler_renameProperty=function(e,t){return e},n.d(t,"b",function(){return s}),n.d(t,"a",function(){return c});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var o=!1,r=[],l=[];function i(){o=!0,requestAnimationFrame(function(){o=!1,function(e){for(;e.length;)a(e.shift())}(r),setTimeout(function(){!function(e){for(var t=0,n=e.length;t<n;t++)a(e.shift())}(l)})})}function a(e){var t=e[0],n=e[1],o=e[2];try{n.apply(t,o)}catch(e){setTimeout(function(){throw e})}}function s(e,t,n){o||i(),r.push([e,t,n])}function c(e,t,n){o||i(),l.push([e,t,n])}},"./node_modules/@ungap/create-content/esm/index.js":function(e,t,n){"use strict";n.r(t);
/*! (c) Andrea Giammarchi - ISC */
var o=function(e){var t="fragment",n="content"in r("template")?function(e){var t=r("template");return t.innerHTML=e,t.content}:function(e){var n=r(t),l=r("template"),i=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var a=RegExp.$1;l.innerHTML="<table>"+e+"</table>",i=l.querySelectorAll(a)}else l.innerHTML=e,i=l.childNodes;return o(n,i),n};return function(e,l){return("svg"===l?function(e){var n=r(t),l=r("div");return l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",o(n,l.firstChild.childNodes),n}:n)(e)};function o(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function r(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}}(document);t.default=o},"./node_modules/@ungap/custom-event/esm/index.js":function(e,t,n){"use strict";n.r(t);
/*! (c) Andrea Giammarchi - ISC */
var o={};o.CustomEvent="function"==typeof CustomEvent?CustomEvent:function(e){return t.prototype=new t("").constructor.prototype,t;function t(e,t){t||(t={});var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail),n}}(),t.default=o.CustomEvent},"./node_modules/@ungap/essential-map/esm/index.js":function(e,t,n){"use strict";n.r(t);
/*! (c) Andrea Giammarchi - ISC */
var o={};try{o.Map=Map}catch(e){o.Map=function(){var e=0,t=[],n=[];return{delete:function(r){var l=o(r);return l&&(t.splice(e,1),n.splice(e,1)),l},get:function(t){return o(t)?n[e]:void 0},has:function(e){return o(e)},set:function(r,l){return n[o(r)?e:t.push(r)-1]=l,this}};function o(n){return-1<(e=t.indexOf(n))}}}t.default=o.Map},"./node_modules/@ungap/essential-weakset/esm/index.js":function(e,t,n){"use strict";n.r(t);
/*! (c) Andrea Giammarchi - ISC */
var o={};try{o.WeakSet=WeakSet}catch(e){!function(e,t){var n=r.prototype;function r(){t(this,"_",{value:"_@ungap/weakmap"+e++})}n.add=function(e){return this.has(e)||t(e,this._,{value:!0,configurable:!0}),this},n.has=function(e){return this.hasOwnProperty.call(e,this._)},n.delete=function(e){return this.has(e)&&delete e[this._]},o.WeakSet=r}(Math.random(),Object.defineProperty)}t.default=o.WeakSet},"./node_modules/@ungap/is-array/esm/index.js":function(e,t,n){"use strict";n.r(t);var o,r,l=Array.isArray||(r=(o={}.toString).call([]),function(e){return o.call(e)===r});t.default=l},"./node_modules/@ungap/template-tag-arguments/esm/index.js":function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*! (c) Andrea Giammarchi - ISC */n.r(t);var r=function(){var e="object"!==("undefined"==typeof document?"undefined":o(document)),t=function(o){if(!("raw"in o)||o.propertyIsEnumerable("raw")||!Object.isFrozen(o.raw)||/Firefox\/(\d+)/.test((document.defaultView.navigator||{}).userAgent)&&parseFloat(RegExp.$1)<55){var r={};t=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return r[t]||(r[t]=e)}}else e=!0;return n(o)};return n;function n(n){return e?n:t(n)}}();t.default=function(e){for(var t=arguments.length,n=[r(e)],o=1;o<t;)n.push(arguments[o++]);return n}},"./node_modules/@ungap/weakmap/esm/index.js":function(e,t,n){"use strict";n.r(t);
/*! (c) Andrea Giammarchi - ISC */
var o={};try{o.WeakMap=WeakMap}catch(e){o.WeakMap=function(e,t){var n=t.defineProperty,o=t.hasOwnProperty,r=l.prototype;return r.delete=function(e){return this.has(e)&&delete e[this._]},r.get=function(e){return this.has(e)?e[this._]:void 0},r.has=function(e){return o.call(e,this._)},r.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},l;function l(t){n(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(i,this)}function i(e){this.set(e[0],e[1])}}(Math.random(),Object)}t.default=o.WeakMap},"./node_modules/classnames/bind.js":function(e,t,n){var o;function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var l={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(this&&this[n]||n);else if(Array.isArray(n))e.push(i.apply(this,n));else if("object"===o)for(var a in n)l.call(n,a)&&n[a]&&e.push(this&&this[a]||a)}}return e.join(" ")}void 0!==e&&e.exports?(i.default=i,e.exports=i):"object"===r(n("./node_modules/webpack/buildin/amd-options.js"))&&n("./node_modules/webpack/buildin/amd-options.js")?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},"./node_modules/css-loader/lib/css-base.js":function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n,o=e[1]||"",r=e[3];if(!r)return o;if(t&&"function"==typeof btoa){var l=(n=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[o].concat(i).concat([l]).join("\n")}return[o].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var l=this[r][0];"number"==typeof l&&(o[l]=!0)}for(r=0;r<e.length;r++){var i=e[r];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),t.push(i))}},t}},"./node_modules/disconnected/esm/index.js":function(e,t,n){"use strict";n.r(t),t.default=
/*! (c) Andrea Giammarchi */
function(e){var t="connected",n="dis"+t,o=e.Event,r=e.WeakSet,l=!0,i=new r;return function(e){return l&&(l=!l,function(e){var l=null;try{new MutationObserver(u).observe(e,{subtree:!0,childList:!0})}catch(t){var a=0,s=[],c=function(e){s.push(e),clearTimeout(a),a=setTimeout(function(){u(s.splice(a=0,s.length))},0)};e.addEventListener("DOMNodeRemoved",function(e){c({addedNodes:[],removedNodes:[e.target]})},!0),e.addEventListener("DOMNodeInserted",function(e){c({addedNodes:[e.target],removedNodes:[]})},!0)}function u(e){l=new function(){this[t]=new r,this[n]=new r};for(var o,i=e.length,a=0;a<i;a++)d((o=e[a]).removedNodes,n,t),d(o.addedNodes,t,n);l=null}function d(e,t,n){for(var r,l=new o(t),i=e.length,a=0;a<i;1===(r=e[a++]).nodeType&&f(r,l,t,n));}function f(e,t,n,o){i.has(e)&&!l[n].has(e)&&(l[o].delete(e),l[n].add(e),e.dispatchEvent(t));for(var r=e.children||[],a=r.length,s=0;s<a;f(r[s++],t,n,o));}}(e.ownerDocument)),i.add(e),e}}},"./node_modules/domdiff/esm/index.js":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/@ungap/essential-map/esm/index.js"),r=function(e,t,n,o,r,l){if(r-o<2)t.insertBefore(e(n[o],1),l);else{for(var i=t.ownerDocument.createDocumentFragment();o<r;)i.appendChild(e(n[o++],1));t.insertBefore(i,l)}},l=function(e,t){return e==t},i=function(e){return e},a=function(e,t,n,o,r,l,i){var a=l-r;if(a<1)return-1;for(;n-t>=a;){for(var s=t,c=r;s<n&&c<l&&i(e[s],o[c]);)s++,c++;if(c===l)return t;t=s+1}return-1},s=function(e,t,n,o,r){return n<o?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:r},c=function(e,t,n,o,r){if(r-o<2)t.removeChild(e(n[o],-1));else{var l=t.ownerDocument.createRange();l.setStartBefore(e(n[o],-1)),l.setEndAfter(e(n[r-1],-1)),l.deleteContents()}},u=function(e,t,n){for(var o=1,r=t;o<r;){var l=(o+r)/2>>>0;n<e[l]?r=l:o=l+1}return o},d=function(e,t,n,l,i,a,s,d,f,b,p,m,h){!function(e,t,n,l,i,a,s,u,d){for(var f=new o.default,b=e.length,p=s,m=0;m<b;)switch(e[m++]){case 0:i++,p++;break;case 1:f.set(l[i],1),r(t,n,l,i++,i,p<u?t(a[p],0):d);break;case-1:p++}for(m=0;m<b;)switch(e[m++]){case 0:s++;break;case-1:f.has(a[s])?s++:c(t,n,a,s++,s)}}(function(e,t,n,o,r,l,i){var a,s,c,u,d,f,b,p=n+l,m=[];e:for(a=0;a<=p;a++){if(a>50)return null;for(b=a-1,d=a?m[a-1]:[0,0],f=m[a]=[],s=-a;s<=a;s+=2){for(c=(u=s===-a||s!==a&&d[b+s-1]<d[b+s+1]?d[b+s+1]:d[b+s-1]+1)-s;u<l&&c<n&&i(o[r+u],e[t+c]);)u++,c++;if(u===l&&c===n)break e;f[a+s]=u}}var h=Array(a/2+p/2),v=h.length-1;for(a=m.length-1;a>=0;a--){for(;u>0&&c>0&&i(o[r+u-1],e[t+c-1]);)h[v--]=0,u--,c--;if(!a)break;b=a-1,d=a?m[a-1]:[0,0],(s=u-c)==-a||s!==a&&d[b+s-1]<d[b+s+1]?(c--,h[v--]=1):(u--,h[v--]=-1)}return h}(n,l,a,s,d,b,m)||function(e,t,n,r,l,i,a,s){var c=0,d=r<s?r:s,f=Array(d++),b=Array(d);b[0]=-1;for(var p=1;p<d;p++)b[p]=a;for(var m=new o.default,h=i;h<a;h++)m.set(l[h],h);for(var v=t;v<n;v++){var y=m.get(e[v]);null!=y&&-1<(c=u(b,d,y))&&(b[c]=y,f[c]={newi:v,oldi:y,prev:f[c-1]})}for(c=--d,--a;b[c]>a;)--c;d=s+r-c;var g=Array(d),j=f[c];for(--n;j;){for(var O=j,_=O.newi,A=O.oldi;n>_;)g[--d]=1,--n;for(;a>A;)g[--d]=-1,--a;g[--d]=0,--n,--a,j=j.prev}for(;n>=t;)g[--d]=1,--n;for(;a>=i;)g[--d]=-1,--a;return g}(n,l,i,a,s,d,f,b),e,t,n,l,s,d,p,h)};t.default=function(e,t,n,o){o||(o={});for(var u=o.compare||l,f=o.node||i,b=null==o.before?null:f(o.before,0),p=t.length,m=p,h=0,v=n.length,y=0;h<m&&y<v&&u(t[h],n[y]);)h++,y++;for(;h<m&&y<v&&u(t[m-1],n[v-1]);)m--,v--;var g=h===m,j=y===v;if(g&&j)return n;if(g&&y<v)return r(f,e,n,y,v,s(f,t,h,p,b)),n;if(j&&h<m)return c(f,e,t,h,m),n;var O=m-h,_=v-y,A=-1;if(O<_){if(-1<(A=a(n,y,v,t,h,m,u)))return r(f,e,n,y,A,f(t[h],0)),r(f,e,n,A+O,v,s(f,t,m,p,b)),n}else if(_<O&&-1<(A=a(t,h,m,n,y,v,u)))return c(f,e,t,h,A),c(f,e,t,A+_,m),n;return O<2||_<2?(r(f,e,n,y,v,f(t[h],0)),c(f,e,t,h,m),n):O===_&&function(e,t,n,o,r,l){for(;o<r&&l(n[o],e[t-1]);)o++,t--;return 0===t}(n,v,t,h,m,u)?(r(f,e,n,y,v,s(f,t,m,p,b)),n):(d(f,e,n,y,v,_,t,h,m,O,p,u,b),n)}},"./node_modules/domtagger/esm/index.js":function(e,t,n){"use strict";n.r(t);var o,r=n("./node_modules/@ungap/weakmap/esm/index.js"),l=n("./node_modules/@ungap/create-content/esm/index.js"),i=function(e,t,n,o,r){var l="importNode"in e,i=e.createDocumentFragment();return i.appendChild(e.createTextNode("g")),i.appendChild(e.createTextNode("")),(l?e.importNode(i,!0):i.cloneNode(!0)).childNodes.length<2?function e(t,n){for(var o=t.cloneNode(),r=t.childNodes||[],l=r.length,i=0;n&&i<l;i++)o.appendChild(e(r[i],n));return o}:l?e.importNode:function(e,t){return e.cloneNode(!!t)}}(document),a="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},s="-"+Math.random().toFixed(6)+"%";"content"in(o=document.createElement("template"))&&(o.innerHTML='<p tabindex="'+s+'"></p>',o.content.childNodes[0].getAttribute("tabindex")==s)||(s="_dt: "+s.slice(1,-1)+";");var c="\x3c!--"+s+"--\x3e",u=/^(?:style|textarea)$/i,d=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,f=" \\f\\n\\r\\t",b="[ "+f+"]+[^  \\f\\n\\r\\t\\/>\"'=]+",p="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",m="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|[^  \\f\\n\\r\\t\\/>\"'=]+))?)",h=new RegExp(p+b+m+"+)([ "+f+"]*/?>)","g"),v=new RegExp(p+b+m+"*)([ "+f+"]*/>)","g"),y=new RegExp("("+b+"\\s*=\\s*)(['\"]?)"+c+"\\2","gi");function g(e,t,n,o){return"<"+t+n.replace(y,j)+o}function j(e,t,n){return t+(n||'"')+s+(n||'"')}function O(e,t,n){return d.test(t)?e:"<"+t+n+"></"+t+">"}var _=n("./node_modules/@ungap/essential-map/esm/index.js");function A(e,t,n,o){return{name:o,node:t,path:n,type:e}}function w(e,t){for(var n=t.length,o=0;o<n;)e=e.childNodes[t[o++]];return e}function C(e,t,n,o){for(var r=new _.default,l=e.attributes,i=[],a=i.slice.call(l,0),c=a.length,u=0;u<c;){var d=a[u++];if(d.value===s){var f=d.name;if(!r.has(f)){var b=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),p=l[b]||l[b.toLowerCase()];r.set(f,p),t.push(A("attr",p,o,b))}i.push(d)}}for(c=i.length,u=0;u<c;){var m=i[u++];/^id$/i.test(m.name)?e.removeAttribute(m.name):e.removeAttributeNode(m)}var h=e.nodeName;if(/^script$/i.test(h)){var v=document.createElement(h);for(c=l.length,u=0;u<c;)v.setAttributeNode(l[u++].cloneNode(!0));v.textContent=e.textContent,e.parentNode.replaceChild(v,e)}}t.default=function(e){return function(t){var n=z.get(e);return null!=n&&n.template===t||(n=function(e,t){var n=x.get(t)||function(e,t){var n=function(e){return e.join(c).replace(v,O).replace(h,g)}(t),o=e.transform;o&&(n=o(n));var r=Object(l.default)(n,e.type);!function(e){for(var t=e.childNodes,n=t.length;n--;){var o=t[n];1!==o.nodeType&&0===a.call(o.textContent).length&&e.removeChild(o)}}(r);var i=[];!function e(t,n,o,r){for(var l=t.childNodes,i=l.length,d=0;d<i;){var f=l[d];switch(f.nodeType){case 1:var b=r.concat(d);C(f,n,o,b),e(f,n,o,b);break;case 8:f.textContent===s&&(o.shift(),n.push(u.test(t.nodeName)?A("text",t,r):A("any",f,r.concat(d))));break;case 3:u.test(t.nodeName)&&a.call(f.textContent)===c&&(o.shift(),n.push(A("text",t,r)))}d++}}(r,i,t.slice(0),[]);var d={content:r,updates:function(n){for(var o=[],r=i.length,l=0;l<r;){var a=i[l++],s=w(n,a.path);switch(a.type){case"any":o.push(e.any(s,[]));break;case"attr":o.push(e.attribute(s,a.name,a.node));break;case"text":o.push(e.text(s)),s.textContent=""}}return function(){var e=arguments.length,l=e-1,i=1;if(r!==l)throw new Error(l+" values instead of "+r+"\n"+t.join(", "));for(;i<e;)o[i-1](arguments[i++]);return n}}};return x.set(t,d),d}(e,t),o=i.call(document,n.content,!0),r={content:o,template:t,updates:n.updates(o)};return z.set(e,r),r}(e,t)),n.updates.apply(null,arguments),n.content}};var x=new r.default,z=new r.default},"./node_modules/element-closest/element-closest.js":function(e,t){var n;"function"!=typeof(n=window.Element.prototype).matches&&(n.matches=n.msMatchesSelector||n.mozMatchesSelector||n.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=0;t[n]&&t[n]!==this;)++n;return Boolean(t[n])}),"function"!=typeof n.closest&&(n.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})},"./node_modules/es6-promise/auto.js":function(e,t,n){"use strict";e.exports=n("./node_modules/es6-promise/dist/es6-promise.js").polyfill()},"./node_modules/es6-promise/dist/es6-promise.js":function(e,t,n){(function(o,r){var l,i,a;function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.6+9869a4bc
 */
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.6+9869a4bc
 */a=function(){"use strict";function e(e){return"function"==typeof e}var t=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},n=0,l=void 0,i=void 0,a=function(e,t){m[n]=e,m[n+1]=t,2===(n+=2)&&(i?i(h):O())},c="undefined"!=typeof window?window:void 0,u=c||{},d=u.MutationObserver||u.WebKitMutationObserver,f="undefined"==typeof self&&void 0!==o&&"[object process]"==={}.toString.call(o),b="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function p(){var e=setTimeout;return function(){return e(h,1)}}var m=new Array(1e3);function h(){for(var e=0;e<n;e+=2)(0,m[e])(m[e+1]),m[e]=void 0,m[e+1]=void 0;n=0}var v,y,g,j,O=void 0;function _(e,t){var n=this,o=new this.constructor(C);void 0===o[w]&&F(o);var r=n._state;if(r){var l=arguments[r-1];a(function(){return V(r,o,l,n._result)})}else N(n,o,e,t);return o}function A(e){if(e&&"object"===s(e)&&e.constructor===this)return e;var t=new this(C);return M(t,e),t}f?O=function(){return o.nextTick(h)}:d?(y=0,g=new d(h),j=document.createTextNode(""),g.observe(j,{characterData:!0}),O=function(){j.data=y=++y%2}):b?((v=new MessageChannel).port1.onmessage=h,O=function(){return v.port2.postMessage(0)}):O=void 0===c?function(){try{var e=Function("return this")().require("vertx");return void 0!==(l=e.runOnLoop||e.runOnContext)?function(){l(h)}:p()}catch(e){return p()}}():p();var w=Math.random().toString(36).substring(2);function C(){}var x=void 0,z=1,E=2,k={error:null};function S(e){try{return e.then}catch(e){return k.error=e,k}}function P(t,n,o){n.constructor===t.constructor&&o===_&&n.constructor.resolve===A?function(e,t){t._state===z?L(e,t._result):t._state===E?H(e,t._result):N(t,void 0,function(t){return M(e,t)},function(t){return H(e,t)})}(t,n):o===k?(H(t,k.error),k.error=null):void 0===o?L(t,n):e(o)?function(e,t,n){a(function(e){var o=!1,r=function(e,t,n,o){try{e.call(t,n,o)}catch(e){return e}}(n,t,function(n){o||(o=!0,t!==n?M(e,n):L(e,n))},function(t){o||(o=!0,H(e,t))},e._label);!o&&r&&(o=!0,H(e,r))},e)}(t,n,o):L(t,n)}function M(e,t){var n,o;e===t?H(e,new TypeError("You cannot resolve a promise with itself")):(o=s(n=t),null===n||"object"!==o&&"function"!==o?L(e,t):P(e,t,S(t)))}function B(e){e._onerror&&e._onerror(e._result),T(e)}function L(e,t){e._state===x&&(e._result=t,e._state=z,0!==e._subscribers.length&&a(T,e))}function H(e,t){e._state===x&&(e._state=E,e._result=t,a(B,e))}function N(e,t,n,o){var r=e._subscribers,l=r.length;e._onerror=null,r[l]=t,r[l+z]=n,r[l+E]=o,0===l&&e._state&&a(T,e)}function T(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var o=void 0,r=void 0,l=e._result,i=0;i<t.length;i+=3)o=t[i],r=t[i+n],o?V(n,o,r,l):r(l);e._subscribers.length=0}}function V(t,n,o,r){var l=e(o),i=void 0,a=void 0,s=void 0,c=void 0;if(l){if((i=function(e,t){try{return e(t)}catch(e){return k.error=e,k}}(o,r))===k?(c=!0,a=i.error,i.error=null):s=!0,n===i)return void H(n,new TypeError("A promises callback cannot return that same promise."))}else i=r,s=!0;n._state!==x||(l&&s?M(n,i):c?H(n,a):t===z?L(n,i):t===E&&H(n,i))}var I=0;function F(e){e[w]=I++,e._state=void 0,e._result=void 0,e._subscribers=[]}var R=function(){function e(e,n){this._instanceConstructor=e,this.promise=new e(C),this.promise[w]||F(this.promise),t(n)?(this.length=n.length,this._remaining=n.length,this._result=new Array(this.length),0===this.length?L(this.promise,this._result):(this.length=this.length||0,this._enumerate(n),0===this._remaining&&L(this.promise,this._result))):H(this.promise,new Error("Array Methods must be provided an Array"))}return e.prototype._enumerate=function(e){for(var t=0;this._state===x&&t<e.length;t++)this._eachEntry(e[t],t)},e.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,o=n.resolve;if(o===A){var r=S(e);if(r===_&&e._state!==x)this._settledAt(e._state,t,e._result);else if("function"!=typeof r)this._remaining--,this._result[t]=e;else if(n===D){var l=new n(C);P(l,e,r),this._willSettleAt(l,t)}else this._willSettleAt(new n(function(t){return t(e)}),t)}else this._willSettleAt(o(e),t)},e.prototype._settledAt=function(e,t,n){var o=this.promise;o._state===x&&(this._remaining--,e===E?H(o,n):this._result[t]=n),0===this._remaining&&L(o,this._result)},e.prototype._willSettleAt=function(e,t){var n=this;N(e,void 0,function(e){return n._settledAt(z,t,e)},function(e){return n._settledAt(E,t,e)})},e}(),D=function(){function t(e){this[w]=I++,this._result=this._state=void 0,this._subscribers=[],C!==e&&("function"!=typeof e&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof t?function(e,t){try{t(function(t){M(e,t)},function(t){H(e,t)})}catch(t){H(e,t)}}(this,e):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return t.prototype.catch=function(e){return this.then(null,e)},t.prototype.finally=function(t){var n=this.constructor;return e(t)?this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){throw e})}):this.then(t,t)},t}();return D.prototype.then=_,D.all=function(e){return new R(this,e).promise},D.race=function(e){var n=this;return t(e)?new n(function(t,o){for(var r=e.length,l=0;l<r;l++)n.resolve(e[l]).then(t,o)}):new n(function(e,t){return t(new TypeError("You must pass an array to race."))})},D.resolve=A,D.reject=function(e){var t=new this(C);return H(t,e),t},D._setScheduler=function(e){i=e},D._setAsap=function(e){a=e},D._asap=a,D.polyfill=function(){var e=void 0;if(void 0!==r)e=r;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise;if(t){var n=null;try{n=Object.prototype.toString.call(t.resolve())}catch(e){}if("[object Promise]"===n&&!t.cast)return}e.Promise=D},D.Promise=D,D},"object"===s(t)&&void 0!==e?e.exports=a():void 0===(i="function"==typeof(l=a)?l.call(t,n,t,e):l)||(e.exports=i)}).call(this,n("./node_modules/process/browser.js"),n("./node_modules/webpack/buildin/global.js"))},"./node_modules/hyperhtml-style/esm/index.js":function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*! (c) Andrea Giammarchi - ISC */n.r(t);var r=function(){var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=/([^A-Z])([A-Z]+)/g;return function(e,t){return"ownerSVGElement"in e?function(e,t){var n;return t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style")),n.value="",e.setAttributeNode(n),r(n,!0)}(e,t):r(e.style,!1)};function n(e,t,n){return t+"-"+n.toLowerCase()}function r(r,l){var i,a;return function(s){var c,u,d,f;switch(o(s)){case"object":if(s){if("object"===i){if(!l&&a!==s)for(u in a)u in s||(r[u]="")}else l?r.value="":r.cssText="";for(u in c=l?{}:r,s)d="number"!=typeof(f=s[u])||e.test(u)?f:f+"px",!l&&/^--/.test(u)?c.setProperty(u,d):c[u]=d;i="object",l?r.value=function(e){var o,r=[];for(o in e)r.push(o.replace(t,n),":",e[o],";");return r.join("")}(a=c):a=s;break}default:a!=s&&(i="string",a=s,l?r.value=s||"":r.cssText=s||"")}}}}();t.default=r},"./node_modules/hyperhtml-wire/esm/index.js":function(e,t,n){"use strict";n.r(t);
/*! (c) Andrea Giammarchi - ISC */
var o=function(e,t){return(t=n.prototype).ELEMENT_NODE=1,t.nodeType=111,t.remove=function(e){var t=this.childNodes,n=this.firstChild,o=this.lastChild;if(this._=null,e&&2===t.length)o.parentNode.removeChild(o);else{var r=this.ownerDocument.createRange();r.setStartBefore(e?t[1]:n),r.setEndAfter(o),r.deleteContents()}return n},t.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var o=this.childNodes,r=0,l=o.length;r<l;r++)t.appendChild(o[r]);return t},n;function n(t){var n=this.childNodes=e.call(t,0);this.firstChild=n[0],this.lastChild=n[n.length-1],this.ownerDocument=n[0].ownerDocument,this._=null}}([].slice);t.default=o},"./node_modules/hyperhtml/cjs/classes/Component.js":function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r,l=(r=n("./node_modules/@ungap/custom-event/esm/index.js")).__esModule?r.default:r,i=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/essential-map/esm/index.js")),a=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/weakmap/esm/index.js"));function s(){return this}Object.defineProperty(t,"__esModule",{value:!0}).default=s,t.setup=function(e){var t=new a,n=Object.create;Object.defineProperties(s,{for:{configurable:!0,value:function(e,r){return function(e,t,r,l){var i=t.get(e)||function(e,t){var n={w:null,p:null};return t.set(e,n),n}(e,t);switch(o(l)){case"object":case"function":var s=i.w||(i.w=new a);return s.get(l)||function(e,t,n){return e.set(t,n),n}(s,l,new e(r));default:var c=i.p||(i.p=n(null));return c[l]||(c[l]=new e(r))}}(this,t.get(e)||function(e){var n=new i;return t.set(e,n),n}(e),e,null==r?"default":r)}}}),Object.defineProperties(s.prototype,{handleEvent:{value:function(e){var t=e.currentTarget;this["getAttribute"in t&&t.getAttribute("data-call")||"on"+e.type](e)}},html:c("html",e),svg:c("svg",e),state:c("state",function(){return this.defaultState}),defaultState:{get:function(){return{}}},dispatch:{value:function(e,t){var n=this._wire$;if(n){var o=new l(e,{bubbles:!0,cancelable:!0,detail:t});return o.component=this,(n.dispatchEvent?n:n.firstChild).dispatchEvent(o)}return!1}},setState:{value:function(e,t){var n=this.state,o="function"==typeof e?e.call(this,n):e;for(var r in o)n[r]=o[r];return!1!==t&&this.render(),this}}})};var c=function(e,t){var n="_"+e+"$";return{get:function(){return this[n]||u(this,n,t.call(this,e))},set:function(e){u(this,n,e)}}},u=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,value:"function"==typeof n?function(){return e._wire$=n.apply(this,arguments)}:n})[t]};Object.defineProperties(s.prototype,{ELEMENT_NODE:{value:1},nodeType:{value:-1}})},"./node_modules/hyperhtml/cjs/hyper/render.js":function(e,t,n){"use strict";var o,r=(o=n("./node_modules/@ungap/weakmap/esm/index.js")).__esModule?o.default:o,l=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/template-tag-arguments/esm/index.js")),i=n("./node_modules/hyperhtml/cjs/shared/constants.js").OWNER_SVG_ELEMENT,a=n("./node_modules/hyperhtml/cjs/objects/Updates.js").Tagger,s=new r;Object.defineProperty(t,"__esModule",{value:!0}).default=function(){var e=s.get(this),t=l.apply(null,arguments);return e&&e.template===t[0]?e.tagger.apply(null,t):function(e){var t=new a(i in this?"svg":"html");s.set(this,{tagger:t,template:e}),this.textContent="",this.appendChild(t.apply(null,arguments))}.apply(this,t),this}},"./node_modules/hyperhtml/cjs/hyper/wire.js":function(e,t,n){"use strict";var o,r=(o=n("./node_modules/@ungap/weakmap/esm/index.js")).__esModule?o.default:o,l=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/template-tag-arguments/esm/index.js")),i=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml-wire/esm/index.js")),a=n("./node_modules/hyperhtml/cjs/objects/Updates.js").Tagger,s=new r,c=function(e){var t,n,o;return function(){var r=l.apply(null,arguments);return o!==r[0]?(o=r[0],n=new a(e),t=d(n.apply(n,r))):n.apply(n,r),t}},u=function(e,t){var n=t.indexOf(":"),o=s.get(e),r=t;return-1<n&&(r=t.slice(n+1),t=t.slice(0,n)||"html"),o||s.set(e,o={}),o[r]||(o[r]=c(t))},d=function(e){var t=e.childNodes,n=t.length;return 1===n?t[0]:n?new i(t):e};t.content=c,t.weakly=u,Object.defineProperty(t,"__esModule",{value:!0}).default=function(e,t){return null==e?c(t||"html"):u(e,t||"html")}},"./node_modules/hyperhtml/cjs/index.js":function(e,t,n){"use strict";
/*! (c) Andrea Giammarchi (ISC) */var o,r=(o=n("./node_modules/@ungap/weakmap/esm/index.js")).__esModule?o.default:o,l=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/essential-weakset/esm/index.js")),i=function(e){return e.__esModule?e.default:e}(n("./node_modules/domdiff/esm/index.js")),a=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml/cjs/classes/Component.js")),s=n("./node_modules/hyperhtml/cjs/classes/Component.js").setup,c=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml/cjs/objects/Intent.js")),u=n("./node_modules/hyperhtml/cjs/objects/Updates.js"),d=u.observe,f=u.Tagger,b=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml/cjs/hyper/wire.js")),p=n("./node_modules/hyperhtml/cjs/hyper/wire.js"),m=p.content,h=p.weakly,v=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml/cjs/hyper/render.js")),y=function(e){return v.bind(e)},g=c.define,j=f.prototype;function O(e){return arguments.length<2?null==e?m("html"):"string"==typeof e?O.wire(null,e):"raw"in e?m("html")(e):"nodeType"in e?O.bind(e):h(e,"html"):("raw"in e?m("html"):O.wire).apply(null,arguments)}O.Component=a,O.bind=y,O.define=g,O.diff=i,O.hyper=O,O.observe=d,O.tagger=j,O.wire=b,O._={WeakMap:r,WeakSet:l},s(m),t.Component=a,t.bind=y,t.define=g,t.diff=i,t.hyper=O,t.observe=d,t.tagger=j,t.wire=b,Object.defineProperty(t,"__esModule",{value:!0}).default=O},"./node_modules/hyperhtml/cjs/objects/Intent.js":function(e,t,n){"use strict";var o={},r={},l=[],i=r.hasOwnProperty,a=0;Object.defineProperty(t,"__esModule",{value:!0}).default={attributes:o,define:function(e,t){e.indexOf("-")<0?(e in r||(a=l.push(e)),r[e]=t):o[e]=t},invoke:function(e,t){for(var n=0;n<a;n++){var o=l[n];if(i.call(e,o))return r[o](e[o],t)}}}},"./node_modules/hyperhtml/cjs/objects/Updates.js":function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r,l=(r=n("./node_modules/@ungap/custom-event/esm/index.js")).__esModule?r.default:r,i=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/essential-weakset/esm/index.js")),a=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/is-array/esm/index.js")),s=function(e){return e.__esModule?e.default:e}(n("./node_modules/@ungap/create-content/esm/index.js")),c=function(e){return e.__esModule?e.default:e}(n("./node_modules/disconnected/esm/index.js")),u=function(e){return e.__esModule?e.default:e}(n("./node_modules/domdiff/esm/index.js")),d=function(e){return e.__esModule?e.default:e}(n("./node_modules/domtagger/esm/index.js")),f=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml-style/esm/index.js")),b=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml-wire/esm/index.js")),p=n("./node_modules/hyperhtml/cjs/shared/constants.js"),m=p.CONNECTED,h=p.DISCONNECTED,v=p.DOCUMENT_FRAGMENT_NODE,y=p.OWNER_SVG_ELEMENT,g=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml/cjs/classes/Component.js")),j=function(e){return e.__esModule?e.default:e}(n("./node_modules/hyperhtml/cjs/objects/Intent.js")),O=g.prototype.nodeType,_=b.prototype.nodeType,A=c({Event:l,WeakSet:i});t.Tagger=S,t.observe=A;var w=function(e){return{html:e}},C=function e(t,n){switch(t.nodeType){case _:return 1/n<0?n?t.remove(!0):t.lastChild:n?t.valueOf(!0):t.firstChild;case O:return e(t.render(),n);default:return t}},x=function(e,t){t(e.placeholder),"text"in e?Promise.resolve(e.text).then(String).then(t):"any"in e?Promise.resolve(e.any).then(t):"html"in e?Promise.resolve(e.html).then(w).then(t):Promise.resolve(j.invoke(e,t)).then(t)},z=function(e){return null!=e&&"then"in e},E=/^(?:form|list)$/i,k=[].slice;function S(e){return this.type=e,d(this)}S.prototype={attribute:function(e,t,n){var o,r=y in e;if("style"===t)return f(e,n,r);if(/^on/.test(t)){var l=t.slice(2);return l===m||l===h?A(e):t.toLowerCase()in e&&(l=l.toLowerCase()),function(t){o!==t&&(o&&e.removeEventListener(l,o,!1),o=t,t&&e.addEventListener(l,t,!1))}}if("data"===t||!r&&t in e&&!E.test(t))return function(n){o!==n&&(o=n,e[t]!==n&&(e[t]=n,null==n&&e.removeAttribute(t)))};if(t in j.attributes)return function(n){var r=j.attributes[t](e,n);o!==r&&(o=r,null==r?e.removeAttribute(t):e.setAttribute(t,r))};var i=!1,a=n.cloneNode(!0);return function(t){o!==t&&(o=t,a.value!==t&&(null==t?(i&&(i=!1,e.removeAttributeNode(a)),a.value=t):(a.value=t,i||(i=!0,e.setAttributeNode(a)))))}},any:function(e,t){var n,r={node:C,before:e},l=y in e?"svg":"html",i=!1;return function c(d){switch(o(d)){case"string":case"number":case"boolean":i?n!==d&&(n=d,t[0].textContent=d):(i=!0,n=d,t=u(e.parentNode,t,[function(e,t){return e.ownerDocument.createTextNode(t)}(e,d)],r));break;case"function":c(d(e));break;case"object":case"undefined":if(null==d){i=!1,t=u(e.parentNode,t,[],r);break}default:if(i=!1,n=d,a(d))if(0===d.length)t.length&&(t=u(e.parentNode,t,[],r));else switch(o(d[0])){case"string":case"number":case"boolean":c({html:d});break;case"object":if(a(d[0])&&(d=d.concat.apply([],d)),z(d[0])){Promise.all(d).then(c);break}default:t=u(e.parentNode,t,d,r)}else"ELEMENT_NODE"in d?t=u(e.parentNode,t,d.nodeType===v?k.call(d.childNodes):[d],r):z(d)?d.then(c):"placeholder"in d?x(d,c):"text"in d?c(String(d.text)):"any"in d?c(d.any):"html"in d?t=u(e.parentNode,t,k.call(s([].concat(d.html).join(""),l).childNodes),r):c("length"in d?k.call(d):j.invoke(d,c))}}},text:function(e){var t;return function n(r){if(t!==r){t=r;var l=o(r);"object"===l&&r?z(r)?r.then(n):"placeholder"in r?x(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?k.call(r).join(""):j.invoke(r,n)):"function"===l?n(r(e)):e.textContent=null==r?"":r}}}}},"./node_modules/hyperhtml/cjs/shared/constants.js":function(e,t,n){"use strict";t.ELEMENT_NODE=1,t.DOCUMENT_FRAGMENT_NODE=11,t.OWNER_SVG_ELEMENT="ownerSVGElement",t.CONNECTED="connected",t.DISCONNECTED="disconnected"},"./node_modules/lazysizes/lazysizes.js":function(e,t,n){(function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(n,o){var r=function(e,t){"use strict";if(t.getElementsByClassName){var n,o,r,l,i,a,s,c,u,d=t.documentElement,f=e.Date,b=e.HTMLPictureElement,p=e.addEventListener,m=e.setTimeout,h=e.requestAnimationFrame||m,v=e.requestIdleCallback,y=/^picture$/i,g=["load","error","lazyincluded","_lazyloaded"],j={},O=Array.prototype.forEach,_=function(e,t){return j[t]||(j[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),j[t].test(e.getAttribute("class")||"")&&j[t]},A=function(e,t){_(e,t)||e.setAttribute("class",(e.getAttribute("class")||"").trim()+" "+t)},w=function(e,t){var n;(n=_(e,t))&&e.setAttribute("class",(e.getAttribute("class")||"").replace(n," "))},C=function e(t,n,o){var r=o?"addEventListener":"removeEventListener";o&&e(t,n),g.forEach(function(e){t[r](e,n)})},x=function(e,o,r,l,i){var a=t.createEvent("Event");return r||(r={}),r.instance=n,a.initEvent(o,!l,!i),a.detail=r,e.dispatchEvent(a),a},z=function(t,n){var r;!b&&(r=e.picturefill||o.pf)?(n&&n.src&&!t.getAttribute("srcset")&&t.setAttribute("srcset",n.src),r({reevaluate:!0,elements:[t]})):n&&n.src&&(t.src=n.src)},E=function(e,t){return(getComputedStyle(e,null)||{})[t]},k=function(e,t,n){for(n=n||e.offsetWidth;n<o.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},S=(a=[],s=i=[],(u=function(e,n){r&&!n?e.apply(this,arguments):(s.push(e),l||(l=!0,(t.hidden?m:h)(c)))})._lsFlush=c=function(){var e=s;for(s=i.length?a:i,r=!0,l=!1;e.length;)e.shift()();r=!1},u),P=function(e,t){return t?function(){S(e)}:function(){var t=this,n=arguments;S(function(){e.apply(t,n)})}},M=function(e){var t,n,o=function(){t=null,e()},r=function e(){var t=f.now()-n;t<99?m(e,99-t):(v||o)(o)};return function(){n=f.now(),t||(t=m(r,99))}};!function(){var t,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in o=e.lazySizesConfig||e.lazysizesConfig||{},n)t in o||(o[t]=n[t]);e.lazySizesConfig=o,m(function(){o.init&&I()})}();var B,L,H,N,T=function(){var r,l,i,a,s,c,u,b,h,g,j,k,B,L,H,N,T,I,F,R=/^img$/i,D=/^iframe$/i,U="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),W=0,q=0,Y=-1,$=function(e){q--,(!e||q<0||!e.target)&&(q=0)},J=function(e){return null==k&&(k="hidden"==E(t.body,"visibility")),k||"hidden"!=E(e.parentNode,"visibility")&&"hidden"!=E(e,"visibility")},G=function(e,n){var o,r=e,l=J(e);for(b-=n,j+=n,h-=n,g+=n;l&&(r=r.offsetParent)&&r!=t.body&&r!=d;)(l=(E(r,"opacity")||1)>0)&&"visible"!=E(r,"overflow")&&(o=r.getBoundingClientRect(),l=g>o.left&&h<o.right&&j>o.top-1&&b<o.bottom+1);return l},Z=function(){var e,i,s,f,p,m,v,y,O,_,A,w,C=n.elements;if((a=o.loadMode)&&q<8&&(e=C.length)){for(i=0,Y++,_=!o.expand||o.expand<1?d.clientHeight>500&&d.clientWidth>500?500:370:o.expand,n._defEx=_,A=_*o.expFactor,w=o.hFac,k=null,W<A&&q<1&&Y>2&&a>2&&!t.hidden?(W=A,Y=0):W=a>1&&Y>1&&q<6?_:0;i<e;i++)if(C[i]&&!C[i]._lazyRace)if(U)if((y=C[i].getAttribute("data-expand"))&&(m=1*y)||(m=W),O!==m&&(c=innerWidth+m*w,u=innerHeight+m,v=-1*m,O=m),s=C[i].getBoundingClientRect(),(j=s.bottom)>=v&&(b=s.top)<=u&&(g=s.right)>=v*w&&(h=s.left)<=c&&(j||g||h||b)&&(o.loadHidden||J(C[i]))&&(l&&q<3&&!y&&(a<3||Y<4)||G(C[i],m))){if(oe(C[i]),p=!0,q>9)break}else!p&&l&&!f&&q<4&&Y<4&&a>2&&(r[0]||o.preloadAfterLoad)&&(r[0]||!y&&(j||g||h||b||"auto"!=C[i].getAttribute(o.sizesAttr)))&&(f=r[0]||C[i]);else oe(C[i]);f&&!p&&oe(f)}},Q=(B=Z,H=0,N=o.throttleDelay,T=o.ricTimeout,I=function(){L=!1,H=f.now(),B()},F=v&&T>49?function(){v(I,{timeout:T}),T!==o.ricTimeout&&(T=o.ricTimeout)}:P(function(){m(I)},!0),function(e){var t;(e=!0===e)&&(T=33),L||(L=!0,(t=N-(f.now()-H))<0&&(t=0),e||t<9?F():m(F,t))}),X=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:($(e),A(t,o.loadedClass),w(t,o.loadingClass),C(t,ee),x(t,"lazyloaded"))},K=P(X),ee=function(e){K({target:e.target})},te=function(e){var t,n=e.getAttribute(o.srcsetAttr);(t=o.customMedia[e.getAttribute("data-media")||e.getAttribute("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},ne=P(function(e,t,n,r,l){var a,s,c,u,d,f;(d=x(e,"lazybeforeunveil",t)).defaultPrevented||(r&&(n?A(e,o.autosizesClass):e.setAttribute("sizes",r)),s=e.getAttribute(o.srcsetAttr),a=e.getAttribute(o.srcAttr),l&&(u=(c=e.parentNode)&&y.test(c.nodeName||"")),f=t.firesLoad||"src"in e&&(s||a||u),d={target:e},A(e,o.loadingClass),f&&(clearTimeout(i),i=m($,2500),C(e,ee,!0)),u&&O.call(c.getElementsByTagName("source"),te),s?e.setAttribute("srcset",s):a&&!u&&(D.test(e.nodeName)?function(e,t){try{e.contentWindow.location.replace(t)}catch(n){e.src=t}}(e,a):e.src=a),l&&(s||u)&&z(e,{src:a})),e._lazyRace&&delete e._lazyRace,w(e,o.lazyClass),S(function(){(!f||e.complete&&e.naturalWidth>1)&&(X(d),e._lazyCache=!0,m(function(){"_lazyCache"in e&&delete e._lazyCache},9))},!0)}),oe=function(e){var t,n=R.test(e.nodeName),r=n&&(e.getAttribute(o.sizesAttr)||e.getAttribute("sizes")),i="auto"==r;(!i&&l||!n||!e.getAttribute("src")&&!e.srcset||e.complete||_(e,o.errorClass)||!_(e,o.lazyClass))&&(t=x(e,"lazyunveilread").detail,i&&V.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,q++,ne(e,t,i,r,n))},re=function e(){if(!l)if(f.now()-s<999)m(e,999);else{var t=M(function(){o.loadMode=3,Q()});l=!0,o.loadMode=3,Q(),p("scroll",function(){3==o.loadMode&&(o.loadMode=2),t()},!0)}};return{_:function(){s=f.now(),n.elements=t.getElementsByClassName(o.lazyClass),r=t.getElementsByClassName(o.lazyClass+" "+o.preloadClass),p("scroll",Q,!0),p("resize",Q,!0),e.MutationObserver?new MutationObserver(Q).observe(d,{childList:!0,subtree:!0,attributes:!0}):(d.addEventListener("DOMNodeInserted",Q,!0),d.addEventListener("DOMAttrModified",Q,!0),setInterval(Q,999)),p("hashchange",Q,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(e){t.addEventListener(e,Q,!0)}),/d$|^c/.test(t.readyState)?re():(p("load",re),t.addEventListener("DOMContentLoaded",Q),m(re,2e4)),n.elements.length?(Z(),S._lsFlush()):Q()},checkElems:Q,unveil:oe}}(),V=(L=P(function(e,t,n,o){var r,l,i;if(e._lazysizesWidth=o,o+="px",e.setAttribute("sizes",o),y.test(t.nodeName||""))for(l=0,i=(r=t.getElementsByTagName("source")).length;l<i;l++)r[l].setAttribute("sizes",o);n.detail.dataAttr||z(e,n.detail)}),H=function(e,t,n){var o,r=e.parentNode;r&&(n=k(e,r,n),(o=x(e,"lazybeforesizes",{width:n,dataAttr:!!t})).defaultPrevented||(n=o.detail.width)&&n!==e._lazysizesWidth&&L(e,r,o,n))},{_:function(){B=t.getElementsByClassName(o.autosizesClass),p("resize",N)},checkElems:N=M(function(){var e,t=B.length;if(t)for(e=0;e<t;e++)H(B[e])}),updateElem:H}),I=function e(){e.i||(e.i=!0,V._(),T._())};return n={cfg:o,autoSizer:V,loader:T,init:I,uP:z,aC:A,rC:w,hC:_,fire:x,gW:k,rAF:S}}}(n,n.document);n.lazySizes=r,"object"==t(e)&&e.exports&&(e.exports=r)}(window)}).call(this,n("./node_modules/webpack/buildin/module.js")(e))},"./node_modules/lazysizes/plugins/fix-ios-sizes/fix-ios-sizes.js":function(e,t,n){(function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(o,r){var l=function e(){r(o.lazySizes),o.removeEventListener("lazyunveilread",e,!0)};r=r.bind(null,o,o.document),"object"==t(e)&&e.exports?r(n("./node_modules/lazysizes/lazysizes.js")):o.lazySizes?l():o.addEventListener("lazyunveilread",l,!0)}(window,function(e,t,n){"use strict";var o,r=t.createElement("img");!("srcset"in r)||"sizes"in r||e.HTMLPictureElement||(o=/^picture$/i,t.addEventListener("lazybeforeunveil",function(e){var r,l,i,a,s,c,u;e.detail.instance==n&&!e.defaultPrevented&&!lazySizesConfig.noIOSFix&&(r=e.target)&&(i=r.getAttribute(lazySizesConfig.srcsetAttr))&&(l=r.parentNode)&&((s=o.test(l.nodeName||""))||(a=r.getAttribute("sizes")||r.getAttribute(lazySizesConfig.sizesAttr)))&&(c=s?l:t.createElement("picture"),r._lazyImgSrc||Object.defineProperty(r,"_lazyImgSrc",{value:t.createElement("source"),writable:!0}),u=r._lazyImgSrc,a&&u.setAttribute("sizes",a),u.setAttribute(lazySizesConfig.srcsetAttr,i),r.setAttribute("data-pfsrcset",i),r.removeAttribute(lazySizesConfig.srcsetAttr),s||(l.insertBefore(c,r),c.appendChild(r)),c.insertBefore(u,r))}))})}).call(this,n("./node_modules/webpack/buildin/module.js")(e))},"./node_modules/lazysizes/plugins/progressive/ls.progressive.js":function(e,t,n){(function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(o,r){var l=function e(){r(o.lazySizes),o.removeEventListener("lazyunveilread",e,!0)};r=r.bind(null,o,o.document),"object"==t(e)&&e.exports?r(n("./node_modules/lazysizes/lazysizes.js")):o.lazySizes?l():o.addEventListener("lazyunveilread",l,!0)}(window,function(e,t,n){"use strict";var o,r;"srcset"in t.createElement("img")&&(o=/^img$/i,r=function(e){e.target.style.backgroundSize="",e.target.style.backgroundImage="",e.target.removeEventListener(e.type,r)},t.addEventListener("lazybeforeunveil",function(e){if(e.detail.instance==n){var t=e.target;if(o.test(t.nodeName)){var l=t.getAttribute("src");l&&(t.style.backgroundSize="100% 100%",t.style.backgroundImage="url("+l+")",t.removeAttribute("src"),t.addEventListener("load",r))}}},!1))})}).call(this,n("./node_modules/webpack/buildin/module.js")(e))},"./node_modules/lazysizes/plugins/respimg/ls.respimg.js":function(e,t,n){(function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(o,r){var l=function e(){r(o.lazySizes),o.removeEventListener("lazyunveilread",e,!0)};r=r.bind(null,o,o.document),"object"==t(e)&&e.exports?r(n("./node_modules/lazysizes/lazysizes.js"),n("./node_modules/lazysizes/plugins/fix-ios-sizes/fix-ios-sizes.js")):o.lazySizes?l():o.addEventListener("lazyunveilread",l,!0)}(window,function(e,t,n){"use strict";var o,r,l,i=n&&n.cfg||e.lazySizesConfig,a=t.createElement("img"),s="sizes"in a&&"srcset"in a,c=/\s+\d+h/g,u=(r=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,l=Array.prototype.forEach,function(){var e=t.createElement("img"),n=function(e){var t,n,o=e.getAttribute(lazySizesConfig.srcsetAttr);o&&((n=o.match(r))&&(t="w"==n[2]?n[1]/n[3]:n[3]/n[1])&&e.setAttribute("data-aspectratio",t),e.setAttribute(lazySizesConfig.srcsetAttr,o.replace(c,"")))},o=function(e){var t=e.target.parentNode;t&&"PICTURE"==t.nodeName&&l.call(t.getElementsByTagName("source"),n),n(e.target)},i=function(){e.currentSrc&&t.removeEventListener("lazybeforeunveil",o)};t.addEventListener("lazybeforeunveil",o),e.onload=i,e.onerror=i,e.srcset="data:,a 1w 1h",e.complete&&i()});if(i||(i={},e.lazySizesConfig=i),i.supportsType||(i.supportsType=function(e){return!e}),!e.picturefill&&!i.pf){if(e.HTMLPictureElement&&s)return t.msElementsFromPoint&&u(navigator.userAgent.match(/Edge\/(\d+)/)),void(i.pf=function(){});var d,f,b,p,m,h,v,y,g,j,O,_;i.pf=function(t){var n,r;if(!e.picturefill)for(n=0,r=t.elements.length;n<r;n++)o(t.elements[n])},m=function(e,t){return e.w-t.w},h=/^\s*\d+\.*\d*px\s*$/,f=/(([^,\s].[^\s]+)\s+(\d+)w)/g,b=/\s/,p=function(e,t,n,o){d.push({c:t,u:n,w:1*o})},y=function(r,l){var a,s=r.getAttribute("srcset")||r.getAttribute(i.srcsetAttr);!s&&l&&(s=r._lazypolyfill?r._lazypolyfill._set:r.getAttribute(i.srcAttr)||r.getAttribute("src")),r._lazypolyfill&&r._lazypolyfill._set==s||(a=v(s||""),l&&r.parentNode&&(a.isPicture="PICTURE"==r.parentNode.nodeName.toUpperCase(),a.isPicture&&e.matchMedia&&(n.aC(r,"lazymatchmedia"),function e(){var n,r,l;e.init||(e.init=!0,addEventListener("resize",(r=t.getElementsByClassName("lazymatchmedia"),l=function(){var e,t;for(e=0,t=r.length;e<t;e++)o(r[e])},function(){clearTimeout(n),n=setTimeout(l,66)})))}())),a._set=s,Object.defineProperty(r,"_lazypolyfill",{value:a,writable:!0}))},g=function(t){return e.matchMedia?(g=function(e){return!e||(matchMedia(e)||{}).matches})(t):!t},j=function(t){var o,r,l,a,s,c,u;if(y(a=t,!0),(s=a._lazypolyfill).isPicture)for(r=0,l=(o=t.parentNode.getElementsByTagName("source")).length;r<l;r++)if(i.supportsType(o[r].getAttribute("type"),t)&&g(o[r].getAttribute("media"))){a=o[r],y(a),s=a._lazypolyfill;break}return s.length>1?(u=a.getAttribute("sizes")||"",u=h.test(u)&&parseInt(u,10)||n.gW(t,t.parentNode),s.d=function(t){var o=e.devicePixelRatio||1,r=n.getX&&n.getX(t);return Math.min(r||o,2.5,o)}(t),!s.src||!s.w||s.w<u?(s.w=u,c=function(e){for(var t,n,o=e.length,r=e[o-1],l=0;l<o;l++)if((r=e[l]).d=r.w/e.w,r.d>=e.d){!r.cached&&(t=e[l-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(n=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*n),t.d+(r.d-e.d)*n>e.d&&(r=t));break}return r}(s.sort(m)),s.src=c):c=s.src):c=s[0],c},(O=function(e){if(!s||!e.parentNode||"PICTURE"==e.parentNode.nodeName.toUpperCase()){var t=j(e);t&&t.u&&e._lazypolyfill.cur!=t.u&&(e._lazypolyfill.cur=t.u,t.cached=!0,e.setAttribute(i.srcAttr,t.u),e.setAttribute("src",t.u))}}).parse=v=function(e){return d=[],(e=e.trim()).replace(c,"").replace(f,p),d.length||!e||b.test(e)||d.push({c:e,u:e,w:99}),d},o=O,i.loadedClass&&i.loadingClass&&(_=[],['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(e){_.push(e+i.loadedClass),_.push(e+i.loadingClass)}),i.pf({elements:t.querySelectorAll(_.join(", "))}))}})}).call(this,n("./node_modules/webpack/buildin/module.js")(e))},"./node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js":function(e,t,n){(function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(o,r){var l=function e(){r(o.lazySizes),o.removeEventListener("lazyunveilread",e,!0)};r=r.bind(null,o,o.document),"object"==t(e)&&e.exports?r(n("./node_modules/lazysizes/lazysizes.js")):o.lazySizes?l():o.addEventListener("lazyunveilread",l,!0)}(window,function(e,t,n){"use strict";var o,r,l={};function i(e,n){if(!l[e]){var o=t.createElement(n?"link":"script"),r=t.getElementsByTagName("script")[0];n?(o.rel="stylesheet",o.href=e):o.src=e,l[e]=!0,l[o.src||o.href]=!0,r.parentNode.insertBefore(o,r)}}t.addEventListener&&(r=/\(|\)|\s|'/,o=function(e,n){var o=t.createElement("img");o.onload=function(){o.onload=null,o.onerror=null,o=null,n()},o.onerror=o.onload,o.src=e,o&&o.complete&&o.onload&&o.onload()},addEventListener("lazybeforeunveil",function(e){var t,l,a;e.detail.instance==n&&(e.defaultPrevented||("none"==e.target.preload&&(e.target.preload="auto"),(t=e.target.getAttribute("data-link"))&&i(t,!0),(t=e.target.getAttribute("data-script"))&&i(t),(t=e.target.getAttribute("data-require"))&&(n.cfg.requireJs?n.cfg.requireJs([t]):i(t)),(l=e.target.getAttribute("data-bg"))&&(e.detail.firesLoad=!0,o(l,function(){e.target.style.backgroundImage="url("+(r.test(l)?JSON.stringify(l):l)+")",e.detail.firesLoad=!1,n.fire(e.target,"_lazyloaded",{},!0,!0)})),(a=e.target.getAttribute("data-poster"))&&(e.detail.firesLoad=!0,o(a,function(){e.target.poster=a,e.detail.firesLoad=!1,n.fire(e.target,"_lazyloaded",{},!0,!0)}))))},!1))})}).call(this,n("./node_modules/webpack/buildin/module.js")(e))},"./node_modules/mdn-polyfills/Node.prototype.prepend.js":function(e,t){!function(){function e(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var n=e instanceof Node;t.appendChild(n?e:document.createTextNode(String(e)))}),this.insertBefore(t,this.firstChild)}[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(t){t.hasOwnProperty("prepend")||Object.defineProperty(t,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:e})})}()},"./node_modules/process/browser.js":function(e,t){var n,o,r=e.exports={};function l(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===l||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:l}catch(e){n=l}try{o="function"==typeof clearTimeout?clearTimeout:i}catch(e){o=i}}();var s,c=[],u=!1,d=-1;function f(){u&&s&&(u=!1,s.length?c=s.concat(c):d=-1,c.length&&b())}function b(){if(!u){var e=a(f);u=!0;for(var t=c.length;t;){for(s=c,c=[];++d<t;)s&&s[d].run();d=-1,t=c.length}s=null,u=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===i||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new p(e,t)),1!==c.length||u||a(b)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},"./node_modules/skatejs/dist/esnext/index.js":function(e,t,n){"use strict";function o(e){return"string"==typeof e?e.split(/([_A-Z])/).reduce(function(e,t,n){var o=e&&n%2!=0?"-":"";return t="_"===t?"":t,"".concat(e).concat(o).concat(t.toLowerCase())}):e}var r=function(e){return null==e};function l(e){e=e||{};var t=Object.getOwnPropertyNames(e);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t}function i(e,t){return(-1===e.indexOf("-")?"x-".concat(e):e)+(t?"-".concat(t):"")}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"element";e=o(e);for(var t=0;customElements.get(i(e,t));)++t;return i(e,t)}function s(e){return customElements.define(e.is||a(),e),e}function c(e){return e._shadowRoot||(e._shadowRoot=e.shadowRoot||e.attachShadow({mode:"open"}))}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e,t,n){return(f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=b(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}Object.assign;var m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return function(t){function n(){return function(e,t){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this),function(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}(this,b(n).apply(this,arguments))}var o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(n,e),o=n,(r=[{key:"childrenUpdated",value:function(){f(b(n.prototype),"childrenUpdated",this)&&f(b(n.prototype),"childrenUpdated",this).call(this),this.props&&this.props.hasOwnProperty("children")&&(this.props={children:this.children})}},{key:"connectedCallback",value:function(){if(f(b(n.prototype),"connectedCallback",this)&&f(b(n.prototype),"connectedCallback",this).call(this),this.childrenUpdated){var e=this.childrenUpdated.bind(this);this._mo=new MutationObserver(e),this._mo.observe(this,{childList:!0}),e()}}},{key:"disconnectedCallback",value:function(){f(b(n.prototype),"disconnectedCallback",this)&&f(b(n.prototype),"disconnectedCallback",this).call(this),this._mo&&this._mo.disconnect()}}])&&d(o.prototype,r),n}()};function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return function(t){function n(){return function(e,t){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this),function(e,t){return!t||"object"!==h(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}(this,y(n).apply(this,arguments))}var o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(n,e),o=n,(r=[{key:"context",get:function(){if(this._context)return this._context;for(var e=this;e=e.parentNode||e.host;)if("context"in e)return e.context;return{}},set:function(e){this._context=e}}])&&v(o.prototype,r),n}()};function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function A(e,t,n){return(A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return function(t){function n(){return function(e,t){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this),function(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}(this,w(n).apply(this,arguments))}var o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(n,e),o=n,(r=[{key:"connectedCallback",value:function(){this.connecting&&this.connecting(),A(w(n.prototype),"connectedCallback",this)&&A(w(n.prototype),"connectedCallback",this).call(this),this.connected&&this.connected()}},{key:"disconnectedCallback",value:function(){this.disconnecting&&this.disconnecting(),A(w(n.prototype),"disconnectedCallback",this)&&A(w(n.prototype),"disconnectedCallback",this).call(this),this.disconnected&&this.disconnected()}}])&&_(o.prototype,r),n}()};function z(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function E(e,t){return!t||"object"!==M(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function k(e,t,n){return(k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function M(e){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};function L(e){return e}function H(e,t){var n=t.coerce,r=t.default,l=t.deserialize,i=t.serialize;return{attribute:function(e,t){var n=t.attribute,r="object"===M(n)?B({},n):{source:n,target:n};return!0===r.source&&(r.source=o(e)),!0===r.target&&(r.target=o(e)),r}(e,t),coerce:n||L,default:r,deserialize:l||L,serialize:i||L}}var N=new Map;function T(e){var t=e||{},n=function(e,n){var o=e.constructor,r=H(n,t);o.hasOwnProperty("_propsNormalized")||(o._propsNormalized={}),o._propsNormalized[n]=r;var l=r.attribute,i=l.source,a=l.target;i&&(o._observedAttributes.push(i),o._attributeToPropertyMap[i]=n,i!==a&&(o._attributeToAttributeMap[i]=a)),Object.defineProperty(o.prototype,n,{configurable:!0,get:function(){var e=this._props[n];return null==e?r.default:e},set:function(e){var t=r.attribute.target,o=r.serialize;if(t){var l=o?o(e):e;null==l?this.removeAttribute(t):this.setAttribute(t,l)}this._props[n]=r.coerce(e),this.triggerUpdate()}})};return Object.keys(t).forEach(function(e){return n[e]=t[e]}),n}var V=JSON.parse,I=JSON.stringify,F=Object.freeze({source:!0}),R=function(e){return r(e)?0:Number(e)},D=T({attribute:F}),U=T({attribute:F,coerce:function(e){return Array.isArray(e)?e:r(e)?null:[e]},default:Object.freeze([]),deserialize:V,serialize:I}),W=T({attribute:F,coerce:Boolean,default:!1,deserialize:function(e){return!r(e)},serialize:function(e){return e?"":null}}),q=T({attribute:F,default:0,coerce:R,deserialize:R,serialize:function(e){return r(e)?null:String(Number(e))}}),Y=T({attribute:F,default:Object.freeze({}),deserialize:V,serialize:I}),$=T({attribute:F,default:"",coerce:String,serialize:function(e){return r(e)?null:String(e)}});N.set(Array,U),N.set(Boolean,W),N.set(Number,q),N.set(Object,Y),N.set(String,$);var J={any:D,array:U,boolean:W,number:q,object:Y,string:$};function G(e){return(G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Z(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function Q(e,t,n){return(Q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=X(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function X(e){return(X=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return function(t){function n(){return function(e,t){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this),function(e,t){return!t||"object"!==G(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}(this,X(n).apply(this,arguments))}var o,r;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(n,e),o=n,(r=[{key:"renderer",value:function(e,t){Q(X(n.prototype),"renderer",this)?Q(X(n.prototype),"renderer",this).call(this,e,t):e.innerHTML=t()||""}},{key:"updated",value:function(e,t){var o=this;Q(X(n.prototype),"updated",this)&&Q(X(n.prototype),"updated",this).call(this,e,t),this.rendering&&this.rendering(),this.renderer(this.renderRoot,function(){return o.render&&o.render(o)}),this.rendered&&this.rendered()}},{key:"renderRoot",get:function(){return Q(X(n.prototype),"renderRoot",this)||c(this)}}])&&Z(o.prototype,r),n}()},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return x(m(j(function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:HTMLElement;return t=e=function(e){function t(){var e,n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return E(n,(o=n=E(this,(e=S(t)).call.apply(e,[this].concat(l))),n._prevProps={},n._prevState={},n._props={},n._state={},o))}var o,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(t,n),o=t,i=[{key:"observedAttributes",get:function(){return function(e){if(!e.hasOwnProperty("_propsNormalized")){var t=e.props;l(t).forEach(function(n){var o=t[n]||t.any;N.has(o)&&(o=N.get(o)),"function"!=typeof o&&(o=T(o)),o({constructor:e},n)})}}(this),this._observedAttributes.concat(k(S(t),"observedAttributes",this)||[])}},{key:"props",get:function(){return this._props},set:function(e){this._props=e}}],(r=[{key:"attributeChangedCallback",value:function(e,n,o){var r=this.constructor,l=r._attributeToAttributeMap,i=r._attributeToPropertyMap,a=r._propsNormalized;k(S(t.prototype),"attributeChangedCallback",this)&&k(S(t.prototype),"attributeChangedCallback",this).call(this,e,n,o);var s=i[e];if(s){var c=a[s];if(c){var u=c.default,d=c.deserialize,f=d?d(o):o;this._props[s]=null==f?u:f,this.triggerUpdate()}}var b=l[e];b&&(null==o?this.removeAttribute(b):this.setAttribute(b,o))}},{key:"connectedCallback",value:function(){k(S(t.prototype),"connectedCallback",this)&&k(S(t.prototype),"connectedCallback",this).call(this),this.triggerUpdate()}},{key:"shouldUpdate",value:function(){return!0}},{key:"triggerUpdate",value:function(){var e,t=this;this._updating||(this._updating=!0,e=function(){var e=t._prevProps,n=t._prevState;t.updating&&t.updating(e,n),t.updated&&t.shouldUpdate(e,n)&&t.updated(e,n),t._prevProps=t.props,t._prevState=t.state,t._updating=!1},window.Promise?Promise.resolve().then(e):setTimeout(e))}},{key:"props",get:function(){var e=this;return l(this.constructor.props).reduce(function(t,n){return t[n]=e[n],t},{})},set:function(e){var t=this,n=this.constructor.props;l(e).forEach(function(o){return o in n&&(t[o]=e[o])})}},{key:"state",get:function(){return this._state},set:function(e){this._state=e,this.triggerUpdate()}}])&&z(o.prototype,r),i&&z(o,i),t}(),e._attributeToAttributeMap={},e._attributeToPropertyMap={},e._observedAttributes=[],e._props={},t}(ee(e||HTMLElement)))))};n.d(t,"a",function(){return s}),n.d(t,"b",function(){return a}),n.d(t,"d",function(){return c}),n.d(t,"e",function(){return te}),n.d(t,"c",function(){return J})},"./node_modules/smooth-scroll/src/js/smooth-scroll.js":function(e,t,n){(function(n){var o,r;r=void 0!==n?n:"undefined"!=typeof window?window:this,void 0===(o=function(){return function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){for(var e={},t=function(t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},n=0;n<arguments.length;n++)t(arguments[n]);return e},o=function(e){var t;try{t=decodeURIComponent(e)}catch(n){t=e}return t},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n,o=String(e),r=o.length,l=-1,i="",a=o.charCodeAt(0);++l<r;){if(0===(t=o.charCodeAt(l)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");i+=t>=1&&t<=31||127==t||0===l&&t>=48&&t<=57||1===l&&t>=48&&t<=57&&45===a?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?o.charAt(l):"\\"+o.charAt(l)}try{n=decodeURIComponent("#"+i)}catch(e){n="#"+i}return n},l=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},i=function(t){return t?(n=t,parseInt(e.getComputedStyle(n).height,10)+t.offsetTop):0;var n},a=function(t,n,o,r){if(n.emitEvents&&"function"==typeof e.CustomEvent){var l=new CustomEvent(t,{bubbles:!0,detail:{anchor:o,toggle:r}});document.dispatchEvent(l)}};return function(s,c){var u,d,f,b,p,m,h={cancelScroll:function(e){cancelAnimationFrame(m),m=null,e||a("scrollCancel",u)},animateScroll:function(o,r,s){var c=n(u||t,s||{}),d="[object Number]"===Object.prototype.toString.call(o),p=d||!o.tagName?null:o;if(d||p){var v=e.pageYOffset;c.header&&!f&&(f=document.querySelector(c.header)),b||(b=i(f));var y,g,j,O=d?o:function(t,n,o,r){var i=0;if(t.offsetParent)do{i+=t.offsetTop,t=t.offsetParent}while(t);return i=Math.max(i-n-o,0),r&&(i=Math.min(i,l()-e.innerHeight)),i}(p,b,parseInt("function"==typeof c.offset?c.offset(o,r):c.offset,10),c.clip),_=O-v,A=l(),w=0,C=function(t,n){var l=e.pageYOffset;if(t==n||l==n||(v<n&&e.innerHeight+l)>=A)return h.cancelScroll(!0),function(t,n,o){0===t&&document.body.focus(),o||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))}(o,n,d),a("scrollStop",c,o,r),y=null,m=null,!0};0===e.pageYOffset&&e.scrollTo(0,0),function(e,t,n){d||history.pushState&&n.updateURL&&history.pushState({smoothScroll:JSON.stringify(n),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id)}(o,0,c),a("scrollStart",c,o,r),h.cancelScroll(!0),e.requestAnimationFrame(function t(n){var o,r,l;y||(y=n),g=(w+=n-y)/parseInt(c.speed,10),j=v+_*(o=c,r=g=g>1?1:g,"easeInQuad"===o.easing&&(l=r*r),"easeOutQuad"===o.easing&&(l=r*(2-r)),"easeInOutQuad"===o.easing&&(l=r<.5?2*r*r:(4-2*r)*r-1),"easeInCubic"===o.easing&&(l=r*r*r),"easeOutCubic"===o.easing&&(l=--r*r*r+1),"easeInOutCubic"===o.easing&&(l=r<.5?4*r*r*r:(r-1)*(2*r-2)*(2*r-2)+1),"easeInQuart"===o.easing&&(l=r*r*r*r),"easeOutQuart"===o.easing&&(l=1- --r*r*r*r),"easeInOutQuart"===o.easing&&(l=r<.5?8*r*r*r*r:1-8*--r*r*r*r),"easeInQuint"===o.easing&&(l=r*r*r*r*r),"easeOutQuint"===o.easing&&(l=1+--r*r*r*r*r),"easeInOutQuint"===o.easing&&(l=r<.5?16*r*r*r*r*r:1+16*--r*r*r*r*r),o.customEasing&&(l=o.customEasing(r)),l||r),e.scrollTo(0,Math.floor(j)),C(j,O)||(m=e.requestAnimationFrame(t),y=n)})}}},v=function(t){if(!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)&&0===t.button&&!t.metaKey&&!t.ctrlKey&&"closest"in t.target&&(d=t.target.closest(s))&&"a"===d.tagName.toLowerCase()&&!t.target.closest(u.ignore)&&d.hostname===e.location.hostname&&d.pathname===e.location.pathname&&/#/.test(d.href)){var n=r(o(d.hash)),l=u.topOnEmptyHash&&"#"===n?document.documentElement:document.querySelector(n);(l=l||"#top"!==n?l:document.documentElement)&&(t.preventDefault(),h.animateScroll(l,d))}},y=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(u)&&history.state.anchor){var t=document.querySelector(r(o(history.state.anchor)));t&&h.animateScroll(t,null,{updateURL:!1})}},g=function(e){p||(p=setTimeout(function(){p=null,b=i(f)},66))};return h.destroy=function(){u&&(document.removeEventListener("click",v,!1),e.removeEventListener("resize",g,!1),e.removeEventListener("popstate",y,!1),h.cancelScroll(),u=null,d=null,f=null,b=null,p=null,m=null)},h.init=function(o){if(!("querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";h.destroy(),u=n(t,o||{}),f=u.header?document.querySelector(u.header):null,b=i(f),document.addEventListener("click",v,!1),f&&e.addEventListener("resize",g,!1),u.updateURL&&u.popstate&&e.addEventListener("popstate",y,!1)},h.init(c),h}}(r)}.apply(t,[]))||(e.exports=o)}).call(this,n("./node_modules/webpack/buildin/global.js"))},"./node_modules/stickyfilljs/dist/stickyfill.js":function(e,t){!function(t,n){"use strict";var o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=!1,i=void 0!==t;i&&t.getComputedStyle?(o=n.createElement("div"),["","-webkit-","-moz-","-ms-"].some(function(e){try{o.style.position=e+"sticky"}catch(e){}return""!=o.style.position})&&(l=!0)):l=!0;var a=!1,s="undefined"!=typeof ShadowRoot,c={top:null,left:null},u=[];function d(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}function f(e){return parseFloat(e)||0}function b(e){for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;return t}var p=function(){function e(t){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),!(t instanceof HTMLElement))throw new Error("First argument must be HTMLElement");if(u.some(function(e){return e._node===t}))throw new Error("Stickyfill is already applied to this node");this._node=t,this._stickyMode=null,this._active=!1,u.push(this),this.refresh()}return r(e,[{key:"refresh",value:function(){if(!l&&!this._removed){this._active&&this._deactivate();var e=this._node,o=getComputedStyle(e),r={position:o.position,top:o.top,display:o.display,marginTop:o.marginTop,marginBottom:o.marginBottom,marginLeft:o.marginLeft,marginRight:o.marginRight,cssFloat:o.cssFloat};if(!isNaN(parseFloat(r.top))&&"table-cell"!=r.display&&"none"!=r.display){this._active=!0;var i=e.style.position;"sticky"!=o.position&&"-webkit-sticky"!=o.position||(e.style.position="static");var a=e.parentNode,c=s&&a instanceof ShadowRoot?a.host:a,u=e.getBoundingClientRect(),p=c.getBoundingClientRect(),m=getComputedStyle(c);this._parent={node:c,styles:{position:c.style.position},offsetHeight:c.offsetHeight},this._offsetToWindow={left:u.left,right:n.documentElement.clientWidth-u.right},this._offsetToParent={top:u.top-p.top-f(m.borderTopWidth),left:u.left-p.left-f(m.borderLeftWidth),right:-u.right+p.right-f(m.borderRightWidth)},this._styles={position:i,top:e.style.top,bottom:e.style.bottom,left:e.style.left,right:e.style.right,width:e.style.width,marginTop:e.style.marginTop,marginLeft:e.style.marginLeft,marginRight:e.style.marginRight};var h=f(r.top);this._limits={start:u.top+t.pageYOffset-h,end:p.top+t.pageYOffset+c.offsetHeight-f(m.borderBottomWidth)-e.offsetHeight-h-f(r.marginBottom)};var v=m.position;"absolute"!=v&&"relative"!=v&&(c.style.position="relative"),this._recalcPosition();var y=this._clone={};y.node=n.createElement("div"),d(y.node.style,{width:u.right-u.left+"px",height:u.bottom-u.top+"px",marginTop:r.marginTop,marginBottom:r.marginBottom,marginLeft:r.marginLeft,marginRight:r.marginRight,cssFloat:r.cssFloat,padding:0,border:0,borderSpacing:0,fontSize:"1em",position:"static"}),a.insertBefore(y.node,e),y.docOffsetTop=b(y.node)}}}},{key:"_recalcPosition",value:function(){if(this._active&&!this._removed){var e=c.top<=this._limits.start?"start":c.top>=this._limits.end?"end":"middle";if(this._stickyMode!=e){switch(e){case"start":d(this._node.style,{position:"absolute",left:this._offsetToParent.left+"px",right:this._offsetToParent.right+"px",top:this._offsetToParent.top+"px",bottom:"auto",width:"auto",marginLeft:0,marginRight:0,marginTop:0});break;case"middle":d(this._node.style,{position:"fixed",left:this._offsetToWindow.left+"px",right:this._offsetToWindow.right+"px",top:this._styles.top,bottom:"auto",width:"auto",marginLeft:0,marginRight:0,marginTop:0});break;case"end":d(this._node.style,{position:"absolute",left:this._offsetToParent.left+"px",right:this._offsetToParent.right+"px",top:"auto",bottom:0,width:"auto",marginLeft:0,marginRight:0})}this._stickyMode=e}}}},{key:"_fastCheck",value:function(){this._active&&!this._removed&&(Math.abs(b(this._clone.node)-this._clone.docOffsetTop)>1||Math.abs(this._parent.node.offsetHeight-this._parent.offsetHeight)>1)&&this.refresh()}},{key:"_deactivate",value:function(){var e=this;this._active&&!this._removed&&(this._clone.node.parentNode.removeChild(this._clone.node),delete this._clone,d(this._node.style,this._styles),delete this._styles,u.some(function(t){return t!==e&&t._parent&&t._parent.node===e._parent.node})||d(this._parent.node.style,this._parent.styles),delete this._parent,this._stickyMode=null,this._active=!1,delete this._offsetToWindow,delete this._offsetToParent,delete this._limits)}},{key:"remove",value:function(){var e=this;this._deactivate(),u.some(function(t,n){if(t._node===e._node)return u.splice(n,1),!0}),this._removed=!0}}]),e}(),m={stickies:u,Sticky:p,forceSticky:function(){l=!1,h(),this.refreshAll()},addOne:function(e){if(!(e instanceof HTMLElement)){if(!e.length||!e[0])return;e=e[0]}for(var t=0;t<u.length;t++)if(u[t]._node===e)return u[t];return new p(e)},add:function(e){if(e instanceof HTMLElement&&(e=[e]),e.length){for(var t=[],n=function(n){var o=e[n];return o instanceof HTMLElement?u.some(function(e){if(e._node===o)return t.push(e),!0})?"continue":void t.push(new p(o)):(t.push(void 0),"continue")},o=0;o<e.length;o++)n(o);return t}},refreshAll:function(){u.forEach(function(e){return e.refresh()})},removeOne:function(e){if(!(e instanceof HTMLElement)){if(!e.length||!e[0])return;e=e[0]}u.some(function(t){if(t._node===e)return t.remove(),!0})},remove:function(e){if(e instanceof HTMLElement&&(e=[e]),e.length)for(var t=function(t){var n=e[t];u.some(function(e){if(e._node===n)return e.remove(),!0})},n=0;n<e.length;n++)t(n)},removeAll:function(){for(;u.length;)u[0].remove()}};function h(){if(!a){a=!0,l(),t.addEventListener("scroll",l),t.addEventListener("resize",m.refreshAll),t.addEventListener("orientationchange",m.refreshAll);var e=void 0,o=void 0,r=void 0;"hidden"in n?(o="hidden",r="visibilitychange"):"webkitHidden"in n&&(o="webkitHidden",r="webkitvisibilitychange"),r?(n[o]||i(),n.addEventListener(r,function(){n[o]?clearInterval(e):i()})):i()}function l(){t.pageXOffset!=c.left?(c.top=t.pageYOffset,c.left=t.pageXOffset,m.refreshAll()):t.pageYOffset!=c.top&&(c.top=t.pageYOffset,c.left=t.pageXOffset,u.forEach(function(e){return e._recalcPosition()}))}function i(){e=setInterval(function(){u.forEach(function(e){return e._fastCheck()})},500)}}l||h(),void 0!==e&&e.exports?e.exports=m:i&&(t.Stickyfill=m)}(window,document)},"./node_modules/webpack/buildin/amd-options.js":function(e,t){(function(t){e.exports=t}).call(this,{})},"./node_modules/webpack/buildin/global.js":function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o;o=function(){return this}();try{o=o||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":n(window))&&(o=window)}e.exports=o},"./node_modules/webpack/buildin/harmony-module.js":function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},"./node_modules/webpack/buildin/module.js":function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},"./src/global/global.scss":function(e,t,n){},0:function(e,t,n){n("./node_modules/@bolt/global/styles/index.scss"),n("./node_modules/@bolt/global/styles/index.js"),n("./node_modules/@bolt/components-action-blocks/src/action-blocks.scss"),n("./node_modules/@bolt/components-background/src/background.scss"),n("./node_modules/@bolt/components-background-shapes/src/background-shapes.scss"),n("./node_modules/@bolt/components-band/src/band.scss"),n("./node_modules/@bolt/components-band/src/band.js"),n("./node_modules/@bolt/components-blockquote/src/blockquote.scss"),n("./node_modules/@bolt/components-breadcrumb/src/breadcrumb.scss"),n("./node_modules/@bolt/components-button/src/button.scss?384f"),n("./node_modules/@bolt/components-button/src/button.js"),n("./node_modules/@bolt/components-button-group/src/button-group.scss"),n("./node_modules/@bolt/components-card/src/card.scss"),n("./node_modules/@bolt/components-chip/src/chip.scss"),n("./node_modules/@bolt/components-device-viewer/src/device-viewer.scss"),n("./node_modules/@bolt/components-device-viewer/src/device-viewer.js"),n("./node_modules/@bolt/components-figure/src/figure.scss"),n("./node_modules/@bolt/components-form/src/form.scss"),n("./node_modules/@bolt/components-form/src/form.js"),n("./node_modules/@bolt/components-grid/src/grid.scss"),n("./node_modules/@bolt/components-headline/src/headline.scss"),n("./node_modules/@bolt/components-icon/src/icon.scss?9a58"),n("./node_modules/@bolt/components-icon/src/icon.js"),n("./node_modules/@bolt/components-icons/src/index.js"),n("./node_modules/@bolt/components-image/src/image.scss"),n("./node_modules/@bolt/components-image/src/image.js"),n("./node_modules/@bolt/components-link/src/link.scss"),n("./node_modules/@bolt/components-list/index.scss"),n("./node_modules/@bolt/components-logo/src/logo.scss"),n("./node_modules/@bolt/components-nav-indicator/nav-indicator.scss"),n("./node_modules/@bolt/components-nav-indicator/index.js"),n("./node_modules/@bolt/components-nav-priority/nav-priority.scss"),n("./node_modules/@bolt/components-nav-priority/index.js"),n("./node_modules/@bolt/components-navbar/src/navbar.scss"),n("./node_modules/@bolt/components-navlink/navlink.scss"),n("./node_modules/@bolt/components-navlink/index.js"),n("./node_modules/@bolt/components-site/site.scss"),n("./node_modules/@bolt/components-teaser/src/teaser.scss"),n("./node_modules/@bolt/components-video/src/video.scss"),n("./node_modules/@bolt/components-video/src/video.js"),n("./node_modules/@bolt/components-sticky/src/sticky.scss"),n("./node_modules/@bolt/components-sticky/src/sticky.js"),n("./node_modules/@bolt/components-smooth-scroll/src/smooth-scroll.js"),n("./node_modules/@bolt/components-unordered-list/src/unordered-list.scss"),n("./node_modules/@bolt/components-share/index.scss"),n("./node_modules/@bolt/components-tooltip/src/tooltip.scss?308c"),n("./node_modules/@bolt/components-tooltip/src/tooltip.js"),n("./node_modules/@bolt/components-copy-to-clipboard/src/copy-to-clipboard.scss"),n("./node_modules/@bolt/components-copy-to-clipboard/src/copy-to-clipboard.js"),n("./node_modules/@bolt/components-block-list/src/block-list.scss?85d4"),n("./node_modules/@bolt/components-block-list/src/block-list.js"),e.exports=n("./src/global/global.scss")}});;
;
!function(t){var e={};function o(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/themes/custom/pegawww_theme/dist/",o(o.s=11)}({"./src/components/bolt-hacks/bolt-smooth-scroll.es6.js":function(t,e){!function(t,e,o){"use strict";e.behaviors.boltButtonSmoothScroll={attach:function(e){o('bolt-button[url^="#"]',e).once("smoothScroll").click(function(e){if(!o(this).offsetParent("div.c-bolt-search-filters__trigger")){e.preventDefault();var r=o(this).attr("url").replace("#",""),n=t.getElementById(r);scroll.animateScroll(n)}})}}}(document,Drupal,jQuery)},11:function(t,e,o){t.exports=o("./src/components/bolt-hacks/bolt-smooth-scroll.es6.js")}});;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout = void 0;
  var result = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
};;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  var offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  function getRawOffset(el, edge) {
    var $el = $(el);
    var documentElement = document.documentElement;
    var displacement = 0;
    var horizontal = edge === 'left' || edge === 'right';

    var placement = $el.offset()[horizontal ? 'left' : 'top'];

    placement -= window['scroll' + (horizontal ? 'X' : 'Y')] || document.documentElement['scroll' + (horizontal ? 'Left' : 'Top')] || 0;

    switch (edge) {
      case 'top':
        displacement = placement + $el.outerHeight();
        break;

      case 'left':
        displacement = placement + $el.outerWidth();
        break;

      case 'bottom':
        displacement = documentElement.clientHeight - placement;
        break;

      case 'right':
        displacement = documentElement.clientWidth - placement;
        break;

      default:
        displacement = 0;
    }
    return displacement;
  }

  function calculateOffset(edge) {
    var edgeOffset = 0;
    var displacingElements = document.querySelectorAll('[data-offset-' + edge + ']');
    var n = displacingElements.length;
    for (var i = 0; i < n; i++) {
      var el = displacingElements[i];

      if (el.style.display === 'none') {
        continue;
      }

      var displacement = parseInt(el.getAttribute('data-offset-' + edge), 10);

      if (isNaN(displacement)) {
        displacement = getRawOffset(el, edge);
      }

      edgeOffset = Math.max(edgeOffset, displacement);
    }

    return edgeOffset;
  }

  function calculateOffsets() {
    return {
      top: calculateOffset('top'),
      right: calculateOffset('right'),
      bottom: calculateOffset('bottom'),
      left: calculateOffset('left')
    };
  }

  function displace(broadcast) {
    offsets = calculateOffsets();
    Drupal.displace.offsets = offsets;
    if (typeof broadcast === 'undefined' || broadcast) {
      $(document).trigger('drupalViewportOffsetChange', offsets);
    }
    return offsets;
  }

  Drupal.behaviors.drupalDisplace = {
    attach: function attach() {
      if (this.displaceProcessed) {
        return;
      }
      this.displaceProcessed = true;

      $(window).on('resize.drupalDisplace', debounce(displace, 200));
    }
  };

  Drupal.displace = displace;
  $.extend(Drupal.displace, {
    offsets: offsets,

    calculateOffset: calculateOffset
  });
})(jQuery, Drupal, Drupal.debounce);;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./controlgroup","./checkboxradio","../keycode","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var a,b=this._super()||{};return this.isInput=this.element.is("input"),a=this.element[0].disabled,null!=a&&(b.disabled=a),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(b.label=this.originalLabel),b},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(b){b.keyCode===a.ui.keyCode.SPACE&&(b.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(b,c){var d="iconPosition"!==b,e=d?this.options.iconPosition:c,f="top"===e||"bottom"===e;this.icon?d&&this._removeClass(this.icon,null,this.options.icon):(this.icon=a("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),d&&this._addClass(this.icon,null,c),this._attachIcon(e),f?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=a("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(e))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(a){this.icon[/^(?:end|bottom)/.test(a)?"before":"after"](this.iconSpace)},_attachIcon:function(a){this.element[/^(?:end|bottom)/.test(a)?"append":"prepend"](this.icon)},_setOptions:function(a){var b=void 0===a.showLabel?this.options.showLabel:a.showLabel,c=void 0===a.icon?this.options.icon:a.icon;b||c||(a.showLabel=!0),this._super(a)},_setOption:function(a,b){"icon"===a&&(b?this._updateIcon(a,b):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===a&&this._updateIcon(a,b),"showLabel"===a&&(this._toggleClass("ui-button-icon-only",null,!b),this._updateTooltip()),"label"===a&&(this.isInput?this.element.val(b):(this.element.html(b),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(a,b),"disabled"===a&&(this._toggleClass(null,"ui-state-disabled",b),this.element[0].disabled=b,b&&this.element.blur())},refresh:function(){var a=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");a!==this.options.disabled&&this._setOptions({disabled:a}),this._updateTooltip()}}),a.uiBackCompat!==!1&&(a.widget("ui.button",a.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(a,b){return"text"===a?void this._super("showLabel",b):("showLabel"===a&&(this.options.text=b),"icon"===a&&(this.options.icons.primary=b),"icons"===a&&(b.primary?(this._super("icon",b.primary),this._super("iconPosition","beginning")):b.secondary&&(this._super("icon",b.secondary),this._super("iconPosition","end"))),void this._superApply(arguments))}}),a.fn.button=function(b){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?b.apply(this,arguments):(a.ui.checkboxradio||a.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}(a.fn.button),a.fn.buttonset=function(){return a.ui.controlgroup||a.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),a.ui.button});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../ie","../version","../widget"],a):a(jQuery)}(function(a){var b=!1;return a(document).on("mouseup",function(){b=!1}),a.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.on("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).on("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(c){if(!b){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(c),this._mouseDownEvent=c;var d=this,e=1===c.which,f=!("string"!=typeof this.options.cancel||!c.target.nodeName)&&a(c.target).closest(this.options.cancel).length;return!(e&&!f&&this._mouseCapture(c))||(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(c)&&this._mouseDelayMet(c)&&(this._mouseStarted=this._mouseStart(c)!==!1,!this._mouseStarted)?(c.preventDefault(),!0):(!0===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),c.preventDefault(),b=!0,!0))}},_mouseMove:function(b){if(this._mouseMoved){if(a.ui.ie&&(!document.documentMode||document.documentMode<9)&&!b.button)return this._mouseUp(b);if(!b.which)if(b.originalEvent.altKey||b.originalEvent.ctrlKey||b.originalEvent.metaKey||b.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(b)}return(b.which||b.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted)},_mouseUp:function(c){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,c.target===this._mouseDownEvent.target&&a.data(c.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(c)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,b=!1,c.preventDefault()},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./mouse","../data","../plugin","../safe-active-element","../safe-blur","../scroll-parent","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.draggable",a.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(a,b){this._super(a,b),"handle"===a&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?void(this.destroyOnClear=!0):(this._removeHandleClassName(),void this._mouseDestroy())},_mouseCapture:function(b){var c=this.options;return!(this.helper||c.disabled||a(b.target).closest(".ui-resizable-handle").length>0)&&(this.handle=this._getHandle(b),!!this.handle&&(this._blurActiveElement(b),this._blockFrames(c.iframeFix===!0?"iframe":c.iframeFix),!0))},_blockFrames:function(b){this.iframeBlocks=this.document.find(b).map(function(){var b=a(this);return a("<div>").css("position","absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(b){var c=a.ui.safeActiveElement(this.document[0]),d=a(b.target);d.closest(c).length||a.ui.safeBlur(c)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===a(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(b),this.originalPosition=this.position=this._generatePosition(b,!1),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_refreshOffsets:function(a){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:a.pageX-this.offset.left,top:a.pageY-this.offset.top}},_mouseDrag:function(b,c){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(b,!0),this.positionAbs=this._convertPositionTo("absolute"),!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp(new a.Event("mouseup",b)),!1;this.position=d.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=this,d=!1;return a.ui.ddmanager&&!this.options.dropBehaviour&&(d=a.ui.ddmanager.drop(this,b)),this.dropped&&(d=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!d||"valid"===this.options.revert&&d||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d)?a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",b)!==!1&&c._clear()}):this._trigger("stop",b)!==!1&&this._clear(),!1},_mouseUp:function(b){return this._unblockFrames(),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),this.handleElement.is(b.target)&&this.element.trigger("focus"),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new a.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(b){return!this.options.handle||!!a(b.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper),e=d?a(c.helper.apply(this.element[0],[b])):"clone"===c.helper?this.element.clone().removeAttr("id"):this.element;return e.parents("body").length||e.appendTo("parent"===c.appendTo?this.element[0].parentNode:c.appendTo),d&&e[0]===this.element[0]&&this._setPositionRelative(),e[0]===this.element[0]||/(fixed|absolute)/.test(e.css("position"))||e.css("position","absolute"),e},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(b){"string"==typeof b&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_isRootNode:function(a){return/(html|body)/i.test(a.tagName)||a===this.document[0]},_getParentOffset:function(){var b=this.offsetParent.offset(),c=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==c&&a.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(b={top:0,left:0}),{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var a=this.element.position(),b=this._isRootNode(this.scrollParent[0]);return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+(b?0:this.scrollParent.scrollTop()),left:a.left-(parseInt(this.helper.css("left"),10)||0)+(b?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b,c,d,e=this.options,f=this.document[0];return this.relativeContainer=null,e.containment?"window"===e.containment?void(this.containment=[a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,a(window).scrollLeft()+a(window).width()-this.helperProportions.width-this.margins.left,a(window).scrollTop()+(a(window).height()||f.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===e.containment?void(this.containment=[0,0,a(f).width()-this.helperProportions.width-this.margins.left,(a(f).height()||f.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):e.containment.constructor===Array?void(this.containment=e.containment):("parent"===e.containment&&(e.containment=this.helper[0].parentNode),c=a(e.containment),d=c[0],void(d&&(b=/(scroll|auto)/.test(c.css("overflow")),this.containment=[(parseInt(c.css("borderLeftWidth"),10)||0)+(parseInt(c.css("paddingLeft"),10)||0),(parseInt(c.css("borderTopWidth"),10)||0)+(parseInt(c.css("paddingTop"),10)||0),(b?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(c.css("borderRightWidth"),10)||0)-(parseInt(c.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(b?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(c.css("borderBottomWidth"),10)||0)-(parseInt(c.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=c))):void(this.containment=null)},_convertPositionTo:function(a,b){b||(b=this.position);var c="absolute"===a?1:-1,d=this._isRootNode(this.scrollParent[0]);return{top:b.top+this.offset.relative.top*c+this.offset.parent.top*c-("fixed"===this.cssPosition?-this.offset.scroll.top:d?0:this.offset.scroll.top)*c,left:b.left+this.offset.relative.left*c+this.offset.parent.left*c-("fixed"===this.cssPosition?-this.offset.scroll.left:d?0:this.offset.scroll.left)*c}},_generatePosition:function(a,b){var c,d,e,f,g=this.options,h=this._isRootNode(this.scrollParent[0]),i=a.pageX,j=a.pageY;return h&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),b&&(this.containment&&(this.relativeContainer?(d=this.relativeContainer.offset(),c=[this.containment[0]+d.left,this.containment[1]+d.top,this.containment[2]+d.left,this.containment[3]+d.top]):c=this.containment,a.pageX-this.offset.click.left<c[0]&&(i=c[0]+this.offset.click.left),a.pageY-this.offset.click.top<c[1]&&(j=c[1]+this.offset.click.top),a.pageX-this.offset.click.left>c[2]&&(i=c[2]+this.offset.click.left),a.pageY-this.offset.click.top>c[3]&&(j=c[3]+this.offset.click.top)),g.grid&&(e=g.grid[1]?this.originalPageY+Math.round((j-this.originalPageY)/g.grid[1])*g.grid[1]:this.originalPageY,j=c?e-this.offset.click.top>=c[1]||e-this.offset.click.top>c[3]?e:e-this.offset.click.top>=c[1]?e-g.grid[1]:e+g.grid[1]:e,f=g.grid[0]?this.originalPageX+Math.round((i-this.originalPageX)/g.grid[0])*g.grid[0]:this.originalPageX,i=c?f-this.offset.click.left>=c[0]||f-this.offset.click.left>c[2]?f:f-this.offset.click.left>=c[0]?f-g.grid[0]:f+g.grid[0]:f),"y"===g.axis&&(i=this.originalPageX),"x"===g.axis&&(j=this.originalPageY)),{top:j-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:h?0:this.offset.scroll.top),left:i-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:h?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d,this],!0),/^(drag|start|stop)/.test(b)&&(this.positionAbs=this._convertPositionTo("absolute"),d.offset=this.positionAbs),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c,d){var e=a.extend({},c,{item:d.element});d.sortables=[],a(d.options.connectToSortable).each(function(){var c=a(this).sortable("instance");c&&!c.options.disabled&&(d.sortables.push(c),c.refreshPositions(),c._trigger("activate",b,e))})},stop:function(b,c,d){var e=a.extend({},c,{item:d.element});d.cancelHelperRemoval=!1,a.each(d.sortables,function(){var a=this;a.isOver?(a.isOver=0,d.cancelHelperRemoval=!0,a.cancelHelperRemoval=!1,a._storedCSS={position:a.placeholder.css("position"),top:a.placeholder.css("top"),left:a.placeholder.css("left")},a._mouseStop(b),a.options.helper=a.options._helper):(a.cancelHelperRemoval=!0,a._trigger("deactivate",b,e))})},drag:function(b,c,d){a.each(d.sortables,function(){var e=!1,f=this;f.positionAbs=d.positionAbs,f.helperProportions=d.helperProportions,f.offset.click=d.offset.click,f._intersectsWith(f.containerCache)&&(e=!0,a.each(d.sortables,function(){return this.positionAbs=d.positionAbs,this.helperProportions=d.helperProportions,this.offset.click=d.offset.click,this!==f&&this._intersectsWith(this.containerCache)&&a.contains(f.element[0],this.element[0])&&(e=!1),e})),e?(f.isOver||(f.isOver=1,d._parent=c.helper.parent(),f.currentItem=c.helper.appendTo(f.element).data("ui-sortable-item",!0),f.options._helper=f.options.helper,f.options.helper=function(){return c.helper[0]},b.target=f.currentItem[0],f._mouseCapture(b,!0),f._mouseStart(b,!0,!0),f.offset.click.top=d.offset.click.top,f.offset.click.left=d.offset.click.left,f.offset.parent.left-=d.offset.parent.left-f.offset.parent.left,f.offset.parent.top-=d.offset.parent.top-f.offset.parent.top,d._trigger("toSortable",b),d.dropped=f.element,a.each(d.sortables,function(){this.refreshPositions()}),d.currentItem=d.element,f.fromOutside=d),f.currentItem&&(f._mouseDrag(b),c.position=f.position)):f.isOver&&(f.isOver=0,f.cancelHelperRemoval=!0,f.options._revert=f.options.revert,f.options.revert=!1,f._trigger("out",b,f._uiHash(f)),f._mouseStop(b,!0),f.options.revert=f.options._revert,f.options.helper=f.options._helper,f.placeholder&&f.placeholder.remove(),c.helper.appendTo(d._parent),d._refreshOffsets(b),c.position=d._generatePosition(b,!0),d._trigger("fromSortable",b),d.dropped=!1,a.each(d.sortables,function(){this.refreshPositions()}))})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c,d){var e=a("body"),f=d.options;e.css("cursor")&&(f._cursor=e.css("cursor")),e.css("cursor",f.cursor)},stop:function(b,c,d){var e=d.options;e._cursor&&a("body").css("cursor",e._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c,d){var e=a(c.helper),f=d.options;e.css("opacity")&&(f._opacity=e.css("opacity")),e.css("opacity",f.opacity)},stop:function(b,c,d){var e=d.options;e._opacity&&a(c.helper).css("opacity",e._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(a,b,c){c.scrollParentNotHidden||(c.scrollParentNotHidden=c.helper.scrollParent(!1)),c.scrollParentNotHidden[0]!==c.document[0]&&"HTML"!==c.scrollParentNotHidden[0].tagName&&(c.overflowOffset=c.scrollParentNotHidden.offset())},drag:function(b,c,d){var e=d.options,f=!1,g=d.scrollParentNotHidden[0],h=d.document[0];g!==h&&"HTML"!==g.tagName?(e.axis&&"x"===e.axis||(d.overflowOffset.top+g.offsetHeight-b.pageY<e.scrollSensitivity?g.scrollTop=f=g.scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(g.scrollTop=f=g.scrollTop-e.scrollSpeed)),e.axis&&"y"===e.axis||(d.overflowOffset.left+g.offsetWidth-b.pageX<e.scrollSensitivity?g.scrollLeft=f=g.scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(g.scrollLeft=f=g.scrollLeft-e.scrollSpeed))):(e.axis&&"x"===e.axis||(b.pageY-a(h).scrollTop()<e.scrollSensitivity?f=a(h).scrollTop(a(h).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(h).scrollTop())<e.scrollSensitivity&&(f=a(h).scrollTop(a(h).scrollTop()+e.scrollSpeed))),e.axis&&"y"===e.axis||(b.pageX-a(h).scrollLeft()<e.scrollSensitivity?f=a(h).scrollLeft(a(h).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(h).scrollLeft())<e.scrollSensitivity&&(f=a(h).scrollLeft(a(h).scrollLeft()+e.scrollSpeed)))),f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c,d){var e=d.options;d.snapElements=[],a(e.snap.constructor!==String?e.snap.items||":data(ui-draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!==d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c,d){var e,f,g,h,i,j,k,l,m,n,o=d.options,p=o.snapTolerance,q=c.offset.left,r=q+d.helperProportions.width,s=c.offset.top,t=s+d.helperProportions.height;for(m=d.snapElements.length-1;m>=0;m--)i=d.snapElements[m].left-d.margins.left,j=i+d.snapElements[m].width,k=d.snapElements[m].top-d.margins.top,l=k+d.snapElements[m].height,r<i-p||q>j+p||t<k-p||s>l+p||!a.contains(d.snapElements[m].item.ownerDocument,d.snapElements[m].item)?(d.snapElements[m].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[m].item})),d.snapElements[m].snapping=!1):("inner"!==o.snapMode&&(e=Math.abs(k-t)<=p,f=Math.abs(l-s)<=p,g=Math.abs(i-r)<=p,h=Math.abs(j-q)<=p,e&&(c.position.top=d._convertPositionTo("relative",{top:k-d.helperProportions.height,left:0}).top),f&&(c.position.top=d._convertPositionTo("relative",{top:l,left:0}).top),g&&(c.position.left=d._convertPositionTo("relative",{top:0,left:i-d.helperProportions.width}).left),h&&(c.position.left=d._convertPositionTo("relative",{top:0,left:j}).left)),n=e||f||g||h,"outer"!==o.snapMode&&(e=Math.abs(k-s)<=p,f=Math.abs(l-t)<=p,g=Math.abs(i-q)<=p,h=Math.abs(j-r)<=p,e&&(c.position.top=d._convertPositionTo("relative",{top:k,left:0}).top),f&&(c.position.top=d._convertPositionTo("relative",{top:l-d.helperProportions.height,left:0}).top),g&&(c.position.left=d._convertPositionTo("relative",{top:0,left:i}).left),h&&(c.position.left=d._convertPositionTo("relative",{top:0,left:j-d.helperProportions.width}).left)),!d.snapElements[m].snapping&&(e||f||g||h||n)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[m].item})),d.snapElements[m].snapping=e||f||g||h||n)}}),a.ui.plugin.add("draggable","stack",{start:function(b,c,d){var e,f=d.options,g=a.makeArray(a(f.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});g.length&&(e=parseInt(a(g[0]).css("zIndex"),10)||0,a(g).each(function(b){a(this).css("zIndex",e+b)}),this.css("zIndex",e+g.length))}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c,d){var e=a(c.helper),f=d.options;e.css("zIndex")&&(f._zIndex=e.css("zIndex")),e.css("zIndex",f.zIndex)},stop:function(b,c,d){var e=d.options;e._zIndex&&a(c.helper).css("zIndex",e._zIndex)}}),a.ui.draggable});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return function(){function b(a,b,c){return[parseFloat(a[0])*(l.test(a[0])?b/100:1),parseFloat(a[1])*(l.test(a[1])?c/100:1)]}function c(b,c){return parseInt(a.css(b,c),10)||0}function d(b){var c=b[0];return 9===c.nodeType?{width:b.width(),height:b.height(),offset:{top:0,left:0}}:a.isWindow(c)?{width:b.width(),height:b.height(),offset:{top:b.scrollTop(),left:b.scrollLeft()}}:c.preventDefault?{width:0,height:0,offset:{top:c.pageY,left:c.pageX}}:{width:b.outerWidth(),height:b.outerHeight(),offset:b.offset()}}var e,f=Math.max,g=Math.abs,h=/left|center|right/,i=/top|center|bottom/,j=/[\+\-]\d+(\.[\d]+)?%?/,k=/^\w+/,l=/%$/,m=a.fn.position;a.position={scrollbarWidth:function(){if(void 0!==e)return e;var b,c,d=a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),f=d.children()[0];return a("body").append(d),b=f.offsetWidth,d.css("overflow","scroll"),c=f.offsetWidth,b===c&&(c=d[0].clientWidth),d.remove(),e=b-c},getScrollInfo:function(b){var c=b.isWindow||b.isDocument?"":b.element.css("overflow-x"),d=b.isWindow||b.isDocument?"":b.element.css("overflow-y"),e="scroll"===c||"auto"===c&&b.width<b.element[0].scrollWidth,f="scroll"===d||"auto"===d&&b.height<b.element[0].scrollHeight;return{width:f?a.position.scrollbarWidth():0,height:e?a.position.scrollbarWidth():0}},getWithinInfo:function(b){var c=a(b||window),d=a.isWindow(c[0]),e=!!c[0]&&9===c[0].nodeType,f=!d&&!e;return{element:c,isWindow:d,isDocument:e,offset:f?a(b).offset():{left:0,top:0},scrollLeft:c.scrollLeft(),scrollTop:c.scrollTop(),width:c.outerWidth(),height:c.outerHeight()}}},a.fn.position=function(e){if(!e||!e.of)return m.apply(this,arguments);e=a.extend({},e);var l,n,o,p,q,r,s=a(e.of),t=a.position.getWithinInfo(e.within),u=a.position.getScrollInfo(t),v=(e.collision||"flip").split(" "),w={};return r=d(s),s[0].preventDefault&&(e.at="left top"),n=r.width,o=r.height,p=r.offset,q=a.extend({},p),a.each(["my","at"],function(){var a,b,c=(e[this]||"").split(" ");1===c.length&&(c=h.test(c[0])?c.concat(["center"]):i.test(c[0])?["center"].concat(c):["center","center"]),c[0]=h.test(c[0])?c[0]:"center",c[1]=i.test(c[1])?c[1]:"center",a=j.exec(c[0]),b=j.exec(c[1]),w[this]=[a?a[0]:0,b?b[0]:0],e[this]=[k.exec(c[0])[0],k.exec(c[1])[0]]}),1===v.length&&(v[1]=v[0]),"right"===e.at[0]?q.left+=n:"center"===e.at[0]&&(q.left+=n/2),"bottom"===e.at[1]?q.top+=o:"center"===e.at[1]&&(q.top+=o/2),l=b(w.at,n,o),q.left+=l[0],q.top+=l[1],this.each(function(){var d,h,i=a(this),j=i.outerWidth(),k=i.outerHeight(),m=c(this,"marginLeft"),r=c(this,"marginTop"),x=j+m+c(this,"marginRight")+u.width,y=k+r+c(this,"marginBottom")+u.height,z=a.extend({},q),A=b(w.my,i.outerWidth(),i.outerHeight());"right"===e.my[0]?z.left-=j:"center"===e.my[0]&&(z.left-=j/2),"bottom"===e.my[1]?z.top-=k:"center"===e.my[1]&&(z.top-=k/2),z.left+=A[0],z.top+=A[1],d={marginLeft:m,marginTop:r},a.each(["left","top"],function(b,c){a.ui.position[v[b]]&&a.ui.position[v[b]][c](z,{targetWidth:n,targetHeight:o,elemWidth:j,elemHeight:k,collisionPosition:d,collisionWidth:x,collisionHeight:y,offset:[l[0]+A[0],l[1]+A[1]],my:e.my,at:e.at,within:t,elem:i})}),e.using&&(h=function(a){var b=p.left-z.left,c=b+n-j,d=p.top-z.top,h=d+o-k,l={target:{element:s,left:p.left,top:p.top,width:n,height:o},element:{element:i,left:z.left,top:z.top,width:j,height:k},horizontal:c<0?"left":b>0?"right":"center",vertical:h<0?"top":d>0?"bottom":"middle"};n<j&&g(b+c)<n&&(l.horizontal="center"),o<k&&g(d+h)<o&&(l.vertical="middle"),f(g(b),g(c))>f(g(d),g(h))?l.important="horizontal":l.important="vertical",e.using.call(this,a,l)}),i.offset(a.extend(z,{using:h}))})},a.ui.position={fit:{left:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollLeft:d.offset.left,g=d.width,h=a.left-b.collisionPosition.marginLeft,i=e-h,j=h+b.collisionWidth-g-e;b.collisionWidth>g?i>0&&j<=0?(c=a.left+i+b.collisionWidth-g-e,a.left+=i-c):j>0&&i<=0?a.left=e:i>j?a.left=e+g-b.collisionWidth:a.left=e:i>0?a.left+=i:j>0?a.left-=j:a.left=f(a.left-h,a.left)},top:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollTop:d.offset.top,g=b.within.height,h=a.top-b.collisionPosition.marginTop,i=e-h,j=h+b.collisionHeight-g-e;b.collisionHeight>g?i>0&&j<=0?(c=a.top+i+b.collisionHeight-g-e,a.top+=i-c):j>0&&i<=0?a.top=e:i>j?a.top=e+g-b.collisionHeight:a.top=e:i>0?a.top+=i:j>0?a.top-=j:a.top=f(a.top-h,a.top)}},flip:{left:function(a,b){var c,d,e=b.within,f=e.offset.left+e.scrollLeft,h=e.width,i=e.isWindow?e.scrollLeft:e.offset.left,j=a.left-b.collisionPosition.marginLeft,k=j-i,l=j+b.collisionWidth-h-i,m="left"===b.my[0]?-b.elemWidth:"right"===b.my[0]?b.elemWidth:0,n="left"===b.at[0]?b.targetWidth:"right"===b.at[0]?-b.targetWidth:0,o=-2*b.offset[0];k<0?(c=a.left+m+n+o+b.collisionWidth-h-f,(c<0||c<g(k))&&(a.left+=m+n+o)):l>0&&(d=a.left-b.collisionPosition.marginLeft+m+n+o-i,(d>0||g(d)<l)&&(a.left+=m+n+o))},top:function(a,b){var c,d,e=b.within,f=e.offset.top+e.scrollTop,h=e.height,i=e.isWindow?e.scrollTop:e.offset.top,j=a.top-b.collisionPosition.marginTop,k=j-i,l=j+b.collisionHeight-h-i,m="top"===b.my[1],n=m?-b.elemHeight:"bottom"===b.my[1]?b.elemHeight:0,o="top"===b.at[1]?b.targetHeight:"bottom"===b.at[1]?-b.targetHeight:0,p=-2*b.offset[1];k<0?(d=a.top+n+o+p+b.collisionHeight-h-f,(d<0||d<g(k))&&(a.top+=n+o+p)):l>0&&(c=a.top-b.collisionPosition.marginTop+n+o+p-i,(c>0||g(c)<l)&&(a.top+=n+o+p))}},flipfit:{left:function(){a.ui.position.flip.left.apply(this,arguments),a.ui.position.fit.left.apply(this,arguments)},top:function(){a.ui.position.flip.top.apply(this,arguments),a.ui.position.fit.top.apply(this,arguments)}}}}(),a.ui.position});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./mouse","../disable-selection","../plugin","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.resizable",a.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(a){return parseFloat(a)||0},_isNumber:function(a){return!isNaN(parseFloat(a))},_hasScroll:function(b,c){if("hidden"===a(b).css("overflow"))return!1;var d=c&&"left"===c?"scrollLeft":"scrollTop",e=!1;return b[d]>0||(b[d]=1,e=b[d]>0,b[d]=0,e)},_create:function(){var b,c=this.options,d=this;this._addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,b={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(b),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(b),this._proportionallyResize()),this._setupHandles(),c.autoHide&&a(this.element).on("mouseenter",function(){c.disabled||(d._removeClass("ui-resizable-autohide"),d._handles.show())}).on("mouseleave",function(){c.disabled||d.resizing||(d._addClass("ui-resizable-autohide"),d._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var b,c=function(b){a(b).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(c(this.element),b=this.element,this.originalElement.css({position:b.css("position"),width:b.outerWidth(),height:b.outerHeight(),top:b.css("top"),left:b.css("left")}).insertAfter(b),b.remove()),this.originalElement.css("resize",this.originalResizeStyle),c(this.originalElement),this},_setOption:function(a,b){switch(this._super(a,b),a){case"handles":this._removeHandles(),this._setupHandles()}},_setupHandles:function(){var b,c,d,e,f,g=this.options,h=this;if(this.handles=g.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=a(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),d=this.handles.split(","),this.handles={},c=0;c<d.length;c++)b=a.trim(d[c]),e="ui-resizable-"+b,f=a("<div>"),this._addClass(f,"ui-resizable-handle "+e),f.css({zIndex:g.zIndex}),this.handles[b]=".ui-resizable-"+b,this.element.append(f);this._renderAxis=function(b){var c,d,e,f;b=b||this.element;for(c in this.handles)this.handles[c].constructor===String?this.handles[c]=this.element.children(this.handles[c]).first().show():(this.handles[c].jquery||this.handles[c].nodeType)&&(this.handles[c]=a(this.handles[c]),this._on(this.handles[c],{mousedown:h._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(d=a(this.handles[c],this.element),f=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth(),e=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join(""),b.css(e,f),this._proportionallyResize()),this._handles=this._handles.add(this.handles[c])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){h.resizing||(this.className&&(f=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),h.axis=f&&f[1]?f[1]:"se")}),g.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(b){var c,d,e=!1;for(c in this.handles)d=a(this.handles[c])[0],(d===b.target||a.contains(d,b.target))&&(e=!0);return!this.options.disabled&&e},_mouseStart:function(b){var c,d,e,f=this.options,g=this.element;return this.resizing=!0,this._renderProxy(),c=this._num(this.helper.css("left")),d=this._num(this.helper.css("top")),f.containment&&(c+=a(f.containment).scrollLeft()||0,d+=a(f.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:c,top:d},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:g.width(),height:g.height()},this.originalSize=this._helper?{width:g.outerWidth(),height:g.outerHeight()}:{width:g.width(),height:g.height()},this.sizeDiff={width:g.outerWidth()-g.width(),height:g.outerHeight()-g.height()},this.originalPosition={left:c,top:d},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio="number"==typeof f.aspectRatio?f.aspectRatio:this.originalSize.width/this.originalSize.height||1,e=a(".ui-resizable-"+this.axis).css("cursor"),a("body").css("cursor","auto"===e?this.axis+"-resize":e),this._addClass("ui-resizable-resizing"),this._propagate("start",b),!0},_mouseDrag:function(b){var c,d,e=this.originalMousePosition,f=this.axis,g=b.pageX-e.left||0,h=b.pageY-e.top||0,i=this._change[f];return this._updatePrevProperties(),!!i&&(c=i.apply(this,[b,g,h]),this._updateVirtualBoundaries(b.shiftKey),(this._aspectRatio||b.shiftKey)&&(c=this._updateRatio(c,b)),c=this._respectSize(c,b),this._updateCache(c),this._propagate("resize",b),d=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),a.isEmptyObject(d)||(this._updatePrevProperties(),this._trigger("resize",b,this.ui()),this._applyChanges()),!1)},_mouseStop:function(b){this.resizing=!1;var c,d,e,f,g,h,i,j=this.options,k=this;return this._helper&&(c=this._proportionallyResizeElements,d=c.length&&/textarea/i.test(c[0].nodeName),e=d&&this._hasScroll(c[0],"left")?0:k.sizeDiff.height,f=d?0:k.sizeDiff.width,g={width:k.helper.width()-f,height:k.helper.height()-e},h=parseFloat(k.element.css("left"))+(k.position.left-k.originalPosition.left)||null,i=parseFloat(k.element.css("top"))+(k.position.top-k.originalPosition.top)||null,j.animate||this.element.css(a.extend(g,{top:i,left:h})),k.helper.height(k.size.height),k.helper.width(k.size.width),this._helper&&!j.animate&&this._proportionallyResize()),a("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var a={};return this.position.top!==this.prevPosition.top&&(a.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(a.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(a.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(a.height=this.size.height+"px"),this.helper.css(a),a},_updateVirtualBoundaries:function(a){var b,c,d,e,f,g=this.options;f={minWidth:this._isNumber(g.minWidth)?g.minWidth:0,maxWidth:this._isNumber(g.maxWidth)?g.maxWidth:1/0,minHeight:this._isNumber(g.minHeight)?g.minHeight:0,maxHeight:this._isNumber(g.maxHeight)?g.maxHeight:1/0},(this._aspectRatio||a)&&(b=f.minHeight*this.aspectRatio,d=f.minWidth/this.aspectRatio,c=f.maxHeight*this.aspectRatio,e=f.maxWidth/this.aspectRatio,b>f.minWidth&&(f.minWidth=b),d>f.minHeight&&(f.minHeight=d),c<f.maxWidth&&(f.maxWidth=c),e<f.maxHeight&&(f.maxHeight=e)),this._vBoundaries=f},_updateCache:function(a){this.offset=this.helper.offset(),this._isNumber(a.left)&&(this.position.left=a.left),this._isNumber(a.top)&&(this.position.top=a.top),this._isNumber(a.height)&&(this.size.height=a.height),this._isNumber(a.width)&&(this.size.width=a.width)},_updateRatio:function(a){var b=this.position,c=this.size,d=this.axis;return this._isNumber(a.height)?a.width=a.height*this.aspectRatio:this._isNumber(a.width)&&(a.height=a.width/this.aspectRatio),"sw"===d&&(a.left=b.left+(c.width-a.width),a.top=null),"nw"===d&&(a.top=b.top+(c.height-a.height),a.left=b.left+(c.width-a.width)),a},_respectSize:function(a){var b=this._vBoundaries,c=this.axis,d=this._isNumber(a.width)&&b.maxWidth&&b.maxWidth<a.width,e=this._isNumber(a.height)&&b.maxHeight&&b.maxHeight<a.height,f=this._isNumber(a.width)&&b.minWidth&&b.minWidth>a.width,g=this._isNumber(a.height)&&b.minHeight&&b.minHeight>a.height,h=this.originalPosition.left+this.originalSize.width,i=this.originalPosition.top+this.originalSize.height,j=/sw|nw|w/.test(c),k=/nw|ne|n/.test(c);return f&&(a.width=b.minWidth),g&&(a.height=b.minHeight),d&&(a.width=b.maxWidth),e&&(a.height=b.maxHeight),f&&j&&(a.left=h-b.minWidth),d&&j&&(a.left=h-b.maxWidth),g&&k&&(a.top=i-b.minHeight),e&&k&&(a.top=i-b.maxHeight),a.width||a.height||a.left||!a.top?a.width||a.height||a.top||!a.left||(a.left=null):a.top=null,a},_getPaddingPlusBorderDimensions:function(a){for(var b=0,c=[],d=[a.css("borderTopWidth"),a.css("borderRightWidth"),a.css("borderBottomWidth"),a.css("borderLeftWidth")],e=[a.css("paddingTop"),a.css("paddingRight"),a.css("paddingBottom"),a.css("paddingLeft")];b<4;b++)c[b]=parseFloat(d[b])||0,c[b]+=parseFloat(e[b])||0;return{height:c[0]+c[2],width:c[1]+c[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var a,b=0,c=this.helper||this.element;b<this._proportionallyResizeElements.length;b++)a=this._proportionallyResizeElements[b],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(a)),a.css({height:c.height()-this.outerDimensions.height||0,width:c.width()-this.outerDimensions.width||0})},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset(),this._helper?(this.helper=this.helper||a("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(a,b){return{width:this.originalSize.width+b}},w:function(a,b){var c=this.originalSize,d=this.originalPosition;return{left:d.left+b,width:c.width-b}},n:function(a,b,c){var d=this.originalSize,e=this.originalPosition;return{top:e.top+c,height:d.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),"resize"!==b&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.ui.plugin.add("resizable","animate",{stop:function(b){var c=a(this).resizable("instance"),d=c.options,e=c._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&c._hasScroll(e[0],"left")?0:c.sizeDiff.height,h=f?0:c.sizeDiff.width,i={width:c.size.width-h,height:c.size.height-g},j=parseFloat(c.element.css("left"))+(c.position.left-c.originalPosition.left)||null,k=parseFloat(c.element.css("top"))+(c.position.top-c.originalPosition.top)||null;c.element.animate(a.extend(i,k&&j?{top:k,left:j}:{}),{duration:d.animateDuration,easing:d.animateEasing,step:function(){var d={width:parseFloat(c.element.css("width")),height:parseFloat(c.element.css("height")),top:parseFloat(c.element.css("top")),left:parseFloat(c.element.css("left"))};e&&e.length&&a(e[0]).css({width:d.width,height:d.height}),c._updateCache(d),c._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(){var b,c,d,e,f,g,h,i=a(this).resizable("instance"),j=i.options,k=i.element,l=j.containment,m=l instanceof a?l.get(0):/parent/.test(l)?k.parent().get(0):l;m&&(i.containerElement=a(m),/document/.test(l)||l===document?(i.containerOffset={left:0,top:0},i.containerPosition={left:0,top:0},i.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight}):(b=a(m),c=[],a(["Top","Right","Left","Bottom"]).each(function(a,d){c[a]=i._num(b.css("padding"+d))}),i.containerOffset=b.offset(),i.containerPosition=b.position(),i.containerSize={height:b.innerHeight()-c[3],width:b.innerWidth()-c[1]},d=i.containerOffset,e=i.containerSize.height,f=i.containerSize.width,g=i._hasScroll(m,"left")?m.scrollWidth:f,h=i._hasScroll(m)?m.scrollHeight:e,i.parentData={element:m,left:d.left,top:d.top,width:g,height:h}))},resize:function(b){var c,d,e,f,g=a(this).resizable("instance"),h=g.options,i=g.containerOffset,j=g.position,k=g._aspectRatio||b.shiftKey,l={top:0,left:0},m=g.containerElement,n=!0;m[0]!==document&&/static/.test(m.css("position"))&&(l=i),j.left<(g._helper?i.left:0)&&(g.size.width=g.size.width+(g._helper?g.position.left-i.left:g.position.left-l.left),k&&(g.size.height=g.size.width/g.aspectRatio,n=!1),g.position.left=h.helper?i.left:0),j.top<(g._helper?i.top:0)&&(g.size.height=g.size.height+(g._helper?g.position.top-i.top:g.position.top),k&&(g.size.width=g.size.height*g.aspectRatio,n=!1),g.position.top=g._helper?i.top:0),e=g.containerElement.get(0)===g.element.parent().get(0),f=/relative|absolute/.test(g.containerElement.css("position")),e&&f?(g.offset.left=g.parentData.left+g.position.left,g.offset.top=g.parentData.top+g.position.top):(g.offset.left=g.element.offset().left,g.offset.top=g.element.offset().top),c=Math.abs(g.sizeDiff.width+(g._helper?g.offset.left-l.left:g.offset.left-i.left)),d=Math.abs(g.sizeDiff.height+(g._helper?g.offset.top-l.top:g.offset.top-i.top)),c+g.size.width>=g.parentData.width&&(g.size.width=g.parentData.width-c,k&&(g.size.height=g.size.width/g.aspectRatio,n=!1)),d+g.size.height>=g.parentData.height&&(g.size.height=g.parentData.height-d,k&&(g.size.width=g.size.height*g.aspectRatio,n=!1)),n||(g.position.left=g.prevPosition.left,g.position.top=g.prevPosition.top,g.size.width=g.prevSize.width,g.size.height=g.prevSize.height)},stop:function(){var b=a(this).resizable("instance"),c=b.options,d=b.containerOffset,e=b.containerPosition,f=b.containerElement,g=a(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width,j=g.outerHeight()-b.sizeDiff.height;b._helper&&!c.animate&&/relative/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:j}),b._helper&&!c.animate&&/static/.test(f.css("position"))&&a(this).css({left:h.left-e.left-d.left,width:i,height:j})}}),a.ui.plugin.add("resizable","alsoResize",{start:function(){var b=a(this).resizable("instance"),c=b.options;a(c.alsoResize).each(function(){var b=a(this);b.data("ui-resizable-alsoresize",{width:parseFloat(b.width()),height:parseFloat(b.height()),left:parseFloat(b.css("left")),top:parseFloat(b.css("top"))})})},resize:function(b,c){var d=a(this).resizable("instance"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0};a(e.alsoResize).each(function(){var b=a(this),d=a(this).data("ui-resizable-alsoresize"),e={},f=b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(f,function(a,b){var c=(d[b]||0)+(h[b]||0);c&&c>=0&&(e[b]=c||null)}),b.css(e)})},stop:function(){a(this).removeData("ui-resizable-alsoresize")}}),a.ui.plugin.add("resizable","ghost",{start:function(){var b=a(this).resizable("instance"),c=b.size;b.ghost=b.originalElement.clone(),b.ghost.css({opacity:.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}),b._addClass(b.ghost,"ui-resizable-ghost"),a.uiBackCompat!==!1&&"string"==typeof b.options.ghost&&b.ghost.addClass(this.options.ghost),b.ghost.appendTo(b.helper)},resize:function(){var b=a(this).resizable("instance");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=a(this).resizable("instance");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(){var b,c=a(this).resizable("instance"),d=c.options,e=c.size,f=c.originalSize,g=c.originalPosition,h=c.axis,i="number"==typeof d.grid?[d.grid,d.grid]:d.grid,j=i[0]||1,k=i[1]||1,l=Math.round((e.width-f.width)/j)*j,m=Math.round((e.height-f.height)/k)*k,n=f.width+l,o=f.height+m,p=d.maxWidth&&d.maxWidth<n,q=d.maxHeight&&d.maxHeight<o,r=d.minWidth&&d.minWidth>n,s=d.minHeight&&d.minHeight>o;d.grid=i,r&&(n+=j),s&&(o+=k),p&&(n-=j),q&&(o-=k),/^(se|s|e)$/.test(h)?(c.size.width=n,c.size.height=o):/^(ne)$/.test(h)?(c.size.width=n,c.size.height=o,c.position.top=g.top-m):/^(sw)$/.test(h)?(c.size.width=n,c.size.height=o,c.position.left=g.left-l):((o-k<=0||n-j<=0)&&(b=c._getPaddingPlusBorderDimensions(this)),o-k>0?(c.size.height=o,c.position.top=g.top-m):(o=k-b.height,c.size.height=o,c.position.top=g.top+f.height-o),n-j>0?(c.size.width=n,c.position.left=g.left-l):(n=j-b.width,c.size.width=n,c.position.left=g.left+f.width-n))}}),a.ui.resizable});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./button","./draggable","./mouse","./resizable","../focusable","../keycode","../position","../safe-active-element","../safe-blur","../tabbable","../unique-id","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.dialog",{version:"1.12.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&a.fn.draggable&&this._makeDraggable(),this.options.resizable&&a.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var b=this.options.appendTo;return b&&(b.jquery||b.nodeType)?a(b):this.document.find(b||"body").eq(0)},_destroy:function(){var a,b=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),a=b.parent.children().eq(b.index),a.length&&a[0]!==this.element[0]?a.before(this.element):b.parent.append(this.element)},widget:function(){return this.uiDialog},disable:a.noop,enable:a.noop,close:function(b){var c=this;this._isOpen&&this._trigger("beforeClose",b)!==!1&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||a.ui.safeBlur(a.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){c._trigger("close",b)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(b,c){var d=!1,e=this.uiDialog.siblings(".ui-front:visible").map(function(){return+a(this).css("z-index")}).get(),f=Math.max.apply(null,e);return f>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",f+1),d=!0),d&&!c&&this._trigger("focus",b),d},open:function(){var b=this;return this._isOpen?void(this._moveToTop()&&this._focusTabbable()):(this._isOpen=!0,this.opener=a(a.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){b._focusTabbable(),b._trigger("focus")}),this._makeFocusTarget(),void this._trigger("open"))},_focusTabbable:function(){var a=this._focusedElement;a||(a=this.element.find("[autofocus]")),a.length||(a=this.element.find(":tabbable")),a.length||(a=this.uiDialogButtonPane.find(":tabbable")),a.length||(a=this.uiDialogTitlebarClose.filter(":tabbable")),a.length||(a=this.uiDialog),a.eq(0).trigger("focus")},_keepFocus:function(b){function c(){var b=a.ui.safeActiveElement(this.document[0]),c=this.uiDialog[0]===b||a.contains(this.uiDialog[0],b);c||this._focusTabbable()}b.preventDefault(),c.call(this),this._delay(c)},_createWrapper:function(){this.uiDialog=a("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(b){if(this.options.closeOnEscape&&!b.isDefaultPrevented()&&b.keyCode&&b.keyCode===a.ui.keyCode.ESCAPE)return b.preventDefault(),void this.close(b);if(b.keyCode===a.ui.keyCode.TAB&&!b.isDefaultPrevented()){var c=this.uiDialog.find(":tabbable"),d=c.filter(":first"),e=c.filter(":last");b.target!==e[0]&&b.target!==this.uiDialog[0]||b.shiftKey?b.target!==d[0]&&b.target!==this.uiDialog[0]||!b.shiftKey||(this._delay(function(){e.trigger("focus")}),b.preventDefault()):(this._delay(function(){d.trigger("focus")}),b.preventDefault())}},mousedown:function(a){this._moveToTop(a)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var b;this.uiDialogTitlebar=a("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(b){a(b.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=a("<button type='button'></button>").button({label:a("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(a){a.preventDefault(),this.close(a)}}),b=a("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(b,"ui-dialog-title"),this._title(b),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":b.attr("id")})},_title:function(a){this.options.title?a.text(this.options.title):a.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=a("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=a("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var b=this,c=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),a.isEmptyObject(c)||a.isArray(c)&&!c.length?void this._removeClass(this.uiDialog,"ui-dialog-buttons"):(a.each(c,function(c,d){var e,f;d=a.isFunction(d)?{click:d,text:c}:d,d=a.extend({type:"button"},d),e=d.click,f={icon:d.icon,iconPosition:d.iconPosition,showLabel:d.showLabel,icons:d.icons,text:d.text},delete d.click,delete d.icon,delete d.iconPosition,delete d.showLabel,delete d.icons,"boolean"==typeof d.text&&delete d.text,a("<button></button>",d).button(f).appendTo(b.uiButtonSet).on("click",function(){e.apply(b.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),void this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){function b(a){return{position:a.position,offset:a.offset}}var c=this,d=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,e){c._addClass(a(this),"ui-dialog-dragging"),c._blockFrames(),c._trigger("dragStart",d,b(e))},drag:function(a,d){c._trigger("drag",a,b(d))},stop:function(e,f){var g=f.offset.left-c.document.scrollLeft(),h=f.offset.top-c.document.scrollTop();d.position={my:"left top",at:"left"+(g>=0?"+":"")+g+" top"+(h>=0?"+":"")+h,of:c.window},c._removeClass(a(this),"ui-dialog-dragging"),c._unblockFrames(),c._trigger("dragStop",e,b(f))}})},_makeResizable:function(){function b(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}var c=this,d=this.options,e=d.resizable,f=this.uiDialog.css("position"),g="string"==typeof e?e:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:d.maxWidth,maxHeight:d.maxHeight,minWidth:d.minWidth,minHeight:this._minHeight(),handles:g,start:function(d,e){c._addClass(a(this),"ui-dialog-resizing"),c._blockFrames(),c._trigger("resizeStart",d,b(e))},resize:function(a,d){c._trigger("resize",a,b(d))},stop:function(e,f){var g=c.uiDialog.offset(),h=g.left-c.document.scrollLeft(),i=g.top-c.document.scrollTop();d.height=c.uiDialog.height(),d.width=c.uiDialog.width(),d.position={my:"left top",at:"left"+(h>=0?"+":"")+h+" top"+(i>=0?"+":"")+i,of:c.window},c._removeClass(a(this),"ui-dialog-resizing"),c._unblockFrames(),c._trigger("resizeStop",e,b(f))}}).css("position",f)},_trackFocus:function(){this._on(this.widget(),{focusin:function(b){this._makeFocusTarget(),this._focusedElement=a(b.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var b=this._trackingInstances(),c=a.inArray(this,b);c!==-1&&b.splice(c,1)},_trackingInstances:function(){var a=this.document.data("ui-dialog-instances");return a||(a=[],this.document.data("ui-dialog-instances",a)),a},_minHeight:function(){var a=this.options;return"auto"===a.height?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(){var a=this.uiDialog.is(":visible");a||this.uiDialog.show(),this.uiDialog.position(this.options.position),a||this.uiDialog.hide()},_setOptions:function(b){var c=this,d=!1,e={};a.each(b,function(a,b){c._setOption(a,b),a in c.sizeRelatedOptions&&(d=!0),a in c.resizableRelatedOptions&&(e[a]=b)}),d&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",e)},_setOption:function(b,c){var d,e,f=this.uiDialog;"disabled"!==b&&(this._super(b,c),"appendTo"===b&&this.uiDialog.appendTo(this._appendTo()),"buttons"===b&&this._createButtons(),"closeText"===b&&this.uiDialogTitlebarClose.button({label:a("<a>").text(""+this.options.closeText).html()}),"draggable"===b&&(d=f.is(":data(ui-draggable)"),d&&!c&&f.draggable("destroy"),!d&&c&&this._makeDraggable()),"position"===b&&this._position(),"resizable"===b&&(e=f.is(":data(ui-resizable)"),e&&!c&&f.resizable("destroy"),e&&"string"==typeof c&&f.resizable("option","handles",c),e||c===!1||this._makeResizable()),"title"===b&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var a,b,c,d=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),d.minWidth>d.width&&(d.width=d.minWidth),a=this.uiDialog.css({height:"auto",width:d.width}).outerHeight(),b=Math.max(0,d.minHeight-a),c="number"==typeof d.maxHeight?Math.max(0,d.maxHeight-a):"none","auto"===d.height?this.element.css({minHeight:b,maxHeight:c,height:"auto"}):this.element.height(Math.max(0,d.height-a)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var b=a(this);return a("<div>").css({position:"absolute",width:b.outerWidth(),height:b.outerHeight()}).appendTo(b.parent()).offset(b.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(b){return!!a(b.target).closest(".ui-dialog").length||!!a(b.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var b=!0;this._delay(function(){b=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(a){b||this._allowInteraction(a)||(a.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=a("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var a=this.document.data("ui-dialog-overlays")-1;a?this.document.data("ui-dialog-overlays",a):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),a.uiBackCompat!==!1&&a.widget("ui.dialog",a.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(a,b){"dialogClass"===a&&this.uiDialog.removeClass(this.options.dialogClass).addClass(b),this._superApply(arguments)}}),a.ui.dialog});;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  drupalSettings.dialog = {
    autoOpen: true,
    dialogClass: '',

    buttonClass: 'button',
    buttonPrimaryClass: 'button--primary',
    close: function close(event) {
      Drupal.dialog(event.target).close();
      Drupal.detachBehaviors(event.target, null, 'unload');
    }
  };

  Drupal.dialog = function (element, options) {
    var undef = void 0;
    var $element = $(element);
    var dialog = {
      open: false,
      returnValue: undef
    };

    function openDialog(settings) {
      settings = $.extend({}, drupalSettings.dialog, options, settings);

      $(window).trigger('dialog:beforecreate', [dialog, $element, settings]);
      $element.dialog(settings);
      dialog.open = true;
      $(window).trigger('dialog:aftercreate', [dialog, $element, settings]);
    }

    function closeDialog(value) {
      $(window).trigger('dialog:beforeclose', [dialog, $element]);
      $element.dialog('close');
      dialog.returnValue = value;
      dialog.open = false;
      $(window).trigger('dialog:afterclose', [dialog, $element]);
    }

    dialog.show = function () {
      openDialog({ modal: false });
    };
    dialog.showModal = function () {
      openDialog({ modal: true });
    };
    dialog.close = closeDialog;

    return dialog;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, debounce, displace) {
  drupalSettings.dialog = $.extend({ autoResize: true, maxHeight: '95%' }, drupalSettings.dialog);

  function resetPosition(options) {
    var offsets = displace.offsets;
    var left = offsets.left - offsets.right;
    var top = offsets.top - offsets.bottom;

    var leftString = (left > 0 ? '+' : '-') + Math.abs(Math.round(left / 2)) + 'px';
    var topString = (top > 0 ? '+' : '-') + Math.abs(Math.round(top / 2)) + 'px';
    options.position = {
      my: 'center' + (left !== 0 ? leftString : '') + ' center' + (top !== 0 ? topString : ''),
      of: window
    };
    return options;
  }

  function resetSize(event) {
    var positionOptions = ['width', 'height', 'minWidth', 'minHeight', 'maxHeight', 'maxWidth', 'position'];
    var adjustedOptions = {};
    var windowHeight = $(window).height();
    var option = void 0;
    var optionValue = void 0;
    var adjustedValue = void 0;
    for (var n = 0; n < positionOptions.length; n++) {
      option = positionOptions[n];
      optionValue = event.data.settings[option];
      if (optionValue) {
        if (typeof optionValue === 'string' && /%$/.test(optionValue) && /height/i.test(option)) {
          windowHeight -= displace.offsets.top + displace.offsets.bottom;
          adjustedValue = parseInt(0.01 * parseInt(optionValue, 10) * windowHeight, 10);

          if (option === 'height' && event.data.$element.parent().outerHeight() < adjustedValue) {
            adjustedValue = 'auto';
          }
          adjustedOptions[option] = adjustedValue;
        }
      }
    }

    if (!event.data.settings.modal) {
      adjustedOptions = resetPosition(adjustedOptions);
    }
    event.data.$element.dialog('option', adjustedOptions).trigger('dialogContentResize');
  }

  $(window).on({
    'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
      var autoResize = debounce(resetSize, 20);
      var eventData = { settings: settings, $element: $element };
      if (settings.autoResize === true || settings.autoResize === 'true') {
        $element.dialog('option', { resizable: false, draggable: false }).dialog('widget').css('position', 'fixed');
        $(window).on('resize.dialogResize scroll.dialogResize', eventData, autoResize).trigger('resize.dialogResize');
        $(document).on('drupalViewportOffsetChange.dialogResize', eventData, autoResize);
      }
    },
    'dialog:beforeclose': function dialogBeforeclose(event, dialog, $element) {
      $(window).off('.dialogResize');
      $(document).off('.dialogResize');
    }
  });
})(jQuery, Drupal, drupalSettings, Drupal.debounce, Drupal.displace);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($) {
  $.widget('ui.dialog', $.ui.dialog, {
    options: {
      buttonClass: 'button',
      buttonPrimaryClass: 'button--primary'
    },
    _createButtons: function _createButtons() {
      var opts = this.options;
      var primaryIndex = void 0;
      var index = void 0;
      var il = opts.buttons.length;
      for (index = 0; index < il; index++) {
        if (opts.buttons[index].primary && opts.buttons[index].primary === true) {
          primaryIndex = index;
          delete opts.buttons[index].primary;
          break;
        }
      }
      this._super();
      var $buttons = this.uiButtonSet.children().addClass(opts.buttonClass);
      if (typeof primaryIndex !== 'undefined') {
        $buttons.eq(index).addClass(opts.buttonPrimaryClass);
      }
    }
  });
})(jQuery);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.theme.progressBar = function (id) {
    return '<div id="' + id + '" class="progress" aria-live="polite">' + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>';
  };

  Drupal.ProgressBar = function (id, updateCallback, method, errorCallback) {
    this.id = id;
    this.method = method || 'GET';
    this.updateCallback = updateCallback;
    this.errorCallback = errorCallback;

    this.element = $(Drupal.theme('progressBar', id));
  };

  $.extend(Drupal.ProgressBar.prototype, {
    setProgress: function setProgress(percentage, message, label) {
      if (percentage >= 0 && percentage <= 100) {
        $(this.element).find('div.progress__bar').css('width', percentage + '%');
        $(this.element).find('div.progress__percentage').html(percentage + '%');
      }
      $('div.progress__description', this.element).html(message);
      $('div.progress__label', this.element).html(label);
      if (this.updateCallback) {
        this.updateCallback(percentage, message, this);
      }
    },
    startMonitoring: function startMonitoring(uri, delay) {
      this.delay = delay;
      this.uri = uri;
      this.sendPing();
    },
    stopMonitoring: function stopMonitoring() {
      clearTimeout(this.timer);

      this.uri = null;
    },
    sendPing: function sendPing() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.uri) {
        var pb = this;

        var uri = this.uri;
        if (uri.indexOf('?') === -1) {
          uri += '?';
        } else {
          uri += '&';
        }
        uri += '_format=json';
        $.ajax({
          type: this.method,
          url: uri,
          data: '',
          dataType: 'json',
          success: function success(progress) {
            if (progress.status === 0) {
              pb.displayError(progress.data);
              return;
            }

            pb.setProgress(progress.percentage, progress.message, progress.label);

            pb.timer = setTimeout(function () {
              pb.sendPing();
            }, pb.delay);
          },
          error: function error(xmlhttp) {
            var e = new Drupal.AjaxError(xmlhttp, pb.uri);
            pb.displayError('<pre>' + e.message + '</pre>');
          }
        });
      }
    },
    displayError: function displayError(string) {
      var error = $('<div class="messages messages--error"></div>').html(string);
      $(this.element).before(error).hide();

      if (this.errorCallback) {
        this.errorCallback(this);
      }
    }
  });
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function ($, window, Drupal, drupalSettings) {
  Drupal.behaviors.AJAX = {
    attach: function attach(context, settings) {
      function loadAjaxBehavior(base) {
        var elementSettings = settings.ajax[base];
        if (typeof elementSettings.selector === 'undefined') {
          elementSettings.selector = '#' + base;
        }
        $(elementSettings.selector).once('drupal-ajax').each(function () {
          elementSettings.element = this;
          elementSettings.base = base;
          Drupal.ajax(elementSettings);
        });
      }

      Object.keys(settings.ajax || {}).forEach(function (base) {
        return loadAjaxBehavior(base);
      });

      Drupal.ajax.bindAjaxLinks(document.body);

      $('.use-ajax-submit').once('ajax').each(function () {
        var elementSettings = {};

        elementSettings.url = $(this.form).attr('action');

        elementSettings.setClick = true;

        elementSettings.event = 'click';

        elementSettings.progress = { type: 'throbber' };
        elementSettings.base = $(this).attr('id');
        elementSettings.element = this;

        Drupal.ajax(elementSettings);
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        Drupal.ajax.expired().forEach(function (instance) {
          Drupal.ajax.instances[instance.instanceIndex] = null;
        });
      }
    }
  };

  Drupal.AjaxError = function (xmlhttp, uri, customMessage) {
    var statusCode = void 0;
    var statusText = void 0;
    var responseText = void 0;
    if (xmlhttp.status) {
      statusCode = '\n' + Drupal.t('An AJAX HTTP error occurred.') + '\n' + Drupal.t('HTTP Result Code: !status', { '!status': xmlhttp.status });
    } else {
      statusCode = '\n' + Drupal.t('An AJAX HTTP request terminated abnormally.');
    }
    statusCode += '\n' + Drupal.t('Debugging information follows.');
    var pathText = '\n' + Drupal.t('Path: !uri', { '!uri': uri });
    statusText = '';

    try {
      statusText = '\n' + Drupal.t('StatusText: !statusText', {
        '!statusText': $.trim(xmlhttp.statusText)
      });
    } catch (e) {}

    responseText = '';

    try {
      responseText = '\n' + Drupal.t('ResponseText: !responseText', {
        '!responseText': $.trim(xmlhttp.responseText)
      });
    } catch (e) {}

    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
    responseText = responseText.replace(/[\n]+\s+/g, '\n');

    var readyStateText = xmlhttp.status === 0 ? '\n' + Drupal.t('ReadyState: !readyState', {
      '!readyState': xmlhttp.readyState
    }) : '';

    customMessage = customMessage ? '\n' + Drupal.t('CustomMessage: !customMessage', {
      '!customMessage': customMessage
    }) : '';

    this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;

    this.name = 'AjaxError';
  };

  Drupal.AjaxError.prototype = new Error();
  Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;

  Drupal.ajax = function (settings) {
    if (arguments.length !== 1) {
      throw new Error('Drupal.ajax() function must be called with one configuration object only');
    }

    var base = settings.base || false;
    var element = settings.element || false;
    delete settings.base;
    delete settings.element;

    if (!settings.progress && !element) {
      settings.progress = false;
    }

    var ajax = new Drupal.Ajax(base, element, settings);
    ajax.instanceIndex = Drupal.ajax.instances.length;
    Drupal.ajax.instances.push(ajax);

    return ajax;
  };

  Drupal.ajax.instances = [];

  Drupal.ajax.expired = function () {
    return Drupal.ajax.instances.filter(function (instance) {
      return instance && instance.element !== false && !document.body.contains(instance.element);
    });
  };

  Drupal.ajax.bindAjaxLinks = function (element) {
    $(element).find('.use-ajax').once('ajax').each(function (i, ajaxLink) {
      var $linkElement = $(ajaxLink);

      var elementSettings = {
        progress: { type: 'throbber' },
        dialogType: $linkElement.data('dialog-type'),
        dialog: $linkElement.data('dialog-options'),
        dialogRenderer: $linkElement.data('dialog-renderer'),
        base: $linkElement.attr('id'),
        element: ajaxLink
      };
      var href = $linkElement.attr('href');

      if (href) {
        elementSettings.url = href;
        elementSettings.event = 'click';
      }
      Drupal.ajax(elementSettings);
    });
  };

  Drupal.Ajax = function (base, element, elementSettings) {
    var defaults = {
      event: element ? 'mousedown' : null,
      keypress: true,
      selector: base ? '#' + base : null,
      effect: 'none',
      speed: 'none',
      method: 'replaceWith',
      progress: {
        type: 'throbber',
        message: Drupal.t('Please wait...')
      },
      submit: {
        js: true
      }
    };

    $.extend(this, defaults, elementSettings);

    this.commands = new Drupal.AjaxCommands();

    this.instanceIndex = false;

    if (this.wrapper) {
      this.wrapper = '#' + this.wrapper;
    }

    this.element = element;

    this.element_settings = elementSettings;

    this.elementSettings = elementSettings;

    if (this.element && this.element.form) {
      this.$form = $(this.element.form);
    }

    if (!this.url) {
      var $element = $(this.element);
      if ($element.is('a')) {
        this.url = $element.attr('href');
      } else if (this.element && element.form) {
        this.url = this.$form.attr('action');
      }
    }

    var originalUrl = this.url;

    this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');

    if (drupalSettings.ajaxTrustedUrl[originalUrl]) {
      drupalSettings.ajaxTrustedUrl[this.url] = true;
    }

    var ajax = this;

    ajax.options = {
      url: ajax.url,
      data: ajax.submit,
      beforeSerialize: function beforeSerialize(elementSettings, options) {
        return ajax.beforeSerialize(elementSettings, options);
      },
      beforeSubmit: function beforeSubmit(formValues, elementSettings, options) {
        ajax.ajaxing = true;
        return ajax.beforeSubmit(formValues, elementSettings, options);
      },
      beforeSend: function beforeSend(xmlhttprequest, options) {
        ajax.ajaxing = true;
        return ajax.beforeSend(xmlhttprequest, options);
      },
      success: function success(response, status, xmlhttprequest) {
        if (typeof response === 'string') {
          response = $.parseJSON(response);
        }

        if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url]) {
          if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
            var customMessage = Drupal.t('The response failed verification so will not be processed.');
            return ajax.error(xmlhttprequest, ajax.url, customMessage);
          }
        }

        return ajax.success(response, status);
      },
      complete: function complete(xmlhttprequest, status) {
        ajax.ajaxing = false;
        if (status === 'error' || status === 'parsererror') {
          return ajax.error(xmlhttprequest, ajax.url);
        }
      },

      dataType: 'json',
      type: 'POST'
    };

    if (elementSettings.dialog) {
      ajax.options.data.dialogOptions = elementSettings.dialog;
    }

    if (ajax.options.url.indexOf('?') === -1) {
      ajax.options.url += '?';
    } else {
      ajax.options.url += '&';
    }

    var wrapper = 'drupal_' + (elementSettings.dialogType || 'ajax');
    if (elementSettings.dialogRenderer) {
      wrapper += '.' + elementSettings.dialogRenderer;
    }
    ajax.options.url += Drupal.ajax.WRAPPER_FORMAT + '=' + wrapper;

    $(ajax.element).on(elementSettings.event, function (event) {
      if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) {
        throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
          '!url': ajax.url
        }));
      }
      return ajax.eventResponse(this, event);
    });

    if (elementSettings.keypress) {
      $(ajax.element).on('keypress', function (event) {
        return ajax.keypressResponse(this, event);
      });
    }

    if (elementSettings.prevent) {
      $(ajax.element).on(elementSettings.prevent, false);
    }
  };

  Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';

  Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';

  Drupal.Ajax.prototype.execute = function () {
    if (this.ajaxing) {
      return;
    }

    try {
      this.beforeSerialize(this.element, this.options);

      return $.ajax(this.options);
    } catch (e) {
      this.ajaxing = false;
      window.alert('An error occurred while attempting to process ' + this.options.url + ': ' + e.message);

      return $.Deferred().reject();
    }
  };

  Drupal.Ajax.prototype.keypressResponse = function (element, event) {
    var ajax = this;

    if (event.which === 13 || event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number') {
      event.preventDefault();
      event.stopPropagation();
      $(element).trigger(ajax.elementSettings.event);
    }
  };

  Drupal.Ajax.prototype.eventResponse = function (element, event) {
    event.preventDefault();
    event.stopPropagation();

    var ajax = this;

    if (ajax.ajaxing) {
      return;
    }

    try {
      if (ajax.$form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }

        ajax.$form.ajaxSubmit(ajax.options);
      } else {
        ajax.beforeSerialize(ajax.element, ajax.options);
        $.ajax(ajax.options);
      }
    } catch (e) {
      ajax.ajaxing = false;
      window.alert('An error occurred while attempting to process ' + ajax.options.url + ': ' + e.message);
    }
  };

  Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
    }

    options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;

    var pageState = drupalSettings.ajaxPageState;
    options.data['ajax_page_state[theme]'] = pageState.theme;
    options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
    options.data['ajax_page_state[libraries]'] = pageState.libraries;
  };

  Drupal.Ajax.prototype.beforeSubmit = function (formValues, element, options) {};

  Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
    if (this.$form) {
      options.extraData = options.extraData || {};

      options.extraData.ajax_iframe_upload = '1';

      var v = $.fieldValue(this.element);
      if (v !== null) {
        options.extraData[this.element.name] = v;
      }
    }

    $(this.element).prop('disabled', true);

    if (!this.progress || !this.progress.type) {
      return;
    }

    var progressIndicatorMethod = 'setProgressIndicator' + this.progress.type.slice(0, 1).toUpperCase() + this.progress.type.slice(1).toLowerCase();
    if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function') {
      this[progressIndicatorMethod].call(this);
    }
  };

  Drupal.theme.ajaxProgressThrobber = function (message) {
    var messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
    var throbber = '<div class="throbber">&nbsp;</div>';

    return '<div class="ajax-progress ajax-progress-throbber">' + throbber + messageMarkup + '</div>';
  };

  Drupal.theme.ajaxProgressIndicatorFullscreen = function () {
    return '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
  };

  Drupal.theme.ajaxProgressMessage = function (message) {
    return '<div class="message">' + message + '</div>';
  };

  Drupal.Ajax.prototype.setProgressIndicatorBar = function () {
    var progressBar = new Drupal.ProgressBar('ajax-progress-' + this.element.id, $.noop, this.progress.method, $.noop);
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
    $('body').after(this.progress.element);
  };

  Drupal.Ajax.prototype.success = function (response, status) {
    var _this = this;

    if (this.progress.element) {
      $(this.progress.element).remove();
    }
    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }
    $(this.element).prop('disabled', false);

    var elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();

    var focusChanged = false;
    Object.keys(response || {}).forEach(function (i) {
      if (response[i].command && _this.commands[response[i].command]) {
        _this.commands[response[i].command](_this, response[i], status);
        if (response[i].command === 'invoke' && response[i].method === 'focus') {
          focusChanged = true;
        }
      }
    });

    if (!focusChanged && this.element && !$(this.element).data('disable-refocus')) {
      var target = false;

      for (var n = elementParents.length - 1; !target && n >= 0; n--) {
        target = document.querySelector('[data-drupal-selector="' + elementParents[n].getAttribute('data-drupal-selector') + '"]');
      }

      if (target) {
        $(target).trigger('focus');
      }
    }

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }

    this.settings = null;
  };

  Drupal.Ajax.prototype.getEffect = function (response) {
    var type = response.effect || this.effect;
    var speed = response.speed || this.speed;

    var effect = {};
    if (type === 'none') {
      effect.showEffect = 'show';
      effect.hideEffect = 'hide';
      effect.showSpeed = '';
    } else if (type === 'fade') {
      effect.showEffect = 'fadeIn';
      effect.hideEffect = 'fadeOut';
      effect.showSpeed = speed;
    } else {
      effect.showEffect = type + 'Toggle';
      effect.hideEffect = type + 'Toggle';
      effect.showSpeed = speed;
    }

    return effect;
  };

  Drupal.Ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
    if (this.progress.element) {
      $(this.progress.element).remove();
    }
    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.wrapper).show();

    $(this.element).prop('disabled', false);

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }
    throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
  };

  Drupal.theme.ajaxWrapperNewContent = function ($newContent, ajax, response) {
    return (response.effect || ajax.effect) !== 'none' && $newContent.filter(function (i) {
      return !($newContent[i].nodeName === '#comment' || $newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent));
    }).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
  };

  Drupal.theme.ajaxWrapperMultipleRootElements = function ($elements) {
    return $('<div></div>').append($elements);
  };

  Drupal.AjaxCommands = function () {};
  Drupal.AjaxCommands.prototype = {
    insert: function insert(ajax, response) {
      var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
      var method = response.method || ajax.method;
      var effect = ajax.getEffect(response);

      var settings = response.settings || ajax.settings || drupalSettings;

      var $newContent = $($.parseHTML(response.data, document, true));

      $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);

      switch (method) {
        case 'html':
        case 'replaceWith':
        case 'replaceAll':
        case 'empty':
        case 'remove':
          Drupal.detachBehaviors($wrapper.get(0), settings);
          break;
        default:
          break;
      }

      $wrapper[method]($newContent);

      if (effect.showEffect !== 'show') {
        $newContent.hide();
      }

      var $ajaxNewContent = $newContent.find('.ajax-new-content');
      if ($ajaxNewContent.length) {
        $ajaxNewContent.hide();
        $newContent.show();
        $ajaxNewContent[effect.showEffect](effect.showSpeed);
      } else if (effect.showEffect !== 'show') {
        $newContent[effect.showEffect](effect.showSpeed);
      }

      if ($newContent.parents('html').length) {
        $newContent.each(function (index, element) {
          if (element.nodeType === Node.ELEMENT_NODE) {
            Drupal.attachBehaviors(element, settings);
          }
        });
      }
    },
    remove: function remove(ajax, response, status) {
      var settings = response.settings || ajax.settings || drupalSettings;
      $(response.selector).each(function () {
        Drupal.detachBehaviors(this, settings);
      }).remove();
    },
    changed: function changed(ajax, response, status) {
      var $element = $(response.selector);
      if (!$element.hasClass('ajax-changed')) {
        $element.addClass('ajax-changed');
        if (response.asterisk) {
          $element.find(response.asterisk).append(' <abbr class="ajax-changed" title="' + Drupal.t('Changed') + '">*</abbr> ');
        }
      }
    },
    alert: function alert(ajax, response, status) {
      window.alert(response.text, response.title);
    },
    redirect: function redirect(ajax, response, status) {
      window.location = response.url;
    },
    css: function css(ajax, response, status) {
      $(response.selector).css(response.argument);
    },
    settings: function settings(ajax, response, status) {
      var ajaxSettings = drupalSettings.ajax;

      if (ajaxSettings) {
        Drupal.ajax.expired().forEach(function (instance) {

          if (instance.selector) {
            var selector = instance.selector.replace('#', '');
            if (selector in ajaxSettings) {
              delete ajaxSettings[selector];
            }
          }
        });
      }

      if (response.merge) {
        $.extend(true, drupalSettings, response.settings);
      } else {
        ajax.settings = response.settings;
      }
    },
    data: function data(ajax, response, status) {
      $(response.selector).data(response.name, response.value);
    },
    invoke: function invoke(ajax, response, status) {
      var $element = $(response.selector);
      $element[response.method].apply($element, _toConsumableArray(response.args));
    },
    restripe: function restripe(ajax, response, status) {
      $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
    },
    update_build_id: function update_build_id(ajax, response, status) {
      $('input[name="form_build_id"][value="' + response.old + '"]').val(response.new);
    },
    add_css: function add_css(ajax, response, status) {
      $('head').prepend(response.data);

      var match = void 0;
      var importMatch = /^@import url\("(.*)"\);$/gim;
      if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
        importMatch.lastIndex = 0;
        do {
          match = importMatch.exec(response.data);
          document.styleSheets[0].addImport(match[1]);
        } while (match);
      }
    }
  };
})(jQuery, window, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.dialog = {
    attach: function attach(context, settings) {
      var $context = $(context);

      if (!$('#drupal-modal').length) {
        $('<div id="drupal-modal" class="ui-front"/>').hide().appendTo('body');
      }

      var $dialog = $context.closest('.ui-dialog-content');
      if ($dialog.length) {
        if ($dialog.dialog('option', 'drupalAutoButtons')) {
          $dialog.trigger('dialogButtonsChange');
        }

        $dialog.dialog('widget').trigger('focus');
      }

      var originalClose = settings.dialog.close;

      settings.dialog.close = function (event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        originalClose.apply(settings.dialog, [event].concat(args));
        $(event.target).remove();
      };
    },
    prepareDialogButtons: function prepareDialogButtons($dialog) {
      var buttons = [];
      var $buttons = $dialog.find('.form-actions input[type=submit], .form-actions a.button');
      $buttons.each(function () {
        var $originalButton = $(this).css({
          display: 'block',
          width: 0,
          height: 0,
          padding: 0,
          border: 0,
          overflow: 'hidden'
        });
        buttons.push({
          text: $originalButton.html() || $originalButton.attr('value'),
          class: $originalButton.attr('class'),
          click: function click(e) {
            if ($originalButton.is('a')) {
              $originalButton[0].click();
            } else {
              $originalButton.trigger('mousedown').trigger('mouseup').trigger('click');
              e.preventDefault();
            }
          }
        });
      });
      return buttons;
    }
  };

  Drupal.AjaxCommands.prototype.openDialog = function (ajax, response, status) {
    if (!response.selector) {
      return false;
    }
    var $dialog = $(response.selector);
    if (!$dialog.length) {
      $dialog = $('<div id="' + response.selector.replace(/^#/, '') + '" class="ui-front"/>').appendTo('body');
    }

    if (!ajax.wrapper) {
      ajax.wrapper = $dialog.attr('id');
    }

    response.command = 'insert';
    response.method = 'html';
    ajax.commands.insert(ajax, response, status);

    if (!response.dialogOptions.buttons) {
      response.dialogOptions.drupalAutoButtons = true;
      response.dialogOptions.buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog);
    }

    $dialog.on('dialogButtonsChange', function () {
      var buttons = Drupal.behaviors.dialog.prepareDialogButtons($dialog);
      $dialog.dialog('option', 'buttons', buttons);
    });

    response.dialogOptions = response.dialogOptions || {};
    var dialog = Drupal.dialog($dialog.get(0), response.dialogOptions);
    if (response.dialogOptions.modal) {
      dialog.showModal();
    } else {
      dialog.show();
    }

    $dialog.parent().find('.ui-dialog-buttonset').addClass('form-actions');
  };

  Drupal.AjaxCommands.prototype.closeDialog = function (ajax, response, status) {
    var $dialog = $(response.selector);
    if ($dialog.length) {
      Drupal.dialog($dialog.get(0)).close();
      if (!response.persist) {
        $dialog.remove();
      }
    }

    $dialog.off('dialogButtonsChange');
  };

  Drupal.AjaxCommands.prototype.setDialogOption = function (ajax, response, status) {
    var $dialog = $(response.selector);
    if ($dialog.length) {
      $dialog.dialog('option', response.optionName, response.optionValue);
    }
  };

  $(window).on('dialog:aftercreate', function (e, dialog, $element, settings) {
    $element.on('click.dialog', '.dialog-cancel', function (e) {
      dialog.close('cancel');
      e.preventDefault();
      e.stopPropagation();
    });
  });

  $(window).on('dialog:beforeclose', function (e, dialog, $element) {
    $element.off('.dialog');
  });
})(jQuery, Drupal);;
(function ($, Drupal) {
    Drupal.behaviors.openImageModal = {
        attach: function (context) {
            $('#block-pegawww-theme-content article[data-entity-embed-display="view_mode:media.embed_image_large"] img, #block-pegawww-theme-content img', context).not('.c-bolt-background__image,[data-external-url]').each(function () {
                // We need to check to see if this image is already wrapped in a link.
                var $pp = $(this).parents();
                if ($pp.length > 2 && $pp[2].tagName.toLowerCase() === 'a') {
                    // If we've already linked this image, bail out.
                    return;
                }
                // Remove "/styles/[#]/public/" from the image path if it exists so we can get the full image.
                var fullImgSrc = '';
                if (this.dataset.srcset) {
                    var srcset = this.dataset.srcset;
                    var srcArr = srcset.split(",");
                    fullImgSrc = srcArr[0].replace(/\/styles\/(.*)\/public\//, '/');
                }
                else {
                    fullImgSrc = this.src.replace(/\/styles\/(.*)\/public\//, '/');
                }
                var imgElement = document.createElement('img');
                imgElement.src = fullImgSrc;

                // Create modal.
                var imageModal = Drupal.dialog(imgElement, {
                    classes: {
                        'ui-dialog-titlebar-close': 'c-bolt-button c-bolt-button--center c-bolt-button--primary c-bolt-button--small',
                        'ui-dialog': 'pega-image-modal'
                    },
                    resizable: false,
                    closeOnEscape: true,
                    height: 'auto',
                    width: 'auto',
                    create: function () {
                        // Remove jQueryUI classes, we're replacing them with Bolt classes above.
                        $(this).parent().find('.ui-dialog-titlebar-close').removeClass('ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close');
                        // Remove extra jQueryUI items.
                        $(this).parent().find('.ui-dialog-title').remove();
                        $(this).parent().find('.ui-icon-closethick').remove();
                    },
                    beforeClose: false,
                    close: function (event) {
                        $(event.target).remove();
                    }

                });
                // Attach modal functionality to image on click.
                var $button = $('<p><button class="u-button-reset" aria-label="' + Drupal.t('Expand Image') + '"></button></p>');
                $button.click(function () {
                    imageModal.showModal();
                    // Add the ability to click outside the modal to close it.
                    $(document).find('.ui-widget-overlay').click(function () {
                        imageModal.close();
                    });
                });
                $(this).wrap($button);

            });
            $('#block-pegawww-theme-content img[data-external-url]', context).click(function () {
              window.open($(this).data('external-url'),'_blank');
            });
        }
    };
})(jQuery, Drupal);
;
/**
 * @file
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.extlink = Drupal.extlink || {};

  Drupal.extlink.attach = function (context, drupalSettings) {
    if (!drupalSettings.data.hasOwnProperty('extlink')) {
      return;
    }

    // Strip the host name down, removing ports, subdomains, or www.
    var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$2$3');
    var subdomain = window.location.host.replace(host, '');

    // Determine what subdomains are considered internal.
    var subdomains;
    if (drupalSettings.data.extlink.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    }
    else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    }
    else {
      subdomains = subdomain.replace('.', '\\.');
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp('^https?://' + subdomains + host, 'i');

    // Extra internal link matching.
    var extInclude = false;
    if (drupalSettings.data.extlink.extInclude) {
      extInclude = new RegExp(drupalSettings.data.extlink.extInclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link matching.
    var extExclude = false;
    if (drupalSettings.data.extlink.extExclude) {
      extExclude = new RegExp(drupalSettings.data.extlink.extExclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link CSS selector exclusion.
    var extCssExclude = false;
    if (drupalSettings.data.extlink.extCssExclude) {
      extCssExclude = drupalSettings.data.extlink.extCssExclude;
    }

    // Extra external link CSS selector explicit.
    var extCssExplicit = false;
    if (drupalSettings.data.extlink.extCssExplicit) {
      extCssExplicit = drupalSettings.data.extlink.extCssExplicit;
    }

    // Find all links which are NOT internal and begin with http as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = [];
    var mailto_links = [];
    $('a:not(.' + drupalSettings.data.extlink.extClass + ', .' + drupalSettings.data.extlink.mailtoClass + '), area:not(.' + drupalSettings.data.extlink.extClass + ', .' + drupalSettings.data.extlink.mailtoClass + ')', context).each(function (el) {
      try {
        var url = '';
        if (typeof this.href == 'string') {
          url = this.href.toLowerCase();
        }
        // Handle SVG links (xlink:href).
        else if (typeof this.href == 'object') {
          url = this.href.baseVal;
        }
        if (url.indexOf('http') === 0
          && ((!internal_link.test(url) && !(extExclude && extExclude.test(url))) || (extInclude && extInclude.test(url)))
          && !(extCssExclude && $(this).is(extCssExclude))
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          external_links.push(this);
        }
        // Do not include area tags with begin with mailto: (this prohibits
        // icons from being added to image-maps).
        else if (this.tagName !== 'AREA'
          && url.indexOf('mailto:') === 0
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          mailto_links.push(this);
        }
      }
      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch (error) {
        return false;
      }
    });

    if (drupalSettings.data.extlink.extClass !== '0' && drupalSettings.data.extlink.extClass !== '') {
      Drupal.extlink.applyClassAndSpan(external_links, drupalSettings.data.extlink.extClass);
    }

    if (drupalSettings.data.extlink.mailtoClass !== '0' && drupalSettings.data.extlink.mailtoClass !== '') {
      Drupal.extlink.applyClassAndSpan(mailto_links, drupalSettings.data.extlink.mailtoClass);
    }

    if (drupalSettings.data.extlink.extTarget) {
      // Apply the target attribute to all links.
      $(external_links).filter(function () {
        // Filter out links with target set if option specified.
        return !(drupalSettings.data.extlink.extTargetNoOverride && $(this).is('a[target]'));
      }).attr({ target: '_blank' });

      // Add noopener and noreferrer rel attributes to combat phishing.
      $(external_links).attr('rel', function (i, val) {
        // If no rel attribute is present, create one with the values noopener and noreferrer.
        if (val === null || typeof val === 'undefined') {
          return 'noopener noreferrer';
        }
        // Check to see if rel contains noopener or noreferrer. Add what doesn't exist.
        if (val.indexOf('noopener') > -1 || val.indexOf('noreferrer') > -1) {
          if (val.indexOf('noopener') === -1) {
            return val + ' noopener';
          }
          if (val.indexOf('noreferrer') === -1) {
            return val + ' noreferrer';
          }
          // Both noopener and noreferrer exist. Nothing needs to be added.
          else {
            return val;
          }
        }
        // Else, append noopener and noreferrer to val.
        else {
          return val + ' noopener noreferrer';
        }
      });
    }

    if (drupalSettings.data.extlink.extNofollow) {
      $(external_links).attr('rel', function (i, val) {
        // when the link does not have a rel attribute set it to 'nofollow'.
        if (val === null || typeof val === 'undefined') {
          return 'nofollow';
        }
        var target = 'nofollow';
        // Change the target, if not overriding follow.
        if (drupalSettings.data.extlink.extFollowNoOverride) {
          target = 'follow';
        }
        if (val.indexOf(target) === -1) {
          return val + ' nofollow';
        }
        return val;
      });
    }

    Drupal.extlink = Drupal.extlink || {};

    // Set up default click function for the external links popup. This should be
    // overridden by modules wanting to alter the popup.
    Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function () {
      if (drupalSettings.data.extlink.extAlert) {
        return confirm(drupalSettings.data.extlink.extAlertText);
      }
    };

    $(external_links).click(function (e) {
      return Drupal.extlink.popupClickHandler(e, this);
    });
  };

  /**
   * Apply a class and a trailing <span> to all links not containing images.
   *
   * @param {object[]} links
   *   An array of DOM elements representing the links.
   * @param {string} class_name
   *   The class to apply to the links.
   */
  Drupal.extlink.applyClassAndSpan = function (links, class_name) {
    var $links_to_process;
    if (drupalSettings.data.extlink.extImgClass) {
      $links_to_process = $(links);
    }
    else {
      var links_with_images = $(links).find('img').parents('a');
      $links_to_process = $(links).not(links_with_images);
    }
    if (class_name !== '0') {
      $links_to_process.addClass(class_name);
    }
    var i;
    var length = $links_to_process.length;
    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);
      if (class_name === drupalSettings.data.extlink.mailtoClass) {
        $link.append('<span class="' + class_name + '" aria-label="' + drupalSettings.data.extlink.mailtoLabel + '"></span>');
      }
      else {
        $link.append('<span class="' + class_name + '" aria-label="' + drupalSettings.data.extlink.extLabel + '"></span>');
      }
    }
  };

  Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
  Drupal.behaviors.extlink.attach = function (context, drupalSettings) {
    // Backwards compatibility, for the benefit of modules overriding extlink
    // functionality by defining an "extlinkAttach" global function.
    if (typeof extlinkAttach === 'function') {
      extlinkAttach(context);
    }
    else {
      Drupal.extlink.attach(context, drupalSettings);
    }
  };

})(jQuery, Drupal, drupalSettings);
;
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/themes/custom/pegawww_theme/dist/",n(n.s=25)}({"./src/components/footer/cta-band-sticky/cta-band-sticky.js":function(t,e){!function(t,e){"use strict";t.behaviors.stickyFooter={attach:function(t){var n=e(".c-cta-band__sticky"),o=n.height();function r(){e(window).scrollTop()+e(window).height()>e(document).height()-o?n.css({visibility:"hidden",opacity:"0"}):n.css({visibility:"visible",opacity:"1"})}"none"!==n.css("display")&&e(window).scroll(r).resize(r)}}}(Drupal,jQuery)},25:function(t,e,n){t.exports=n("./src/components/footer/cta-band-sticky/cta-band-sticky.js")}});;
(function ($, Drupal) {

  Drupal.behaviors.entityNormalizeScroll = {

    attach: function attach(context, settings) {

      $('.link--anchor').mousedown(function (event) {

        var btn = $(this);
        btn.css('pointer-events', 'none');
        btn.attr('disabled', 'disabled');
        setTimeout(function() {
          btn.removeAttr('style');
          btn.removeAttr('disabled');
          }, 1000);

        $('html, body').animate({
          scrollTop: $('body').offset().top
        }, 500);

        return false;
      });

      $(window).scroll(function() {
        if ($(this).scrollTop() > 450) {
          $('[data-hide-threshold]').fadeIn();
        }
        else {
          $('[data-hide-threshold]').fadeOut();
        }
      });

    }

  };
})(jQuery, Drupal);
;
!function(e){var o={};function n(r){if(o[r])return o[r].exports;var t=o[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=e,n.c=o,n.d=function(e,o,r){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var t in e)n.d(r,t,function(o){return e[o]}.bind(null,t));return r},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="/themes/custom/pegawww_theme/dist/",n(n.s=10)}({"./src/components/header/js/dropdown-list.js":function(e,o){!function(e,o,n){"use strict";o.behaviors.dropDownList={attach:function(o){n(e).on("click",".js-header-dropdown__link",function(){n(".js-header-dropdown__link").not(this).removeClass("is-dropdown").next(n(".js-header-dropdown")).removeClass("is-open"),n(this).toggleClass("is-dropdown").next(n(".js-header-dropdown")).toggleClass("is-open")}),n(e).on("click",function(e){n(e.target).closest(".js-header-dropdown__link").length||3===e.which||n(".js-header-dropdown__link").removeClass("is-dropdown").next(n(".js-header-dropdown")).removeClass("is-open")}),n(e).keydown(function(e){27==e.keyCode&&n(".js-header-dropdown__link").removeClass("is-dropdown").next(n(".js-header-dropdown")).removeClass("is-open")})}}}(document,Drupal,jQuery)},10:function(e,o,n){e.exports=n("./src/components/header/js/dropdown-list.js")}});;
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/themes/custom/pegawww_theme/dist/",n(n.s=6)}({"./src/components/header/js/global-search.es6.js":function(e,t){for(var n=Array.from(document.getElementsByClassName("js-search-toggle")),o=document.getElementsByClassName("js-global-header")[0],r=function(){var e=c[s];a=!1;var t=e.getElementsByClassName("js-global-search__panel-toggle")[0],n=document.getElementsByClassName("js-global-search__close-trigger")[0],r=document.getElementsByClassName("js-global-search__open-trigger")[0],l=e.getElementsByClassName("js-global-search__input")[0];function u(){o.classList.remove("is-search-mode"),setTimeout(function(){l.blur(),l.classList.remove("has-faux-placeholder"),l.value=l.value.replace(l.getAttribute("placeholder"),"")},10),document.body.removeEventListener("click",d,!1),document.body.removeEventListener("keyup",f,!1),a=!1}function i(e){"close"===e?u():!1===a?(o.classList.add("is-search-mode"),setTimeout(function(){if(l.createTextRange){var e=l.createTextRange();e.move("character",0),e.select()}else l.setSelectionRange&&l.setSelectionRange(0,0);l.focus()},100),setTimeout(function(){document.body.addEventListener("click",d,!1),document.body.addEventListener("keyup",f,!1),a=!0},10)):u()}function d(t){e.contains(t.target)||a&&i("close")}function f(e){27==e.keyCode&&a&&i("close")}t.checked&&(t.checked=!1,a=!0,t.click()),t.addEventListener("keyup",function(e){13==e.keyCode&&i()}),n.addEventListener("click",function(e){e.preventDefault(),i("close")}),r.addEventListener("click",function(e){e.preventDefault(),i("open")})},s=0,c=n;s<c.length;s++){var a;r()}},6:function(e,t,n){e.exports=n("./src/components/header/js/global-search.es6.js")}});;
/**
 * Demandbase Integration.
 */
(function ($, Drupal) {

    Drupal.pegaAnalytics = {
        /**
         * Allow log messages to be displayed.
         *
         * This can be enabled in the console with
         * Drupal.pegaAnalytics.debug = true;
         */
        debug: false,
        /**
         * Simple logger. Does not patch console.
         * Respects debug property.
         * @param output
         * @param type
         */
        log: function(output, type){
            var me = Drupal.pegaAnalytics;
            if (typeof (type) === 'undefined'){
                type = 'log';
            }
            if (typeof window['console'] ===! 'object') {
                return;
            }
            if (typeof window['console'][type] ===! 'function') {
                return;
            }
            if (me.debug === true){
                console[type](output);
            }
        }

    };

    /**
     * Add listener for personalized CDH content impressions.
     */
    window.addEventListener('pega_personalize_impression', function (e) {
        if (window.hasOwnProperty('ga') && typeof(window.ga) === 'function') {
            var label = e.detail.cdh_offer_id + ' | ' + e.detail.cdh_interaction_id + ' | ' + e.detail.cdh_content_id;
            var event = {
                'hitType': 'event',
                'eventCategory': e.detail.cdh_position,
                'eventAction': 'Impression',
                'eventLabel': label,
                'eventValue': 1,
                'nonInteraction': 1
            };
            window.ga('send', event);
        }
    });

    /**
     * Add listener for personalized CDH content clicks.
     */
    window.addEventListener('pega_personalize_click', function (e) {
        if (window.hasOwnProperty('ga') && typeof(window.ga) === 'function') {
            var label = e.detail.cdh_offer_id + ' | ' + e.detail.cdh_interaction_id + ' | ' + e.detail.cdh_content_id;
            var event = {
                'hitType': 'event',
                'eventCategory': e.detail.cdh_position,
                'eventAction': 'Click',
                'eventLabel': label,
                'eventValue': 1,
                'nonInteraction': 0
            };
            window.ga('send', event);
        }
    });
})(jQuery, Drupal);
;
/**
 * Demandbase Integration.
 */
(function ($, Drupal) {

    Drupal.pegaAnalytics.demandbaseTracker = {
        obj: false,
        ready: false,
        interval: false,
        frequency: 250,
        coverageType: '',
        /**
         * Reset everything to simulate a page load, with console messages on.
         * Use: Drupal.pegaAnalytics.demandbaseTracker.test() .
         */
        test: function (){
            var parent = Drupal.pegaAnalytics;
            var me = parent.demandbaseTracker;
            parent.debug = true;
            me.obj = false;
            me.ready = false;
            me.interval = false;
            me.coverageType = '';
            parent.log('Drupal.pegaAnalytics.demandbaseTracker: testing Demandbase scan with debug');
            me.interval = setInterval(me.poll, me.frequency);
        },
        /**
         * Wait for Demandbase to be initialized.
         * Trigger a tracking event if criteria are met.
         */
        poll: function (){
            var parent = Drupal.pegaAnalytics;
            var me = parent.demandbaseTracker;
            parent.log('Drupal.pegaAnalytics.demandbaseTracker: checking for Demandbase initialization');
            if (!me.obj) {
                if (window.hasOwnProperty('Demandbase')) {
                    me.obj = window.Demandbase;
                }
            }
            if (!me.ready) {
                if (me.obj._isInitialized) {
                    if (me.obj.hasOwnProperty('Segments')) {
                        me.ready = true;
                        clearInterval(me.interval);
                        parent.log('Drupal.pegaAnalytics.demandbaseTracker: Demandbase initialized');
                        if (me.obj.Segments.hasOwnProperty('AccountWatchVisitor') && me.obj.Segments.AccountWatchVisitor === true) {
                            parent.log('Drupal.pegaAnalytics.demandbaseTracker: detected Demandbase account watch visitor');
                            if (me.obj.Segments.hasOwnProperty('CompanyProfile')){
                                if (me.obj.Segments.CompanyProfile.hasOwnProperty('watch_list_coverage_type')){
                                    me.coverageType = me.obj.Segments.CompanyProfile.watch_list_coverage_type;
                                    parent.log('Drupal.pegaAnalytics.demandbaseTracker: detected Demandbase coverage type ' + me.coverageType);
                                    me.track();
                                }
                            }
                        }
                    }
                }
            }
        },
        /**
         * Google Analytics Integration.
         * Sends a tracking event if criteria are met.
         */
        track: function () {
            var parent = Drupal.pegaAnalytics;
            var me = parent.demandbaseTracker;
            if (window.hasOwnProperty('ga') && typeof(window.ga) === 'function') {
                var action = '';
                if (me.coverageType !== '') {
                    me.coverageType = me.coverageType.toLowerCase();
                    switch (me.coverageType){
                        case 'premier':
                            action = 'DM - Premier Account pageview';
                            break;
                        case 'key':
                            action = 'DM - Key Account pageview';
                            break;
                        case 'must':
                            action = 'DM - Must Account pageview';
                    }
                }
                if (action !== ''){
                    var event = {
                        'hitType': 'event',
                        'eventCategory': 'advertising',
                        'eventAction': action,
                        'eventLabel': window.location.href,
                        'eventValue': 1,
                        'nonInteraction': 1
                    };
                    parent.log('Drupal.pegaAnalytics.demandbaseTracker: sending user coverage type event to ga', 'group');
                    parent.log(event, 'table');
                    parent.log(null, 'groupEnd');
                    window.ga('send', event);
                }
            }
            else {
                parent.log('Drupal.pegaAnalytics.demandbaseTracker: ga not initialized', 'error');
            }
        },
        /**
         * Initialize the object and kick off the polling process.
         */
        init: function () {
            var me = Drupal.pegaAnalytics.demandbaseTracker;
            me.interval = setInterval(me.poll, me.frequency);
        }
    };
    /**
     * Start the ball rolling.
     */
    $(document).ready(function () {
        Drupal.pegaAnalytics.demandbaseTracker.init();
    });

})(jQuery, Drupal);
;
