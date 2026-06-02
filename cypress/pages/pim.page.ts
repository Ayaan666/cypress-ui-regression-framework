class PimPage {

  openPimModule() {
    cy.contains("span", "PIM").click();
  }

  clickAddEmployee() {
    cy.contains("button", "Add").click();
  }

  enterFirstName(firstName: string) {
    cy.get('input[name="firstName"]').clear().type(firstName);
  }

  enterLastName(lastName: string) {
    cy.get('input[name="lastName"]').clear().type(lastName);
  }

  // ✅ Correct Employee ID field index
enterEmployeeId(id: string) {
  const validId = id.substring(0,10);

  cy.get('input.oxd-input.oxd-input--active')
    .eq(2)
    .clear()
    .type(validId);
}

  saveEmployee() {
    // wait until employee ID populated / stable
    cy.get('input.oxd-input.oxd-input--active')
      .eq(3)
      .should('not.have.value', '');

    cy.contains("button", "Save")
      .should("be.enabled")
      .click();

    // wait for navigation after successful creation
    cy.url({ timeout: 15000 })
      .should("include", "/pim/viewPersonalDetails");
  }

  verifyEmployeeCreated(firstName: string) {
    cy.get('input[name="firstName"]', { timeout: 15000 })
      .should("have.value", firstName);
  }

  // 🔍 SEARCH + EDIT METHODS

  searchEmployee(name: string) {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 15000 })
      .first()
      .clear()
      .type(name);

    cy.contains("button", "Search").click();

    cy.get(".oxd-table-body", { timeout: 15000 }).should("be.visible");
  }

  openFirstSearchResult() {
    cy.get(".oxd-table-body .oxd-table-row", { timeout: 15000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();
  }

  editLastName(newLastName: string) {
    cy.get('input[name="lastName"]', { timeout: 15000 })
      .clear()
      .type(newLastName);
  }

  saveChanges() {
    cy.contains("button", "Save")
      .should("be.enabled")
      .click();
  }

  verifyUpdatedName(newLastName: string) {
    cy.get('input[name="lastName"]', { timeout: 15000 })
      .should("have.value", newLastName);
  }
}

export default new PimPage();
