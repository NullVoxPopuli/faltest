'use strict';

const { describe, it } = require('../../../../helpers/mocha');
const { expect } = require('../../../../helpers/chai');
const { setUpWebDriver } = require('../../../lifecycle');
const { killOrphans } = require('../../../remote');
const Server = require('../../../../helpers/server');
const Browser = require('../..');
const { promisify } = require('util');
const tmpDir = promisify(require('tmp').dir);
const writeFile = promisify(require('fs').writeFile);
const path = require('path');

describe(function() {
  setUpWebDriver.call(this, {
    shareWebdriver: true,
    keepBrowserOpen: true,
    overrides: {
      browser: 'chrome',
      waitforTimeout: 0,
    },
  });

  let fixturesPath;

  before(function() {
    this.open = async function(pathname) {
      await this.browser.url(`http://localhost:${this.port}/${pathname}`);
    };

    this.writeFixture = async function(filename, fixtureData) {
      await writeFile(path.join(fixturesPath, filename), fixtureData);
    };
  });

  beforeEach(async function() {
    fixturesPath = await tmpDir();

    this.server = new Server(fixturesPath);

    this.port = await this.server.start();
  });

  afterEach(async function() {
    if (this.server) {
      await this.server.stop();
    }
  });

  after(async function() {
    await killOrphans();
  });

  it(Browser.prototype.waitForEnabled, async function() {
    await this.writeFixture('index.html', `
      <div class="foo">
      </div>
    `);

    await this.open('index.html');

    await expect(this.browser.waitForEnabled('.foo'))
      .to.eventually.be.fulfilled;
  });
});
