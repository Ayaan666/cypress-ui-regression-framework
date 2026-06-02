class LoginPage {

  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com");
  }

  login(username: string, password: string) {

    cy.get('input[name="username"]')
      .should("be.visible")
      .type(username);

    cy.get('input[name="password"]')
      .should("be.visible")
      .type(password);

    cy.get('button[type="submit"]')
      .click();

    cy.url({ timeout: 15000 })
      .should("include", "/dashboard");
  }

}

export default new LoginPage();