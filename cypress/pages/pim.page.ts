class PimPage {
  openPimModule() {
    cy.contains("span", "PIM").click();
  }

  clickAddEmployee() {
    cy.contains("button", "Add").click();
  }

  enterFirstName(firstName: string) {
    cy.get('input[name="firstName"]').type(firstName);
  }

  enterLastName(lastName: string) {
    cy.get('input[name="lastName"]').type(lastName);
  }

  saveEmployee() {
    cy.contains("button", "Save").click();
  }

  verifyEmployeeCreated(firstName: string) {
    cy.contains("h6", firstName, { timeout: 10000 }).should("be.visible");
  }
}

export default new PimPage();
