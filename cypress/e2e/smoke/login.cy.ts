describe("Login Smoke Suite", () => {

  it("should login successfully @smoke", () => {

    cy.login("Admin", "admin123")

    cy.url({ timeout: 10000 }).should("include", "/dashboard")

    cy.get(".oxd-topbar-header-breadcrumb").should("be.visible")

  })

})