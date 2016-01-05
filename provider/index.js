'use strict';

var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');

var ProviderGenerator = ScriptBase.extend({
  constructor: function() {
    ScriptBase.apply(this, arguments);
  },

  createServiceFiles: function() {
    this.generateSourceAndTest(
      'service/provider',
      'spec/provider',
      'services',
      true	// Skip adding the script to the index.html file of the application
    );
  },

  // Re-write the main app module to account for our new dependency
  injectDependenciesToApp: function() {
    var appPath = this.config.get('appPath');

    if (typeof appPath === "undefined") {
      appPath = this.env.options.appPath;
    }

    angularUtils.injectIntoFile(
      appPath,
      'services/' + this.name.toLowerCase(),
      this.classedName + 'Provider',
      this.scriptAppName + '.services.' + this.classedName
    );
  }
});

module.exports = ProviderGenerator;
