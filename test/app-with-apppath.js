'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var _ = require('underscore.string');

describe('Angular-Require generator appPath option', function () {
  var appPath = 'customAppPath';
  var expected = [
    appPath + '/404.html',
    appPath + '/favicon.ico',
    appPath + '/robots.txt',
    appPath + '/styles/main.scss',
    appPath + '/views/main.html',
    appPath + '/index.html',
    '.bowerrc',
    '.editorconfig',
    '.gitignore',
    '.jshintrc',
    'Gruntfile.js',
    'package.json',
    'bower.json'
  ];

  beforeEach(function () {
    this.angular = helpers
      .run(require.resolve('../app'))
      .withGenerators([
        require.resolve('../controller'),
        [helpers.createDummyGenerator(), 'karma:app']
      ])
      .withOptions({
        'appPath': appPath,
        'skip-welcome-message': true,
        'skip-message': true
      })
      .withArguments(['upperCaseBug'])
      .withPrompts({
        compass: true,
        bootstrap: true,
        compassBootstrap: true,
        modules: []
      });
  });

  describe('default settings', function () {
    beforeEach(function (done) {
      this.angular.on('end', done);
    });

    it('generates base files inside the appPath', function () {
      assert.file(expected);
    });

    it('creates JS files in appPath', function () {
      assert.file([
        '.jscsrc',
        appPath + '/scripts/app.js',
        appPath + '/scripts/controllers/main.js',
        'test/spec/controllers/main.js'
      ]);
    });
  });
});
