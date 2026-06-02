describe("Iframe handling", () => {

  it("should click on iframe element", () => {

    cy.visit("https://practice.expandtesting.com/iframe");

    cy.get("#mce_0_ifr")
      .its('0.contentDocument.body')   // ✅ fixed
      .should('not.be.empty')
      .then(cy.wrap)
      .click()
      .clear()
      .type("Get started")
      

  });

});