const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../../pages/LoginPage');
const { addTimestampToString } = require('../../utils/utils');

const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR);

const BASE_URL = process.env.BASE_URL || 'https://the-internet.herokuapp.com';

describe('Selenium Test Suite - Herokuapp', function() {
  this.timeout(60000);
  let driver;
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async function() {
    if (driver) await driver.quit();
  });

  it('User login with POM', async function() {
    const loginPage = new LoginPage(driver, BASE_URL);
    try {
      await loginPage.open();
      const username = 'tomsmith'; // valid user for herokuapp
      const password = 'SuperSecretPassword!';
      const usernameWithTs = addTimestampToString(username);
      console.log('Attempting login with username:', usernameWithTs);
      await loginPage.login(username, password);

      const success = await driver.wait(until.elementLocated(loginPage.selectors.successMessage), 5000);
      assert.ok(await success.isDisplayed());
      console.log('Login test: PASS');
    } catch (err) {
      console.error('Login test: FAIL', err);
      const shot = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, `login-fail-${Date.now()}.png`), shot, 'base64');
      throw err;
    }
  });

  it('Add and Remove Elements', async function() {
    try {
      await driver.get(BASE_URL + '/add_remove_elements/');
      const addBtn = By.css('button[onclick="addElement()"]');
      await driver.findElement(addBtn).click();
      const deleteBtn = By.css('button.added-manually');
      const element = await driver.wait(until.elementLocated(deleteBtn), 5000);
      assert.ok(await element.isDisplayed());

      await element.click();
      const remaining = await driver.findElements(deleteBtn);
      assert.strictEqual(remaining.length, 0);
      console.log('Add/Remove test: PASS');
    } catch (err) {
      console.error('Add/Remove test: FAIL', err);
      const shot = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, `addremove-fail-${Date.now()}.png`), shot, 'base64');
      throw err;
    }
  });
});
