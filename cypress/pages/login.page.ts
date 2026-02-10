class LoginPage {
  visit() {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
}

  enterUsername(username: string) {
    cy.get('input[name="username"]').clear().type(username);
  }

  enterPassword(password: string) {
    cy.get('input[name="password"]').clear().type(password);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  login(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.submit();
  }
}

export default new LoginPage();
