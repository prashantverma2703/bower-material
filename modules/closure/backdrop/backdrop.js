/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.0-rc.5-master-82fdd2c
 */
goog.provide('ng.material.components.backdrop');
goog.require('ng.material.core');
/*
 * @ngdoc module
 * @name material.components.backdrop
 * @description Backdrop
 */

/**
 * @ngdoc directive
 * @name mdBackdrop
 * @module material.components.backdrop
 *
 * @restrict E
 *
 * @description
 * `<md-backdrop>` is a backdrop element used by other components, such as dialog and bottom sheet.
 * Apply class `opaque` to make the backdrop use the theme backdrop color.
 *
 */

angular
  .module('material.components.backdrop', ['material.core'])
  .directive('mdBackdrop', ["$mdTheming", "$mdUtil", "$animate", "$rootElement", "$window", "$log", "$$rAF", "$document", function BackdropDirective($mdTheming, $mdUtil, $animate, $rootElement, $window, $log, $$rAF, $document) {
    var ERROR_CSS_POSITION = "<md-backdrop> may not work properly in a scrolled, static-positioned parent container.";

    return {
      restrict: 'E',
      link: postLink
    };

    function postLink(scope, element, attrs) {
      // backdrop may be outside the $rootElement, tell ngAnimate to animate regardless
      if ($animate.pin) $animate.pin(element, $rootElement);

      $$rAF(function () {
        // If body scrolling has been disabled using mdUtil.disableBodyScroll(),
        // adjust the 'backdrop' height to account for the fixed 'body' top offset.
        // Note that this can be pretty expensive and is better done inside the $$rAF.
        var body = $window.getComputedStyle($document[0].body);
        if (body.position == 'fixed') {
          var hViewport = parseInt(body.height, 10) + Math.abs(parseInt(body.top, 10));
          element.css({
            height: hViewport + 'px'
          });
        }

        // Often $animate.enter() is used to append the backDrop element
        // so let's wait until $animate is done...
        var parent = element.parent()[0];
        if (parent) {

          if ( parent.nodeName == 'BODY' ) {
            element.css({position : 'fixed'});
          }

          var styles = $window.getComputedStyle(parent);
          if (styles.position == 'static') {
            // backdrop uses position:absolute and will not work properly with parent position:static (default)
            $log.warn(ERROR_CSS_POSITION);
          }
        }

        // Only inherit the parent if the backdrop has a parent.
        if (element.parent().length) {
          $mdTheming.inherit(element, element.parent());
        }
      });

      function resize() {
        var hViewport = parseInt(body.height, 10) + Math.abs(parseInt(body.top, 10));
        element.css({
          height: hViewport + 'px'
        });
      }

    }

  }]);

ng.material.components.backdrop = angular.module("material.components.backdrop");