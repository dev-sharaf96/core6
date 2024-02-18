import { LoginPage } from './pages/login.page';

describe('workspace-project App', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should login', () => {
    loginPage.navigateTo();
    loginPage.username.sendKeys('nader.m@bcare.com.sa');
    loginPage.password.sendKeys('Pa$$w0rd');
    loginPage.loginBtn.click().then(() => {
      loginPage.waitForAngular();
      expect(loginPage.url).toContain('admin');
    });
  });
});
