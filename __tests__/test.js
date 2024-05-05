'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-zanpakuto:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ 
        type: "tmpl-express-js",
        templateName: "express-hello-world",
        description: "Express.js Hello world template",
        pkgManager: "npm"
       });
  });

  it('creates files', () => {
    
    assert.file(['index.js', 'package.json']);
  });
});
