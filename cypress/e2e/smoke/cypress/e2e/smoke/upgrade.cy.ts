it("should validate Upgrade CTA navigation", () => {

  cy.on("uncaught:exception", () => false);

  cy.visit("https://opensource-demo.orangehrmlive.com");

  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("admin123");
  cy.get('button[type="submit"]').click();

  cy.get(".orangehrm-upgrade-button")
    .closest("a")
    .invoke("removeAttr", "target")
    .click();

  cy.url({ timeout: 15000 }).should("include", "orangehrm.com");

});