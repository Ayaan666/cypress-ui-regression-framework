import LoginPage from "../../pages/login.page";

describe("Login Smoke Suite", () => {
  it("should login successfully @smoke", () => {
    LoginPage.visit();
    LoginPage.login("Admin", "admin123");

  cy.url({ timeout: 10000 }).should("include", "/dashboard");
    cy.get(".oxd-topbar-header-breadcrumb").should("be.visible");
  });
});
