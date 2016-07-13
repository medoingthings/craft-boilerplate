/**
 * Allows you to change certain gulp configurations per project (see gulp-workflow npm module)
 */
'use strict';

module.exports = {
  browsersync: {
    options: {
      proxy: "NOTE: needs to be set via gulpconfig.local.js within the project"
    }
  }
}
