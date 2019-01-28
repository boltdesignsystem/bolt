// @todo Delete this file, its only here as an example
/**
 * @file
 * animations script.
 */

(function animationsScript($, Drupal, _) {
  'use strict';

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   * @param {Boolean} partial - If false, triggers when entire item is visible, if true, then if top is visible.
   * @return {Boolean} If the item is in the viewport.
   */
  $.fn.visible = function (partial) {
    var $t = $(this);
    var $w = $(window);
    var viewTop = $w.scrollTop();
    var viewBottom = viewTop + $w.height();
    var _top = $t.offset().top;
    var _bottom = _top + $t.height();
    var compareTop = partial === true ? _bottom : _top;
    var compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };

  // How to use animation triggers
  // All elements with an attribute of `data-anim-trigger="view"` will get an attribute of `data-anim-triggered='yes'` added - use that to trigger CSS animations. Additionally, those elements will have the `anim-trigger` JS event fired, which will execute code in a `$('.class').on('anim-trigger', function () { animate here })`.
  // Staggered Starts are done by applying this to a wrapper: `class="u-anim-staggered-start" data-anim-trigger="view"`.
  // Any children with a class of `u-anim-staggered-start__item` will get a `data-anim-triggered='yes'` attribute applied with a time delay of `staggeredDelay` between each.

  // These are just the triggers, you can use any animation; the most popular being a Fade In and Slide Up - just add a class of `u-anim-fade-in-and-slide-up` to the element. Demoes are visible in Pattern Lab under "Base > Animations".
  Drupal.behaviors.animations = {
    attach: function (context) {
      // Milliseconds between checks for visibility on scroll
      var scrollDebounceRate = 50;
      // Milliseconds in between staggered start items starting.
      var staggeredDelay = 333;
      var $items = $('[data-anim-trigger="view"]', context);
      var $staggeredContainers = $('.u-anim-staggered-start', context);

      // Make sure we've got Underscore.
      if (typeof _ === 'undefined') {
        console.error('Not able to find Underscore.'); // eslint-disable-line no-console
      }

      /**
       * Trigger animations on this element.
       * Adds data attribute and triggers event handlers
       * @param {JQuery} $item The element
       */
      function triggerAnimation($item) {
        if ($item.attr('data-anim-triggered') !== 'yes') {
          $item.attr('data-anim-triggered', 'yes');
          $item.trigger('anim-trigger');
        }
      }

      function triggerVisibleAnimations() {
        $items.each(function () {
          var $item = $(this);
          if ($item.visible(true)) {
            triggerAnimation($item);
          }
        });
      }

      $staggeredContainers.each(function () {
        var $this = $(this);
        $this.one('anim-trigger', function () {
          $('.u-anim-staggered-start__item', $this).each(function (i) {
            var delay = staggeredDelay * i;

            setTimeout(function () {
              triggerAnimation($(this));
            }.bind(this), delay);
          });
        });
      });

      // placing function call at bottom of call stack so other function can finish up first (like `Drupal.behaviors.stats`)
      setTimeout(triggerVisibleAnimations, 0);
      $(window).scroll(_.debounce(triggerVisibleAnimations, scrollDebounceRate));
    }
  };
}(jQuery, Drupal, _));
