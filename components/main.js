'use strict';

var $ = require('jquery');
var fastclick = require('fastclick');
var example = require('./example/example');
var layoutTransition = require('./layout/layout-transition');
var smoothScroll = require('smooth-scroll');

// Remove 300ms delay from taps
fastclick.FastClick.attach(document.body);

// Smoothly scroll anchor links with data attribute `data-scroll`
smoothScroll.init();

$(function () {
  example.init();

  layoutTransition.init();

  /**
   * Add a class to the body on the load event and trigger an event.
   * For performance reasons, this enables us to load non essential
   * assets (e.g. CSS background images) or certain components only
   * when everything else was already loaded.
   */
  $(window).on('load', function () {
    $('body').addClass('base-loaded');
  });

  // Origin polyfill
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
  }
});
