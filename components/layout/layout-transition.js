'use strict';

/**
 * Internal hyperlink clicks are hijacked by smoothstate. The new content is
 * loaded via ajax and smoothly exchanged.
 */
var $ = require('jquery');
var DOMCache = {};

// SmoothState needs jQuery on the window object
window.jQuery = window.jQuery || $;
require('smoothstate');

/**
 * Initialize smoothstate
 * @return {[type]} [description]
 */
var init = function () {
  var $layoutTransitionContainer = $('#layout-transition');

  DOMCache.$pageContainer = $('body');

  $layoutTransitionContainer.smoothState({

    // Trigger event other components can bind to and act on the new url
    onBefore: function ($clickedLink) {
      $layoutTransitionContainer.trigger('boilerplate.layoutTransitionBefore', [$clickedLink[0].pathname]);
    },
    onStart: {
      duration: 700,
      render: function () {
        DOMCache.$pageContainer.addClass('layout-transition--animate-out');
      }
    },
    onReady: {
      duration: 700,
      render: _renderNewPage
    },
    onAfter: function () {
      DOMCache.$pageContainer.removeClass('layout-transition--animate-in');
      $layoutTransitionContainer.trigger('boilerplate.layoutTransitionDone');
    },

    // Don’t mess with forms
    forms: '',

    // Links that trigger a page refresh
    blacklist: '.no-smoothstate'
  });
};

/**
 * Handle the content exchange
 * @param  {[type]} $container           The current container
 * @param  {[type]} $newContentContainer The newly fetched content
 */
var _renderNewPage = function ($container, $newContentContainer) {
  var $contentContainer = $container.find('#main').first();
  var $newContent = $newContentContainer.filter('#main').first();
  var newSiteArea = $newContent.attr('data-site');

  // Set the area title of the new site to the html element and the
  // content container so that the page can react to it
  if (newSiteArea) {
    $('html').attr('data-site', newSiteArea);
    $('#main').attr('data-site', newSiteArea);
  }

  // Add new content to the page and animate in
  $contentContainer.html($newContent.html());
  DOMCache.$pageContainer.removeClass('layout-transition--animate-out').addClass('layout-transition--animate-in');

  // Run picturefill to evaluate newly added images
  picturefill();
};

exports.init = init;
