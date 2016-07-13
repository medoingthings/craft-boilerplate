'use strict';

/**
 * Example JavaScript File
 * Shows how Browserify is used to write component based JavaScript modules
 */

var $ = require('jquery');
var helpers = require('../helpers/helpers');
var DOMCache = {};

/**
 * Initialize this example
 * Every component needs to have an `init()` function
 */
var init = function () {

  // Cache elements on init to the DOMCache object so that they are available
  // to all methods
  DOMCache.$body = $('body');

  DOMCache.$body.on('click', handleBodyClick);

  $(window).scroll(helpers.throttle(handleScroll, 200));

  showConsoleMessage('example.js initialized');
};

/**
 * Writes message to the JavaScript Console. Just an example.
 * @param  {string} message The message that is supposed to be shown
 */
var showConsoleMessage = function (message) {
  console.log(message);
};

/**
 * Method that handles the clicks to the body
 */
var handleBodyClick = function () {
  showConsoleMessage('The body element was clicked');
};

/**
 * Method that handles the clicks to the body
 */
var handleScroll = function () {
  showConsoleMessage('Scrolled with a throttle of 200ms');
};

// Expose the init function so that the component can be initialized after
// being required (see main.js)
exports.init = init;
