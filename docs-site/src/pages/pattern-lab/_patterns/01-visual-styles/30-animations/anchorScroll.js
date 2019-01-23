/**
 * @file
 * Scroll animation for anchor tags to account for the nav header.
 */

(function anchorScroll($, Drupal, _, window) {
  'use strict';

  // How to use anchor scroll animation.
  // [1] Create a link element similar to:
  // <a id="my-id-tag" class="u-anim-anchor-scroll" tabindex="-1"></a>
  // [2] Visit the page url with the anchor tag:
  // http://example.com#my-id-tag

  /**
   * Expandable text tiles.
   */
  Drupal.behaviors.pinAnchorScroll = {
    attach: function (context) {
      if (window.location.hash) {
        var $bodyInit = $('body:not(.pin-anchor-init-processed)', context);
        if ($bodyInit.length > 0) {
          $bodyInit.addClass('pin-anchor-init-processed');
          var $anchor = $(window.location.hash, $bodyInit).filter('.u-anim-anchor-scroll');
          if ($anchor.length > 0) {
            var $nav = $('.site__header > .navigation');
            if ($nav.length > 0) {
              var navHeight = $nav.outerHeight() || 0;
              if (navHeight) {
                var scrollTopOffset = $anchor.offset().top || 0;
                // Adjust for sticky nav.
                scrollTopOffset -= (2 * navHeight);

                // Buffer of 10px.
                scrollTopOffset -= 10;

                // Animate the scroll.
                if (scrollTopOffset > 0) {
                  $('html, body').animate({
                    scrollTop: scrollTopOffset
                  }, {
                    duration: 600
                  });
                }
              }
            }
          }
        }
      }
    }
  };

}(jQuery, Drupal, _, window));
