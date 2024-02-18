import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    browser.driver.manage().window().maximize();
    return browser.get('/');
  }
  get url() {
    return browser.getCurrentUrl();
  }
  get username() {
    return element(by.css('login .uname'));
  }
  get password() {
    return element(by.css('login .pwd'));
  }
  get loginBtn() {
    return element(by.css('login .btn-success'));
  }

  waitForAngular() {
    return browser.waitForAngular();
  }
}
