'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var ControllerGenerator = ScriptBase.extend({
  constructor: function(name) {
    ScriptBase.apply(this, arguments);

    // if the controller name is suffixed with ctrl, remove the suffix
    // if the controller name is just "ctrl," don't append/remove "ctrl"
    if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
      this.name = this.name.slice(0, -4);
    }
  },

  createControllerFiles: function() {
    this.generateSourceAndTest(
      'controller',
      'spec/controller',
      'controllers',
      true  // Skip adding the script to the index.html file of the application
    );
  },

  // Re-write the main app module to account for our new dependency
  injectDependenciesToApp: function () {
    angularUtils.injectIntoFile(
      this.config.get('appPath'),
      'controllers/' + this.name.toLowerCase(),
      this.classedName + 'Ctrl',
      this.scriptAppName + '.controllers.' + this.classedName + 'Ctrl'
    );
  }
});

module.exports = ControllerGenerator;
