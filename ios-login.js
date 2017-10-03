"use strict";

/* jshint esnext: true */

require("./helpers/setup");

var wd = require("yiewd"),
  _ = require('underscore'),
  serverConfigs = require('./helpers/appium-servers');

describe("ios yiewd", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  var serverConfig = process.env.npm_package_config_sauce ?
    serverConfigs.sauce : serverConfigs.local;
  driver = wd.remote(serverConfig.host, serverConfig.port,
    serverConfig.username, serverConfig.password);
  require("./helpers/logging").configure(driver);

  before(function (done) {
    driver.run(function* () {
      var desired = _.clone(require("./helpers/caps").ios81);
      desired.app = require("./helpers/apps").iosCCP;
      if (process.env.npm_package_config_sauce) {
        desired.name = 'CCP Login';
        desired.tags = ['CCP tags'];
      }
      yield driver.init(desired);
      done();
    });
  });

  after(function () {
    driver.run(function* () {
      try {
        yield driver.quit();
      } catch (ign) {
        if (process.env.npm_package_config_sauce) {
          yield driver.sauceJobStatus(allPassed);
        }
      }
    });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("Login with credentials", function (done) {
    driver.run(function* () {
      var userNameField = yield driver.waitForElementByName("usernameField");
      yield userNameField.clear();
      yield driver.sleep(1000);
      yield userNameField.type('jmedici');
      yield driver.sleep(1000);
      yield driver.elementByName('Next').click();

      var passwordField = yield driver.waitForElementByName("passwordField");
      yield passwordField.clear();
      yield driver.sleep(1000);
      yield passwordField.type('password01');
      yield driver.sleep(1000);
      yield driver.elementByName('Next').click();

      var loginButton = yield driver.elementByXPath("//XCUIElementTypeOther[@name=' LogIn']");
      yield loginButton.click();
      yield driver.sleep(1000);
      done();
    });
  });

});
