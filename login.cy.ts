describe("Login Smoke Suite", () => {

  it("should login successfully", () => {

    cy.login("Admin", "admin123");

    cy.url().should("include", "/dashboard");

  });

});