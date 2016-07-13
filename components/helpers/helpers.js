'use strict';

module.exports = {

  /**
   * Helper: Random int
   * @param  {integer} from Start Range
   * @param  {integer} to   End Range
   * @return {number}       Integer between [from] and [to]
   */
  randomInt: function (from, to) {
    return Math.round(Math.random() * to) + from;
  },

  /**
   * Throttle function execution on Event Handlers (limit amount of executions)
   * @param  {function} func  Function to throttle (i.e. `_handleStuff`)
   * @param  {int}      wait  Timeout in `ms` between executions (`100` for 100ms)
   * @param  {object}   scope Scope to execute stuff upon
   * @return {function}       Throttled function
   */
  throttle: function (func, wait, scope) {
    wait = wait || 250;

    var last;
    var deferTimer;

    return function () {
      var context = scope || this;

      var now = +new Date();
      var args = arguments;

      if (last && now < last + wait) {

        // Hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          func.apply(context, args);
        }, wait);
      } else {
        last = now;
        func.apply(context, args);
      }
    };
  },

  /**
   * Debounce function execution
   * @param  {function} func      Function to throttle (i.e. `_handleStuff`)
   * @param  {int}      wait      Timeout in `ms` between executions (`100` for 100ms)
   * @param  {boolean}  immediate Set true to execute fn immediately for the first time.
   *                              Needed if you pass arguments/parameter (i.e. event)
   * @return {function}           Throttled function
   */
  debounce: function (func, wait, immediate) {
    wait = wait || 250;

    var timeout;

    return function () {
      var later = function () {
        timeout = null;

        if (!immediate) {
          func.apply(this, arguments);
        }
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(this, arguments);
      }
    };
  },

  /**
   * Read out a breakpoint number from a :before pseudo element to get the CSS
   * breakpoint. Falls back to a default, if nothing was found.
   *
   * @param {string or node} target Selector or node to grab the number from
   * @param {integer} defaultBreakpoint Fall back value in pixels
   * @return {integer} Breakpoint number
   */
  getCSSBreakpoint: function (target, defaultBreakpoint) {
    if (typeof target === 'string') {
      target = document.querySelector(target);
    }

    var breakpoint = window.getComputedStyle(
      target, ':before'
    ).content.replace(/[^\d.]/g, ''); // Regex removes everything, except numbers

    // Get breakpoint value or fall back to default
    return parseInt(breakpoint, 10) || defaultBreakpoint;
  }
};
