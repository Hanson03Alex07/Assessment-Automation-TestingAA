// Page Object Model for Login page (Herokuapp)
const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver, baseUrl) {
    this.driver = driver;
    this.url = (baseUrl || process.env.BASE_URL || 'https://the-internet.herokuapp.com').replace(/\/$/, '') + '/login';
    this.selectors = {
      username: By.id('username'),
      password: By.id('password'),
      submit: By.css('button[type="submit"]'),
      loginForm: By.css('form#login'),
      successMessage: By.css('div.flash.success')
    };
  }

  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.selectors.loginForm), 5000);
  }

  async login(username, password) {
    const userEl = await this.driver.findElement(this.selectors.username);
    await userEl.clear();
    await userEl.sendKeys(username);
    const passEl = await this.driver.findElement(this.selectors.password);
    await passEl.clear();
    await passEl.sendKeys(password);
    await this.driver.findElement(this.selectors.submit).click();
  }
}

module.exports = LoginPage;
