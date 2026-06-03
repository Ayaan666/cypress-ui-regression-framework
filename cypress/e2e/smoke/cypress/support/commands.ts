Cypress.Commands.add("login", (username: string, password: string) => {

  cy.visit("https://opensource-demo.orangehrmlive.com")

  cy.get('input[name="username"]').type(username)

  cy.get('input[name="password"]').type(password)

  cy.get('button[type="submit"]').click()

  cy.url().should("include", "dashboard")

})